"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { WHATSAPP_NUMBER } from "@/lib/config"

// Tipagem do produto (ajustada à sua tabela)
export interface Product {
    id: string
    name: string
    description?: string | null
    price: number
    image_url?: string | null
    whatsapp_text: string
    is_new: boolean
    accepts_custom: boolean
    is_available: boolean
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price)
}

function buildWhatsAppLink(text: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

// ── Sub‑componentes ─────────────────────────────────────────────────────────

function ProductCardSkeleton() {
    return (
        <div className="product-card product-card--skeleton">
            <div className="product-img product-img--skeleton" />
            <div className="product-info">
                <div className="skeleton-line skeleton-line--short" />
                <div className="skeleton-line" />
                <div className="skeleton-line skeleton-line--price" />
            </div>
            <div className="product-cta product-cta--skeleton" />
        </div>
    )
}

function EmptyState() {
    return (
        <div className="product-grid-empty">
            <span className="product-grid-empty__icon">🧶</span>
            <p className="product-grid-empty__title">
                Nenhuma peça disponível no momento
            </p>
            <p className="product-grid-empty__sub">
                Entre em contato pelo WhatsApp para encomendas personalizadas.
            </p>

            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Olá! Gostaria de saber sobre peças disponíveis e encomendas."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid"
            >
                Falar no WhatsApp
            </a>
        </div>
    )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="product-grid-error">
            <span className="product-grid-error__icon">⚠️</span>
            <p className="product-grid-error__title">
                Não foi possível carregar os produtos
            </p>
            <p className="product-grid-error__sub">
                Verifique sua conexão e tente novamente.
            </p>
            <button onClick={onRetry} className="btn-solid">
                Tentar novamente
            </button>
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
    const whatsappLink = buildWhatsAppLink(product.whatsapp_text)

    return (
        <div className="product-card">
            {/* Imagem */}
            <div className="product-img">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="product-img__photo"
                        loading="lazy"
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

            {/* Info */}
            <div className="product-info">
                <div className="product-brand">RQ Ateliê</div>
                <div className="product-name">{product.name}</div>

                {product.description && (
                    <div className="product-description">
                        {product.description}
                    </div>
                )}

                <div className="product-price">
                    {formatPrice(product.price)}
                </div>
            </div>

            {/* CTA */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="product-cta"
            >
                {product.accepts_custom
                    ? "Encomendar via WhatsApp"
                    : "Falar sobre essa peça"}
            </a>
        </div>
    )
}

// ── Componente principal ─────────────────────────────────────────────────────

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchProducts() {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("is_available", true)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Erro Supabase:", error.message)
            setError(error.message)
            setLoading(false)
            return
        }

        setProducts(data as Product[])
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <section id="colecao" className="product-section">
            {/* Cabeçalho */}
            <div className="section-head">
                <div className="section-eyebrow">Coleção Atual</div>
                <h2 className="section-title">
                    Peças em <em>Destaque</em>
                </h2>
            </div>

            {/* Loading */}
            {loading && (
                <div className="product-grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {/* Error */}
            {!loading && error && <ErrorState onRetry={fetchProducts} />}

            {/* Empty */}
            {!loading && !error && products.length === 0 && <EmptyState />}

            {/* Grid */}
            {!loading && !error && products.length > 0 && (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    )
}