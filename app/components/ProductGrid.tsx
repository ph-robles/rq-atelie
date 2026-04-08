// app/components/ProductGrid.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { supabase, type Product } from "@/lib/supabase"
import { WHATSAPP_NUMBER } from "@/lib/config"

// ── Helpers ───────────────────────────────────────────────────────────────────

function getImageUrl(path: string | null): string | null {
    if (!path) return null
    const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(path)
    return data.publicUrl
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price)
}

function buildWhatsAppLink(text: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

// ── Sub-componentes ───────────────────────────────────────────────────────────

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
            <p className="product-grid-empty__title">Nenhuma peça disponível no momento</p>
            <p className="product-grid-empty__sub">
                Entre em contato pelo WhatsApp para ver encomendas personalizadas.
            </p>
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Olá! Quero saber sobre peças disponíveis e encomendas."
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
            <p className="product-grid-error__title">Não foi possível carregar os produtos</p>
            <p className="product-grid-error__sub">Verifique sua conexão e tente novamente.</p>
            <button onClick={onRetry} className="btn-solid">
                Tentar novamente
            </button>
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
    const imageUrl = getImageUrl(product.image_path)
    const whatsappLink = buildWhatsAppLink(product.whatsapp_text)

    return (
        <div className="product-card">
            {/* Imagem */}
            <div className="product-img">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="product-img__photo"
                        style={{ objectFit: "cover" }}
                    />
                ) : (
                    <span className="product-img__placeholder">🧶</span>
                )}

                {product.is_new && (
                    <span className="product-tag product-tag--new">Novo</span>
                )}

                {product.accepts_custom && (
                    <span className="product-tag product-tag--custom">Personalizado</span>
                )}
            </div>

            {/* Info */}
            <div className="product-info">
                <div className="product-brand">RQ Ateliê</div>
                <div className="product-name">{product.name}</div>
                {product.description && (
                    <div className="product-description">{product.description}</div>
                )}
                <div className="product-price">{formatPrice(product.price)}</div>
            </div>

            {/* CTA */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="product-cta"
            >
                {product.accepts_custom ? "Encomendar via WhatsApp" : "Falar sobre essa peça"}
            </a>
        </div>
    )
}

// ── Componente principal ──────────────────────────────────────────────────────

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
            .eq("is_available", true)   // só produtos disponíveis
            .order("created_at", { ascending: false }) // mais recentes primeiro

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
            {/* Cabeçalho da seção */}
            <div className="section-head">
                <div className="section-eyebrow">Coleção Atual</div>
                <h2 className="section-title">
                    Peças em <em>Destaque</em>
                </h2>
            </div>

            {/* Estados */}
            {loading && (
                <div className="product-grid">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {!loading && error && <ErrorState onRetry={fetchProducts} />}

            {!loading && !error && products.length === 0 && <EmptyState />}

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
