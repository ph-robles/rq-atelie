"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { WHATSAPP_NUMBER } from "@/lib/config"

/* ── Tipagem ───────────────────────────────────────────────────────────── */

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

/* ── Configuração de paginação ────────────────────────────────────────── */

const PAGE_SIZE = 6

/* ── Helpers ───────────────────────────────────────────────────────────── */

function formatPrice(price: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price)
}

function buildWhatsAppLink(text: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/* ── Subcomponentes ────────────────────────────────────────────────────── */

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

function ProductCard({ product }: { product: Product }) {
    const whatsappLink = buildWhatsAppLink(product.whatsapp_text)

    return (
        <div className="product-card">
            <div className="product-img">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
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

                {product.description && (
                    <div className="product-description">
                        {product.description}
                    </div>
                )}

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
                {product.accepts_custom
                    ? "Encomendar via WhatsApp"
                    : "Falar sobre essa peça"}
            </a>
        </div>
    )
}

/* ── Componente principal ─────────────────────────────────────────────── */

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    async function fetchProducts() {
        setLoading(true)
        setError(null)

        const { data, error, count } = await supabase
            .from("products")
            .select("*", { count: "exact" })
            .eq("is_available", true)
            .order("created_at", { ascending: false })
            .range(from, to)

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        setProducts(data as Product[])
        setTotal(count || 0)
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [page])

    const totalPages = Math.ceil(total / PAGE_SIZE)

    return (
        <section id="colecao" className="product-section">
            <div className="section-head">
                <div className="section-eyebrow">Coleção Atual</div>
                <h2 className="section-title">
                    Peças em <em>Destaque</em>
                </h2>
            </div>

            {loading && (
                <div className="product-grid">
                    {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {!loading && error && (
                <p style={{ textAlign: "center" }}>Erro ao carregar produtos</p>
            )}

            {!loading && !error && products.length > 0 && (
                <>
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* PAGINAÇÃO */}
                    <div className="pagination">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            ← Anterior
                        </button>

                        <span>
                            Página {page} de {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Próxima →
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}