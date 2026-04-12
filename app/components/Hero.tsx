// app/components/Hero.tsx
import ImageCarousel from "./ImageCarousel"

export default function Hero() {
    return (
        <section className="hero">

            {/* ── Lado esquerdo: texto ── */}
            <div className="hero-text">

                <div className="hero-season hero-animate hero-animate--1">
                    Coleção Atual
                </div>

                <h1 className="hero-title">
                    <span className="hero-line hero-animate hero-animate--2">Arte feita</span>
                    <span className="hero-line hero-animate hero-animate--3">à <em>mão</em>,</span>
                    <span className="hero-line hero-animate hero-animate--4">ponto a ponto</span>
                </h1>

                <p className="hero-desc hero-animate hero-animate--5">
                    Cada peça nasce do tempo, do cuidado e da escolha de bons fios.
                    Produções pequenas, com intenção.
                </p>

                <div className="hero-actions hero-animate hero-animate--6">
                    <a href="#colecao" className="btn-solid">Ver peças</a>
                    <a href="#sobre" className="btn-ghost">Nossa história</a>
                </div>

            </div>

            {/* ── Lado direito: carrossel ── */}
            <div className="hero-image">
                <ImageCarousel
                    images={["/hero/01.jpg", "/hero/02.jpg", "/hero/03.jpg"]}
                    interval={5000}
                />
            </div>

        </section>
    )
}
