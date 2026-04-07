"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Product = {
    id: number
    name: string
    price: number | string
    is_new: boolean
    image_path: string | null
    whatsapp_text: string
}

async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")

    if (error) {
        console.error(error)
        return []
    }

    return data as Product[]
}

/* 🔗 Gera URL pública da imagem no Supabase Storage */
function getImageUrl(path: string | null): string | null {
    if (!path) return null

    const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(path)

    return data.publicUrl
}

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        getProducts().then(setProducts)
    }, [])

    return (
        <div id="colecao" className="product-grid">
            {products.map((p) => {
                const imageUrl = getImageUrl(p.image_path)

                return (
                    <div key={p.id} className="product-card">

                        <div className="product-img">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={p.name}
                                />
                            ) : (
                                <span style={{ fontSize: "40px" }}>🧶</span>
                            )}

                            {p.is_new && (
                                <span className="product-tag-new">Novo</span>
                            )}
                        </div>

                        <div className="product-info">
                            <div className="product-brand">RQ Ateliê</div>

                            <div className="product-name">
                                {p.name}
                            </div>

                            <div className="product-price">
                                R$ {Number(p.price).toFixed(2)}
                            </div>
                        </div>

                        <button
                            className="product-cta whatsapp"
                            onClick={() =>
                                window.open(
                                    `https://wa.me/5511999999999?text=${encodeURIComponent(
                                        p.whatsapp_text
                                    )}`,
                                    "_blank"
                                )
                            }
                        >
                            Falar sobre essa peça
                        </button>
                    </div>
                )
            })}
        </div>
    )
}