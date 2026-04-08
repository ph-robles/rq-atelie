// next.config.js  (ou next.config.ts se preferir)
// Na raiz do projeto — substitui o que você já tem

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage — suas fotos de produto
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Unsplash — imagem temporária do hero
      // Remova esse bloco quando tiver foto real em /public/hero.jpg
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}