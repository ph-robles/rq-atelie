import { supabase } from "@/lib/supabase"

async function getProducts() {
    const { data } = await supabase.from("products").select("*")
    return data
}

export default async function ProductGrid() {
    const products = await getProducts()

    return (
        <div id="colecao" className="product-grid">
            {products?.map((p) => (
                <div key={p.id} className="product-card">
                    <div className="product-img">
                        🧶
                        {p.is_new && <span className="product-tag-new">Novo</span>}
                    </div>

                    <div className="product-info">
                        <div className="product-brand">RQ Ateliê</div>
                        <div className="product-name">{p.name}</div>
                        <div className="product-price">R$ {p.price}</div>
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
            ))}
        </div>
    )
}