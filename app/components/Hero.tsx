import ImageCarousel from "./ImageCarousel"
import { WHATSAPP_URL } from "@/lib/config"

export default function Hero() {
    return (
        <section className="hero hero-split">
            {/* ── Lado esquerdo: texto ── */}
            <div className="hero-text">
                <div className="hero-season">Coleção Atual</div>

                <h1 className="hero-title">
                    Arte feita <br />
                    à <em>mão</em>, <br />
                    ponto a ponto
                </h1>

                <p className="hero-desc">
                    Cada peça nasce do tempo, do cuidado e da escolha de bons fios.
                    Produções pequenas, com intenção.
                </p>

                <div className="hero-actions">
                    <a href="#colecao" className="btn-solid">
                        Ver peças
                    </a>
                    <a href="#sobre" className="btn-ghost">
                        Nossa história
                    </a>
                </div>
            </div>

            {/* ── Lado direito: carrossel de imagens ── */}
            <div className="hero-image">
                <ImageCarousel
                    images={[
                        "/hero/01.jpg",
                        "/hero/02.jpg",
                        "/hero/03.jpg",
                    ]}
                    interval={4500}
                />
            </div>
        </section>
    )
}