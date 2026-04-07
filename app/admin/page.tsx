"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminPage() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function checkAuth() {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (!session) {
                router.push("/admin/login")
                return
            }

            setLoading(false)
        }

        checkAuth()
    }, [router])

    if (loading) {
        return (
            <main style={{ padding: "80px", textAlign: "center" }}>
                Carregando...
            </main>
        )
    }

    return (
        <main style={{ padding: "80px", maxWidth: "600px", margin: "0 auto" }}>

            {/* ✅ BOTÃO DE SAIR */}
            <button
                onClick={async () => {
                    await supabase.auth.signOut()
                    router.push("/admin/login")
                }}
                style={{
                    marginBottom: "32px",
                    background: "transparent",
                    border: "1px solid #E8E4DC",
                    padding: "10px 16px",
                    cursor: "pointer",
                }}
            >
                Sair
            </button>

            <h1
                style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "32px",
                    marginBottom: "24px",
                }}
            >
                Admin · RQ <em style={{ color: "#C4714A" }}>Ateliê</em>
            </h1>

            <p style={{ marginBottom: "24px" }}>
                Você está logada ✅
            </p>

            {/* Aqui fica o formulário de cadastro de produto */}
        </main>
    )
}
