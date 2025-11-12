import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false
  }
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextra(nextConfig);
