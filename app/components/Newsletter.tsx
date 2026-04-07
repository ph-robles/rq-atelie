"use client"

import { supabase } from "@/lib/supabase"
import { useState } from "react"

export default function Newsletter() {
    const [email, setEmail] = useState("")

    async function handleSubmit() {
        if (!email) return
        await supabase.from("newsletter").insert({ email })
        alert("Obrigada por se inscrever 🤍")
        setEmail("")
    }

    return (
        <div className="newsletter">
            <h2 className="newsletter-title">
                Receba <em>novidades</em>
            </h2>

            <div className="newsletter-form">
                <input
                    className="newsletter-input"
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="newsletter-btn" onClick={handleSubmit}>
                    Assinar
                </button>
            </div>
        </div>
    )
}