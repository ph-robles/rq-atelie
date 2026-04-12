// app/sobre/page.tsx
import type { Metadata } from "next"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Newsletter from "../components/Newsletter"
import { WHATSAPP_NUMBER } from "@/lib/config"

export const metadata: Metadata = {
    title: "Sobre",
    description:
        "Conheça a história da Raquel Lima e do RQ Ateliê — crochê artesanal feito à mão, ponto a ponto.",
}

export default function SobrePage() {
    return (
        <>
            <Nav />
            <main>

                {/* ── HERO DA PÁGINA ── */}
                <section className="sobre-hero">
                    <div className="sobre-hero__image" />
                    <div className="sobre-hero__text">
                        <div className="section-eyebrow">Nossa história</div>
                        <h1 className="sobre-hero__title">
                            Cada ponto tem<br />
                            uma <em>intenção</em>
                        </h1>
                    </div>
                </section>

                {/* ── HISTÓRIA ── */}
                <section className="sobre-story">
                    <div className="sobre-story__inner">

                        <div className="sobre-story__text">
                            <p className="sobre-story__lead">
                                O RQ Ateliê nasceu de uma agulha, um fio e muita vontade de criar
                                algo com as próprias mãos.
                            </p>
                            <p>
                                Sou a Raquel Lima, e o crochê entrou na minha vida como hobby —
                                aquelas tardes calmas fazendo pontinhos enquanto o mundo girava lá
                                fora. Com o tempo, o que era passatempo virou ofício. Cada peça que
                                saía das minhas mãos tinha algo de especial: era única, tinha tempo,
                                tinha cuidado.
                            </p>
                            <p>
                                Decidi transformar isso numa forma de levar esse cuidado para outras
                                pessoas. Hoje o ateliê é pequeno e assim quero mantê-lo —
                                produções limitadas, com atenção a cada detalhe, sem escala
                                industrial.
                            </p>
                            <p>
                                Trabalho com crochê e macramê, usando fios selecionados que são
                                gentis com a pele e com o meio ambiente. Aceito encomendas
                                personalizadas porque acredito que uma peça feita especialmente para
                                você é ainda mais especial.
                            </p>
                        </div>

                        <div className="sobre-story__image">
                            {/* Troque por uma foto real da Raquel:
                  /public/sobre/raquel.jpg */}
                            <div className="sobre-story__photo-placeholder">
                                <span>📸</span>
                                <small>Foto da Raquel</small>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ── VALORES ── */}
                <section className="sobre-valores">
                    <div className="section-head">
                        <div className="section-eyebrow">O que nos guia</div>
                        <h2 className="section-title">Feito com <em>intenção</em></h2>
                    </div>

                    <div className="sobre-valores__grid">
                        <div className="sobre-valor">
                            <div className="sobre-valor__icon">🧶</div>
                            <h3 className="sobre-valor__title">Feito à mão</h3>
                            <p className="sobre-valor__desc">
                                Cada ponto dado com presença e cuidado. Sem produção em massa,
                                sem pressa.
                            </p>
                        </div>
                        <div className="sobre-valor">
                            <div className="sobre-valor__icon">🌿</div>
                            <h3 className="sobre-valor__title">Fios selecionados</h3>
                            <p className="sobre-valor__desc">
                                Materiais de qualidade, macios e duráveis. Pensados para quem vai
                                usar e para o planeta.
                            </p>
                        </div>
                        <div className="sobre-valor">
                            <div className="sobre-valor__icon">✦</div>
                            <h3 className="sobre-valor__title">Peças únicas</h3>
                            <p className="sobre-valor__desc">
                                Produções pequenas e limitadas. Quando você compra uma peça do
                                ateliê, ela é só sua.
                            </p>
                        </div>
                        <div className="sobre-valor">
                            <div className="sobre-valor__icon">💬</div>
                            <h3 className="sobre-valor__title">Atendimento direto</h3>
                            <p className="sobre-valor__desc">
                                Você fala direto comigo. Sem intermediários, sem chatbot —
                                só conversa de verdade.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── PROCESSO ── */}
                <section className="sobre-processo">
                    <div className="sobre-processo__inner">
                        <div className="section-head" style={{ textAlign: "left", padding: "0 0 48px" }}>
                            <div className="section-eyebrow">Como funciona</div>
                            <h2 className="section-title">Do fio à <em>peça pronta</em></h2>
                        </div>

                        <div className="sobre-processo__steps">
                            {[
                                { num: "01", title: "Escolha dos fios", desc: "Seleciono os materiais com cuidado — textura, cor e resistência. Só começo quando o fio está certo." },
                                { num: "02", title: "Criação", desc: "Cada peça nasce nos meus horários livres, com calma e atenção. Não existe linha de produção aqui." },
                                { num: "03", title: "Acabamento", desc: "Verifico cada detalhe antes de embalar. Nenhuma peça sai do ateliê sem estar perfeita." },
                                { num: "04", title: "Entrega", desc: "Embalo com carinho e envio com segurança. Você recebe em casa ou combinamos a retirada." },
                            ].map((step) => (
                                <div key={step.num} className="sobre-step">
                                    <div className="sobre-step__num">{step.num}</div>
                                    <div className="sobre-step__content">
                                        <h3 className="sobre-step__title">{step.title}</h3>
                                        <p className="sobre-step__desc">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA FINAL ── */}
                <section className="sobre-cta">
                    <div className="sobre-cta__inner">
                        <h2 className="sobre-cta__title">
                            Vamos criar algo<br />
                            <em>juntas?</em>
                        </h2>
                        <p className="sobre-cta__desc">
                            Me manda uma mensagem e conta o que você tem em mente.
                            Adoro conversar sobre encomendas personalizadas.
                        </p>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                "Olá Raquel! Vi sua história no site e quero conversar sobre uma peça."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-solid"
                        >
                            Falar no WhatsApp
                        </a>
                    </div>
                </section>

            </main>

            <Newsletter />
            <Footer />
        </>
    )
}
