// app/layout.tsx
import type { Metadata } from "next"
import { STORE_NAME, STORE_DESCRIPTION } from "@/lib/config"
import CustomCursor from "./components/CustomCursor"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: `${STORE_NAME} — Crochê Artesanal Feito à Mão`,
    template: `%s | ${STORE_NAME}`,
  },
  description: STORE_DESCRIPTION,
  keywords: [
    "crochê artesanal",
    "macramê",
    "feito à mão",
    "artesanato brasileiro",
    "encomendas personalizadas",
    "RQ Ateliê",
  ],
  authors: [{ name: "Raquel Lima" }],
  creator: "RQ Ateliê",
  openGraph: {
    title: STORE_NAME,
    description: STORE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg", // crie uma imagem 1200×630 e coloque em /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: STORE_NAME,
      },
    ],
    locale: "pt_BR",
    type: "website",
    siteName: STORE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: STORE_NAME,
    description: STORE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
