"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

// the two source files are named opposite to their contents
const FLAME_SRC = "/ref-tree.png"; // the flame
const TREE_SRC = "/ref-flame.png"; // the fire tree

const EXPOSURE = 0.38; // global brightness (lower = darker)
export const FIRE_HOLD = 1.3; // seconds the flame holds before morphing
export const FIRE_MORPH = 2.2; // morph duration
const HOLD = FIRE_HOLD;
const MORPH = FIRE_MORPH;

const SIMPLEX = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy; i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

// contain-fit mapping from image-UV (0..1, y up) to clip space — identical to the
// plane's sampling inverse, so particles overlay the textured image exactly.
const FIT = /* glsl */ `
  vec2 fit(vec2 uv, float asp, float zoom, vec2 res){
    float kx = zoom * asp * (res.y / res.x);
    return vec2((uv.x - 0.5) * kx * 2.0, (uv.y - 0.5) * zoom * 2.0);
  }
`;

export function ThreeHeroFireTree({
  zoom = 1.15,
  mask = true,
  morph = true,
}: {
  zoom?: number;
  mask?: boolean;
  morph?: boolean;
} = {}) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = Math.min(window.innerWidth, window.innerHeight) < 768;
    const PCOUNT = isMobile ? 14000 : 36000;
    const enableMorph = morph;

    let disposed = false;
    let cleanup = () => {};

    const loadTex = (loader: THREE.TextureLoader, src: string) =>
      new Promise<THREE.Texture>((res, rej) =>
        loader.load(
          src,
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
            t.minFilter = THREE.LinearFilter;
            res(t);
          },
          undefined,
          rej
        )
      );
    const loadImg = (src: string) =>
      new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.crossOrigin = "anonymous";
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = src;
      });

    // sample bright pixels → image-UV (0..1, y up) + colour, weighted by luminance
    const sampleUV = (img: HTMLImageElement, n: number) => {
      const targetH = 360;
      const scale = targetH / img.height;
      const w = Math.max(1, Math.round(img.width * scale));
      const h = targetH;
      const cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      const ctx = cv.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      const idxs: number[] = [];
      const cum: number[] = [];
      let total = 0;
      for (let p = 0; p < w * h; p++) {
        const lum =
          (0.299 * data[p * 4] +
            0.587 * data[p * 4 + 1] +
            0.114 * data[p * 4 + 2]) /
          255;
        if (lum < 0.06) continue;
        total += Math.pow(lum, 1.25);
        idxs.push(p);
        cum.push(total);
      }
      const uv = new Float32Array(n * 2);
      const col = new Float32Array(n * 3);
      const pick = (r: number) => {
        let lo = 0;
        let hi = cum.length - 1;
        while (lo < hi) {
          const m = (lo + hi) >> 1;
          if (cum[m] < r) lo = m + 1;
          else hi = m;
        }
        return idxs[lo];
      };
      for (let i = 0; i < n; i++) {
        const p = pick(Math.random() * total);
        const px = p % w;
        const py = (p / w) | 0;
        uv[i * 2] = (px + Math.random()) / w;
        uv[i * 2 + 1] = 1.0 - (py + Math.random()) / h;
        col[i * 3] = data[p * 4] / 255;
        col[i * 3 + 1] = data[p * 4 + 1] / 255;
        col[i * 3 + 2] = data[p * 4 + 2] / 255;
      }
      return { uv, col };
    };

    (async () => {
      const loader = new THREE.TextureLoader();
      const [flameTex, treeTex, flameImg, treeImg] = await Promise.all([
        loadTex(loader, FLAME_SRC),
        loadTex(loader, TREE_SRC),
        loadImg(FLAME_SRC),
        loadImg(TREE_SRC),
      ]);
      if (disposed) {
        flameTex.dispose();
        treeTex.dispose();
        return;
      }

      const flameAspect = flameImg.naturalWidth / flameImg.naturalHeight;
      const treeAspect = treeImg.naturalWidth / treeImg.naturalHeight;
      const fS = sampleUV(flameImg, PCOUNT);
      const tS = sampleUV(treeImg, PCOUNT);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      const res = new THREE.Vector2(1, 1);

      /* ---------- flame / tree plane (two cross-faded stills) ---------- */
      const planeMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uFlameVis: { value: 1 },
          uTreeVis: { value: 0 },
          uFlame: { value: flameTex },
          uTree: { value: treeTex },
          uFlameAspect: { value: flameAspect },
          uTreeAspect: { value: treeAspect },
          uResolution: { value: res },
          uZoom: { value: zoom },
          uExposure: { value: EXPOSURE },
        },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
        fragmentShader: /* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime, uFlameVis, uTreeVis, uFlameAspect, uTreeAspect, uZoom, uExposure;
          uniform vec2 uResolution;
          uniform sampler2D uFlame, uTree;
          ${SIMPLEX}
          vec3 burn(sampler2D tex, float imgAspect, float amp, float rise){
            vec2 frag = vUv * uResolution;
            float dispH = uResolution.y * uZoom;
            float dispW = dispH * imgAspect;
            vec2 origin = (uResolution - vec2(dispW, dispH)) * 0.5;
            vec2 iuv = (frag - origin) / vec2(dispW, dispH);
            float t = uTime;
            vec3 nc = vec3(iuv.x*3.0, iuv.y*4.5 - t*rise, t*0.45);
            vec2 disp = vec2(snoise(nc), snoise(nc + vec3(7.3,2.1,4.7))) * amp;
            disp.y -= amp * 0.4;
            vec2 duv = iuv + disp;
            if (duv.x < 0.0 || duv.x > 1.0 || duv.y < 0.0 || duv.y > 1.0) return vec3(0.0);
            float fl = 0.80 + 0.30 * snoise(nc * 1.7 + vec3(0.0,0.0,9.0));
            return texture2D(tex, duv).rgb * fl;
          }
          void main(){
            vec3 flameCol = burn(uFlame, uFlameAspect, 0.020, 0.85) * uFlameVis;
            vec3 treeCol  = burn(uTree,  uTreeAspect,  0.012, 0.55) * uTreeVis;
            gl_FragColor = vec4((flameCol + treeCol) * uExposure, 1.0);
          }
        `,
        depthWrite: true,
      });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), planeMat);
      plane.frustumCulled = false;
      scene.add(plane);

      /* ---------- morph particles (flame-shape → tree-shape) ---------- */
      const pg = new THREE.BufferGeometry();
      pg.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(PCOUNT * 3), 3)
      );
      pg.setAttribute("aFlameUV", new THREE.BufferAttribute(fS.uv, 2));
      pg.setAttribute("aTreeUV", new THREE.BufferAttribute(tS.uv, 2));
      pg.setAttribute("aFlameCol", new THREE.BufferAttribute(fS.col, 3));
      pg.setAttribute("aTreeCol", new THREE.BufferAttribute(tS.col, 3));
      const pseed = new Float32Array(PCOUNT);
      for (let i = 0; i < PCOUNT; i++) pseed[i] = Math.random();
      pg.setAttribute("aSeed", new THREE.BufferAttribute(pseed, 1));

      const partMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMorph: { value: 0 },
          uPVis: { value: 0 },
          uPixelRatio: { value: renderer.getPixelRatio() },
          uResolution: { value: res },
          uZoom: { value: zoom },
          uExposure: { value: EXPOSURE },
          uFlameAspect: { value: flameAspect },
          uTreeAspect: { value: treeAspect },
        },
        vertexShader: /* glsl */ `
          attribute vec2 aFlameUV, aTreeUV;
          attribute vec3 aFlameCol, aTreeCol;
          attribute float aSeed;
          uniform float uTime, uMorph, uPVis, uPixelRatio, uZoom, uExposure, uFlameAspect, uTreeAspect;
          uniform vec2 uResolution;
          varying vec3 vColor; varying float vA;
          ${SIMPLEX}
          ${FIT}
          float ease(float x){ return x<0.5 ? 4.0*x*x*x : 1.0-pow(-2.0*x+2.0,3.0)*0.5; }
          void main(){
            float m = ease(clamp(uMorph,0.0,1.0));
            vec2 a = fit(aFlameUV, uFlameAspect, uZoom, uResolution);
            vec2 b = fit(aTreeUV,  uTreeAspect,  uZoom, uResolution);
            vec2 p = mix(a, b, m);
            float t = uTime;
            vec3 nc = vec3(p*2.5, t*0.5 + aSeed*10.0);
            float nx = snoise(nc), ny = snoise(nc + vec3(4.0,1.0,7.0));
            float scat = sin(m * 3.14159);
            p += vec2(nx, ny) * 0.10 * scat;
            p.y += abs(ny) * 0.13 * scat;
            p += vec2(snoise(nc*1.3), snoise(nc*1.3+vec3(9.0,2.0,5.0))) * 0.012;
            gl_Position = vec4(p, 0.0, 1.0);
            vColor = mix(aFlameCol, aTreeCol, m) * uExposure;
            vA = uPVis;
            gl_PointSize = (1.4 + 2.4*aSeed) * uPixelRatio;
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          varying vec3 vColor; varying float vA;
          void main(){
            vec2 uv = gl_PointCoord - 0.5; float d = length(uv);
            if (d > 0.5) discard;
            float a = pow(smoothstep(0.5, 0.0, d), 1.5);
            gl_FragColor = vec4(vColor * a * vA, a * vA);
          }
        `,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(pg, partMat);
      particles.frustumCulled = false;
      particles.renderOrder = 1;
      scene.add(particles);

      /* ---------- bloom ---------- */
      const composer = new EffectComposer(renderer);
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.22, 0.32, 0.5);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());

      const resize = () => {
        const { width, height } = mount.getBoundingClientRect();
        const w = Math.max(1, width);
        const h = Math.max(1, height);
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        bloom.setSize(w, h);
        res.set(w, h);
      };
      resize();
      window.addEventListener("resize", resize);

      const setStage = (el: number) => {
        let morph: number;
        let flameVis: number;
        let treeVis: number;
        let pVis: number;
        const smooth = (a: number, b: number, x: number) =>
          Math.max(0, Math.min(1, (x - a) / (b - a)));
        if (!enableMorph || el < HOLD) {
          morph = 0;
          flameVis = 1;
          treeVis = 0;
          pVis = 0;
        } else if (el < HOLD + MORPH) {
          const p = (el - HOLD) / MORPH;
          morph = p;
          flameVis = 1 - smooth(0.0, 0.3, p);
          treeVis = smooth(0.62, 1.0, p);
          pVis = smooth(0.0, 0.12, p) * (1 - smooth(0.82, 1.0, p));
        } else {
          morph = 1;
          flameVis = 0;
          treeVis = 1;
          pVis = 0;
        }
        planeMat.uniforms.uTime.value = el;
        planeMat.uniforms.uFlameVis.value = flameVis;
        planeMat.uniforms.uTreeVis.value = treeVis;
        partMat.uniforms.uTime.value = el;
        partMat.uniforms.uMorph.value = morph;
        partMat.uniforms.uPVis.value = pVis;
      };

      let frameId = 0;
      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      });
      io.observe(renderer.domElement);

      const start = performance.now();

      if (prefersReducedMotion) {
        // settled tree, single static frame
        setStage(HOLD + MORPH + 1);
        composer.render();
      } else {
        const render = () => {
          frameId = window.requestAnimationFrame(render);
          if (!visible) return;
          setStage((performance.now() - start) / 1000);
          composer.render();
        };
        render();
      }

      cleanup = () => {
        window.removeEventListener("resize", resize);
        window.cancelAnimationFrame(frameId);
        io.disconnect();
        if (renderer.domElement.parentNode === mount)
          mount.removeChild(renderer.domElement);
        flameTex.dispose();
        treeTex.dispose();
        planeMat.dispose();
        partMat.dispose();
        plane.geometry.dispose();
        pg.dispose();
        bloom.dispose();
        composer.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className={
        "absolute inset-0 overflow-hidden" +
        (mask
          ? " [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          : "")
      }
    />
  );
}
