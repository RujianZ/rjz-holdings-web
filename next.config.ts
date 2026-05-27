import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  /**
   * 301 redirects for the URLs that used to live in this site's
   * /lab section. Lab moved to the sibling studio's domain.
   * Anyone who bookmarked, search-indexed, or shared an old /lab
   * link lands on the equivalent Work surface there.
   */
  async redirects() {
    return [
      // /lab routes moved to the sibling studio's domain.
      {
        source: "/lab",
        destination: "https://rjzventures.co/work",
        permanent: true,
      },
      {
        source: "/lab/:path*",
        destination: "https://rjzventures.co/work",
        permanent: true,
      },
      {
        source: "/zh/lab",
        destination: "https://rjzventures.co/zh/work",
        permanent: true,
      },
      {
        source: "/zh/lab/:path*",
        destination: "https://rjzventures.co/zh/work",
        permanent: true,
      },
      // Old venture detail pages for projects now hosted on the
      // studio site (LogicLink, HNDSL Portal). Their /ventures/<slug>
      // URLs used to resolve here; redirect those too.
      {
        source: "/ventures/logiclink",
        destination: "https://rjzventures.co/work",
        permanent: true,
      },
      {
        source: "/ventures/hndsl-portal",
        destination: "https://rjzventures.co/work",
        permanent: true,
      },
      {
        source: "/zh/ventures/logiclink",
        destination: "https://rjzventures.co/zh/work",
        permanent: true,
      },
      {
        source: "/zh/ventures/hndsl-portal",
        destination: "https://rjzventures.co/zh/work",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-frontmatter", ["yaml"]]],
  },
});

export default withMDX(nextConfig);
