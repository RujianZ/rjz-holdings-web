"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const CORE_COUNT = 4;
const FILAMENT_COUNT = 18;
const PARTICLE_COUNT = 1200;
const GLYPH_COUNT = 84;
const GLYPHS = ["01", "eq", "cap", "api", "llc", "os", "∴", "∑", "//"];

export function ThreeHeroFilament() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.set(-0.1, 0.12, -0.18);
    scene.add(group);
    const basePosition = { x: 0.35, y: -0.72 };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uSilver: { value: new THREE.Color("#929baa") },
        uAmber: { value: new THREE.Color("#d4a574") },
        uCharcoal: { value: new THREE.Color("#222a32") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vRidge;
        uniform float uTime;

        void main() {
          vUv = uv;
          float ribs = sin(uv.x * 118.0 + uTime * 1.35) * 0.014;
          float strata = sin(uv.x * 29.0 - uTime * 0.8 + uv.y * 9.0) * 0.03;
          float ore = sin(uv.x * 13.0 + uv.y * 20.0 + uTime * 0.35) * 0.022;
          vec3 displaced = position + normal * (ribs + strata + ore);
          vRidge = ribs + strata;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vRidge;
        uniform float uTime;
        uniform vec3 uSilver;
        uniform vec3 uAmber;
        uniform vec3 uCharcoal;

        void main() {
          float scan = smoothstep(0.0, 0.42, sin(vUv.x * 8.0 - uTime * 1.55) * 0.5 + 0.5);
          float vein = smoothstep(0.66, 1.0, sin(vUv.x * 78.0 + vUv.y * 14.0 + uTime * 1.8) * 0.5 + 0.5);
          float copper = smoothstep(0.58, 1.0, sin(vUv.x * 18.0 - vUv.y * 9.0 - uTime * 0.52) * 0.5 + 0.5);
          float edge = smoothstep(0.02, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
          vec3 base = mix(uCharcoal, uSilver, 0.32 + scan * 0.24);
          vec3 color = mix(base, uAmber, vein * 0.5 + copper * 0.28 + max(vRidge, 0.0) * 5.8);
          float alpha = edge * (0.14 + scan * 0.22 + vein * 0.14 + copper * 0.12);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const curves: THREE.CatmullRomCurve3[] = [];

    for (let i = 0; i < CORE_COUNT; i += 1) {
      const offset = (i - (CORE_COUNT - 1) / 2) * 0.24;
      const zOffset = (i - 2) * 0.08;
      const points = [
        new THREE.Vector3(-4.7, -1.72 + offset, zOffset),
        new THREE.Vector3(-3.2, -1.05 + offset * 0.4, -0.18 + zOffset),
        new THREE.Vector3(-1.25, -0.48 - offset * 0.28, 0.16 + zOffset),
        new THREE.Vector3(0.9, 0.05 + offset * 0.35, -0.05 + zOffset),
        new THREE.Vector3(3.05, 0.74 + offset * 0.15, 0.12 + zOffset),
        new THREE.Vector3(4.8, 1.52 + offset, zOffset),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      curves.push(curve);

      const geometry = new THREE.TubeGeometry(
        curve,
        260,
        0.16 - i * 0.016,
        20,
        false
      );
      const mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = i;
      group.add(mesh);
    }

    for (let i = 0; i < FILAMENT_COUNT; i += 1) {
      const lane = i / Math.max(FILAMENT_COUNT - 1, 1);
      const offset = (lane - 0.5) * 1.78;
      const zOffset = (Math.random() - 0.5) * 0.5;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-5, -1.92 + offset, zOffset),
        new THREE.Vector3(-3.1, -1.04 + offset * 0.25, -0.16 + zOffset),
        new THREE.Vector3(-1.0, -0.28 + Math.sin(i) * 0.14, 0.15 + zOffset),
        new THREE.Vector3(1.35, 0.22 + offset * 0.18, -0.08 + zOffset),
        new THREE.Vector3(3.25, 0.92 + offset * 0.3, 0.14 + zOffset),
        new THREE.Vector3(5, 1.7 + offset, zOffset),
      ]);
      curves.push(curve);
      const geometry = new THREE.TubeGeometry(
        curve,
        180,
        0.011 + Math.random() * 0.016,
        5,
        false
      );
      const mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = 10 + i;
      group.add(mesh);
    }

    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleSeeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const curve = curves[i % curves.length];
      const t = Math.random();
      const p = curve.getPointAt(t);
      const spread = 0.26 + Math.random() * 0.62;
      particlePositions[i * 3] = p.x + (Math.random() - 0.5) * spread;
      particlePositions[i * 3 + 1] = p.y + (Math.random() - 0.5) * spread;
      particlePositions[i * 3 + 2] = p.z + (Math.random() - 0.5) * 0.32;
      particleSeeds[i] = t;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "aSeed",
      new THREE.BufferAttribute(particleSeeds, 1)
    );

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPulse: { value: 0 },
        uColor: { value: new THREE.Color("#d4a574") },
      },
      vertexShader: `
        attribute float aSeed;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPulse;

        void main() {
          vec3 p = position;
          p.y += sin(aSeed * 42.0 + uTime * 1.6) * 0.035;
          p.x += cos(aSeed * 25.0 + uTime * 1.2) * 0.025;
          float pulse = smoothstep(0.82, 1.0, sin(aSeed * 18.0 - uTime * 1.3) * 0.5 + 0.5);
          vAlpha = 0.05 + pulse * 0.42 + uPulse * 0.32;
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (1.2 + pulse * 2.4) * (7.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        uniform vec3 uColor;

        void main() {
          vec2 centered = gl_PointCoord - vec2(0.5);
          float d = length(centered);
          float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const glyphTextureCache = new Map<string, THREE.CanvasTexture>();
    const glyphSprites: THREE.Sprite[] = [];

    const getGlyphTexture = (glyph: string) => {
      const cached = glyphTextureCache.get(glyph);
      if (cached) return cached;
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 64;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "500 24px ui-monospace, SFMono-Regular, Consolas, monospace";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "rgba(245, 245, 240, 0.74)";
        context.fillText(glyph, canvas.width / 2, canvas.height / 2);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      glyphTextureCache.set(glyph, texture);
      return texture;
    };

    for (let i = 0; i < GLYPH_COUNT; i += 1) {
      const curve = curves[i % curves.length];
      const t = Math.random();
      const p = curve.getPointAt(t);
      const material = new THREE.SpriteMaterial({
        map: getGlyphTexture(GLYPHS[i % GLYPHS.length]),
        transparent: true,
        depthWrite: false,
        opacity: 0.18 + Math.random() * 0.22,
        color: i % 4 === 0 ? "#d4a574" : "#c8ced8",
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(
        p.x + (Math.random() - 0.5) * 0.9,
        p.y + (Math.random() - 0.5) * 0.72,
        p.z + (Math.random() - 0.5) * 0.5
      );
      sprite.scale.setScalar(0.14 + Math.random() * 0.16);
      sprite.userData.phase = Math.random() * Math.PI * 2;
      sprite.userData.baseY = sprite.position.y;
      glyphSprites.push(sprite);
      group.add(sprite);
    }

    const pointer = { x: 0, y: 0 };
    const impulse = { value: 0 };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };
    const onPointerDown = () => {
      impulse.value = 1;
    };

    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerdown", onPointerDown);
    }

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      group.scale.setScalar(width < 768 ? 0.92 : 1.22);
      basePosition.x = width < 768 ? 0.08 : 0.4;
      basePosition.y = width < 768 ? -1.12 : -0.76;
      group.position.x = basePosition.x;
      group.position.y = basePosition.y;
    };

    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;
    const start = performance.now();

    const render = () => {
      const elapsed = prefersReducedMotion
        ? 1.6
        : (performance.now() - start) / 1000;
      material.uniforms.uTime.value = elapsed;
      particleMaterial.uniforms.uTime.value = elapsed;
      impulse.value *= 0.92;
      particleMaterial.uniforms.uPulse.value = impulse.value;

      group.rotation.y += (pointer.x * 0.28 - group.rotation.y) * 0.045;
      group.rotation.x += (-0.14 - pointer.y * 0.14 - group.rotation.x) * 0.045;
      group.rotation.z += (-0.18 + pointer.x * 0.06 - group.rotation.z) * 0.035;
      group.position.x = basePosition.x + pointer.x * 0.16;
      group.position.y = basePosition.y + Math.sin(elapsed * 0.32) * 0.06;
      glyphSprites.forEach((sprite, index) => {
        sprite.position.y =
          sprite.userData.baseY +
          Math.sin(elapsed * 0.9 + sprite.userData.phase) * 0.035;
        const material = sprite.material as THREE.SpriteMaterial;
        material.opacity =
          0.12 +
          Math.max(
            0,
            Math.sin(elapsed * 1.35 + sprite.userData.phase + index * 0.17)
          ) *
            0.32;
      });

      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
      mount.removeChild(renderer.domElement);
      material.dispose();
      particleMaterial.dispose();
      particleGeometry.dispose();
      glyphSprites.forEach((sprite) => {
        (sprite.material as THREE.SpriteMaterial).dispose();
      });
      glyphTextureCache.forEach((texture) => texture.dispose());
      group.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 hidden overflow-hidden opacity-95 dark:block [mask-image:linear-gradient(90deg,transparent,black_6%,black_88%,transparent)]"
    />
  );
}
