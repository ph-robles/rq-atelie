"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/* ========= TIPOS ========= */

type Product = {
    id: string
    name: string | null
    price: number | null
    image_url: string | null
    whatsapp_text: string | null
    is_new: boolean
    accepts_custom: boolean
    is_available: boolean
}

/* ========= HELPERS ========= */

function formatPrice(price: number | null) {
    if (!price) return ""
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price)
}

function buildWhatsAppLink(text: string | null) {
    const message = text ?? "Olá! Gostaria de saber mais sobre essa peça."
    return `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
}

/* ========= COMPONENTES ========= */

function ProductCard({ product }: { product: Product }) {
    const whatsappLink = buildWhatsAppLink(product.whatsapp_text)

    return (
        <div className="product-card">
            <div className="product-img">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name ?? "Produto artesanal"}
                        className="product-img__photo"
                    />
                ) : (
                    <span className="product-img__placeholder">🧶</span>
                )}

                {product.is_new && (
                    <span className="product-tag product-tag--new">Novo</span>
                )}

                {product.accepts_custom && (
                    <span className="product-tag product-tag--custom">
                        Personalizado
                    </span>
                )}
            </div>

            <div className="product-info">
                <div className="product-brand">RQ Ateliê</div>
                <div className="product-name">{product.name}</div>
                <div className="product-price">
                    {formatPrice(product.price)}
                </div>
            </div>

            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="product-cta"
            >
                Falar sobre essa peça
            </a>
        </div>
    )
}

/* ========= GRID ========= */

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProducts() {
            const { data } = await supabase
                .from("products")
                .select("*")
                .eq("is_available", true)
                .order("id", { ascending: false })

            setProducts((data ?? []) as Product[])
            setLoading(false)
        }

        loadProducts()
    }, [])

    if (loading) {
        return (
            <div className="product-grid">
                <div className="product-card">Carregando…</div>
                <div className="product-card">Carregando…</div>
                <div className="product-card">Carregando…</div>
            </div>
        )
    }

    return (
        <section id="colecao" className="product-section">
            <div className="section-head">
                <div className="section-eyebrow">Coleção Atual</div>
                <h2 className="section-title">
                    Peças em <em>Destaque</em>
                </h2>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}