// app/encomendas/page.tsx
import type { Metadata } from "next"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import EncomendaForm from "../components/EncomendaForm"

export const metadata: Metadata = {
    title: "Encomendas",
    description:
        "Faça sua encomenda personalizada no RQ Ateliê. Escolha o tipo de peça, cores e ocasião.",
}

export default function EncomendasPage() {
    return (
        <>
            <Nav />
            <main>

                {/* ── HERO ── */}
                <section className="enc-hero">
                    <div className="enc-hero__inner">
                        <div className="section-eyebrow">Personalização</div>
                        <h1 className="enc-hero__title">
                            Uma peça feita<br />
                            especialmente <em>para você</em>
                        </h1>
                        <p className="enc-hero__desc">
                            Preencha o formulário com os detalhes da sua encomenda.
                            Após o envio, você será redirecionada para o WhatsApp para
                            confirmar os detalhes e combinar o prazo.
                        </p>
                    </div>
                </section>

                {/* ── COMO FUNCIONA ── */}
                <section className="enc-steps">
                    <div className="enc-steps__inner">
                        {[
                            { num: "01", title: "Preencha o formulário", desc: "Descreva o que você tem em mente — tipo de peça, cores, ocasião." },
                            { num: "02", title: "Converse no WhatsApp", desc: "A Raquel recebe seus dados e já abre a conversa para alinhar os detalhes." },
                            { num: "03", title: "Peça em produção", desc: "Após combinar prazo e valor, sua encomenda começa a ser feita." },
                            { num: "04", title: "Receba em casa", desc: "Enviamos com cuidado e segurança, ou combinamos a retirada." },
                        ].map((s) => (
                            <div key={s.num} className="enc-step">
                                <div className="enc-step__num">{s.num}</div>
                                <div>
                                    <div className="enc-step__title">{s.title}</div>
                                    <div className="enc-step__desc">{s.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FORMULÁRIO ── */}
                <section className="enc-form-section">
                    <div className="enc-form-section__inner">

                        <div className="enc-form-section__left">
                            <div className="section-eyebrow">Sua encomenda</div>
                            <h2 className="enc-form-section__title">
                                Conta pra mim o que<br />
                                você <em>imaginou</em>
                            </h2>
                            <p className="enc-form-section__sub">
                                Quanto mais detalhes você der, mais fácil fica criar
                                exatamente o que você quer.
                            </p>

                            <div className="enc-info-cards">
                                <div className="enc-info-card">
                                    <span className="enc-info-card__icon">⏱️</span>
                                    <div>
                                        <div className="enc-info-card__title">Prazo médio</div>
                                        <div className="enc-info-card__desc">7 a 21 dias úteis dependendo da peça</div>
                                    </div>
                                </div>
                                <div className="enc-info-card">
                                    <span className="enc-info-card__icon">🎨</span>
                                    <div>
                                        <div className="enc-info-card__title">Cores</div>
                                        <div className="enc-info-card__desc">Ampla paleta de fios disponíveis</div>
                                    </div>
                                </div>
                                <div className="enc-info-card">
                                    <span className="enc-info-card__icon">📦</span>
                                    <div>
                                        <div className="enc-info-card__title">Entrega</div>
                                        <div className="enc-info-card__desc">Todo o Brasil via Correios ou Jadlog</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="enc-form-section__right">
                            <EncomendaForm />
                        </div>

                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}
