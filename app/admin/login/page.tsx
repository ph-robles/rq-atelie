"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        setLoading(false)

        if (error) {
            alert("Login inválido")
            return
        }

        router.push("/admin")
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FAFAF8",
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    background: "white",
                    padding: "40px",
                    border: "1px solid #E8E4DC",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <h1
                    style={{
                        fontFamily: "Cormorant Garamond, serif",
                        marginBottom: "24px",
                    }}
                >
                    RQ <em style={{ color: "#C4714A" }}>Ateliê</em> · Admin
                </h1>

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                />

                <button type="submit" className="btn-solid" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </main>
    )
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    border: "1px solid #E8E4DC",
}