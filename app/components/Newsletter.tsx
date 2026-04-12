// app/components/Newsletter.tsx
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

type Status = "idle" | "loading" | "success" | "error"

export default function Newsletter() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<Status>("idle")

    async function handleSubmit() {
        if (!email || status === "loading") return

        // Validação básica de e-mail
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        if (!isValid) {
            setStatus("error")
            return
        }

        setStatus("loading")

        const { error } = await supabase
            .from("newsletter")
            .insert({ email })

        if (error) {
            // Ignora erro de duplicata (e-mail já cadastrado)
            if (error.code === "23505") {
                setStatus("success")
            } else {
                setStatus("error")
            }
            return
        }

        setStatus("success")
        setEmail("")
    }

    // Permite enviar com Enter
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") handleSubmit()
    }

    return (
        <div className="newsletter">
            <div className="section-eyebrow">Fique por dentro</div>

            <h2 className="newsletter-title">
                Receba <em>novidades</em>
            </h2>

            <p className="newsletter-sub">
                Novas peças, lançamentos e promoções direto no seu e-mail.
            </p>

            {status === "success" ? (
                <p className="newsletter-success">
                    🤍 Obrigada! Você receberá nossas novidades em breve.
                </p>
            ) : (
                <>
                    <div className="newsletter-form">
                        <input
                            className="newsletter-input"
                            type="email"
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setStatus("idle") }}
                            onKeyDown={handleKeyDown}
                            disabled={status === "loading"}
                        />
                        <button
                            className="newsletter-btn"
                            onClick={handleSubmit}
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "..." : "Assinar"}
                        </button>
                    </div>

                    {status === "error" && (
                        <p className="newsletter-error">
                            Verifique o e-mail e tente novamente.
                        </p>
                    )}
                </>
            )}
        </div>
    )
}
