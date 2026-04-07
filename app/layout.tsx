import "./globals.css"
import { Cormorant_Garamond, Jost } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
})

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
})

export const metadata = {
  title: "RQ Ateliê — Crochê Artesanal",
  description:
    "Crochê e macramê artesanal feito à mão, ponto a ponto. Peças exclusivas e sob encomenda.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${jost.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  )
}