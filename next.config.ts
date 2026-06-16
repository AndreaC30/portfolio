import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Las imágenes no pueden usar el optimizador de Next en modo export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
