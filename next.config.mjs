/** @type {import('next').NextConfig} */
const nextConfig = {
  // routes from the previous version of the site, folded into the new structure
  async redirects() {
    return [
      { source: "/experience", destination: "/resume", permanent: true },
      { source: "/workbench", destination: "/resume#r-skills", permanent: true },
      { source: "/lab", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
