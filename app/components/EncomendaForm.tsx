// app/components/EncomendaForm.tsx
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { WHATSAPP_NUMBER } from "@/lib/config"

// ── Tipos ─────────────────────────────────────────────────────────────────────

type Ocasiao = "presente" | "uso_proprio" | "decoracao" | "outro"

type FormData = {
    nome: string
    whatsapp: string
    tipo_peca: string
    cores: string
    ocasiao: Ocasiao | ""
    observacoes: string
}

type FieldError = Partial<Record<keyof FormData, string>>

// ── Validação ─────────────────────────────────────────────────────────────────

function validate(data: FormData): FieldError {
    const errors: FieldError = {}
    if (!data.nome.trim()) errors.nome = "Nome é obrigatório"
    if (!data.whatsapp.trim()) errors.whatsapp = "WhatsApp é obrigatório"
    else if (!/^\d{10,11}$/.test(data.whatsapp.replace(/\D/g, "")))
        errors.whatsapp = "Número inválido"
    if (!data.tipo_peca.trim()) errors.tipo_peca = "Descreva o tipo de peça"
    if (!data.ocasiao) errors.ocasiao = "Selecione a ocasião"
    return errors
}

// ── Mensagem para o WhatsApp ──────────────────────────────────────────────────

function buildMessage(data: FormData): string {
    const ocasiaoLabel: Record<Ocasiao, string> = {
        presente: "Presente",
        uso_proprio: "Uso próprio",
        decoracao: "Decoração",
        outro: "Outro",
    }

    return [
        `Olá Raquel! Fiz uma encomenda pelo site 🧶`,
        ``,
        `*Nome:* ${data.nome}`,
        `*Tipo de peça:* ${data.tipo_peca}`,
        `*Cores:* ${data.cores || "A combinar"}`,
        `*Ocasião:* ${data.ocasiao ? ocasiaoLabel[data.ocasiao as Ocasiao] : "—"}`,
        data.observacoes ? `*Observações:* ${data.observacoes}` : "",
    ]
        .filter(Boolean)
        .join("\n")
}

// ── Componente ────────────────────────────────────────────────────────────────

export default function EncomendaForm() {
    const [form, setForm] = useState<FormData>({
        nome: "",
        whatsapp: "",
        tipo_peca: "",
        cores: "",
        ocasiao: "",
        observacoes: "",
    })

    const [errors, setErrors] = useState<FieldError>({})
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    function set(field: keyof FormData, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }))
        // limpa o erro do campo ao digitar
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    async function handleSubmit() {
        const fieldErrors = validate(form)
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors)
            // scroll pro primeiro erro
            document.querySelector(".enc-field--error")?.scrollIntoView({
                behavior: "smooth", block: "center",
            })
            return
        }

        setLoading(true)

        // 1. Salva no Supabase
        const { error } = await supabase.from("encomendas").insert({
            nome: form.nome.trim(),
            whatsapp: form.whatsapp.replace(/\D/g, ""),
            tipo_peca: form.tipo_peca.trim(),
            cores: form.cores.trim() || null,
            ocasiao: form.ocasiao,
            observacoes: form.observacoes.trim() || null,
        })

        if (error) {
            console.error("Erro ao salvar encomenda:", error.message)
            // Não bloqueia — mesmo com erro no Supabase redireciona pro WhatsApp
        }

        setSaved(true)
        setLoading(false)

        // 2. Redireciona pro WhatsApp após 800ms (dá tempo de ver o feedback)
        setTimeout(() => {
            const msg = buildMessage(form)
            window.open(
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
                "_blank"
            )
        }, 800)
    }

    // ── Sucesso ──
    if (saved) {
        return (
            <div className="enc-success">
                <div className="enc-success__icon">🤍</div>
                <h3 className="enc-success__title">Encomenda registrada!</h3>
                <p className="enc-success__desc">
                    Abrindo o WhatsApp para você conversar diretamente com a Raquel…
                </p>
                <div className="enc-success__loader" />
            </div>
        )
    }

    // ── Formulário ──
    return (
        <div className="enc-form">

            {/* Nome */}
            <div className={`enc-field ${errors.nome ? "enc-field--error" : ""}`}>
                <label className="enc-label">Nome completo *</label>
                <input
                    className="enc-input"
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={(e) => set("nome", e.target.value)}
                />
                {errors.nome && <span className="enc-error">{errors.nome}</span>}
            </div>

            {/* WhatsApp */}
            <div className={`enc-field ${errors.whatsapp ? "enc-field--error" : ""}`}>
                <label className="enc-label">WhatsApp *</label>
                <input
                    className="enc-input"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                />
                {errors.whatsapp && <span className="enc-error">{errors.whatsapp}</span>}
            </div>

            {/* Tipo de peça */}
            <div className={`enc-field ${errors.tipo_peca ? "enc-field--error" : ""}`}>
                <label className="enc-label">Tipo de peça *</label>
                <input
                    className="enc-input"
                    type="text"
                    placeholder="Ex: bolsa tote, amigurumi, top cropped…"
                    value={form.tipo_peca}
                    onChange={(e) => set("tipo_peca", e.target.value)}
                />
                {errors.tipo_peca && <span className="enc-error">{errors.tipo_peca}</span>}
            </div>

            {/* Cores */}
            <div className="enc-field">
                <label className="enc-label">Cores preferidas</label>
                <input
                    className="enc-input"
                    type="text"
                    placeholder="Ex: bege, terracota, tons neutros…"
                    value={form.cores}
                    onChange={(e) => set("cores", e.target.value)}
                />
                <span className="enc-hint">Deixe em branco se quiser sugestões</span>
            </div>

            {/* Ocasião */}
            <div className={`enc-field ${errors.ocasiao ? "enc-field--error" : ""}`}>
                <label className="enc-label">Ocasião *</label>
                <div className="enc-ocasiao-grid">
                    {(
                        [
                            { value: "presente", label: "🎁 Presente" },
                            { value: "uso_proprio", label: "🧍 Uso próprio" },
                            { value: "decoracao", label: "🪴 Decoração" },
                            { value: "outro", label: "✦ Outro" },
                        ] as { value: Ocasiao; label: string }[]
                    ).map((op) => (
                        <button
                            key={op.value}
                            type="button"
                            className={`enc-ocasiao-btn ${form.ocasiao === op.value ? "enc-ocasiao-btn--active" : ""
                                }`}
                            onClick={() => set("ocasiao", op.value)}
                        >
                            {op.label}
                        </button>
                    ))}
                </div>
                {errors.ocasiao && <span className="enc-error">{errors.ocasiao}</span>}
            </div>

            {/* Observações */}
            <div className="enc-field">
                <label className="enc-label">Observações</label>
                <textarea
                    className="enc-textarea"
                    placeholder="Detalhes extras: tamanho, inspiração, prazo necessário…"
                    rows={4}
                    value={form.observacoes}
                    onChange={(e) => set("observacoes", e.target.value)}
                />
            </div>

            {/* Submit */}
            <button
                className="enc-submit"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Enviando…" : "Enviar encomenda no WhatsApp"}
            </button>

            <p className="enc-disclaimer">
                Seus dados são salvos com segurança e usados apenas para
                gerenciar sua encomenda.
            </p>

        </div>
    )
}
