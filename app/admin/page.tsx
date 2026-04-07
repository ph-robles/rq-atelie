"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [whatsappText, setWhatsappText] = useState("")
    const [isNew, setIsNew] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.from("products").insert({
            name,
            price: Number(price),
            whatsapp_text: whatsappText,
            is_new: isNew,
        })

        setLoading(false)

        if (error) {
            alert("Erro ao cadastrar produto")
            console.error(error)
            return
        }

        alert("Produto cadastrado com sucesso ✅")
        setName("")
        setPrice("")
        setWhatsappText("")
        setIsNew(false)
    }

    return (
        <main style={{ padding: "80px 40px", maxWidth: "600px", margin: "0 auto" }}>
            <h1
                style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "32px",
                    marginBottom: "24px",
                }}
            >
                Admin · RQ <em style={{ color: "#C4714A" }}>Ateliê</em>
            </h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                    <label>Nome da peça</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label>Preço (R$)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label>Texto do WhatsApp</label>
                    <textarea
                        value={whatsappText}
                        onChange={(e) => setWhatsappText(e.target.value)}
                        required
                        rows={4}
                        style={inputStyle}
                    />
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isNew}
                            onChange={(e) => setIsNew(e.target.checked)}
                        />{" "}
                        Marcar como novo
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-solid"
                >
                    {loading ? "Salvando..." : "Cadastrar produto"}
                </button>
            </form>
        </main>
    )
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    border: "1px solid #e8e4dc",
    fontFamily: "inherit",
}
    