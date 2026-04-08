// app/components/Hero.tsx
import Image from "next/image"
import { WHATSAPP_URL } from "@/lib/config"

export default function Hero() {
    return (
        <section className="hero">

            {/* ── Lado esquerdo: texto ── */}
            <div className="hero-text">
                <div className="hero-season">Coleção Atual</div>

                <h1 className="hero-title">
                    Arte feita{" "}
                    <br />
                    à <em>mão</em>,{" "}
                    <br />
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

            {/* ── Lado direito: imagem ── */}
            {/*
        IMPORTANTE: coloque uma foto real da Raquel ou dos produtos em:
        /public/hero.jpg  (tamanho ideal: 800x1000px)
 
        Enquanto não tiver a foto real, estou usando uma imagem do Unsplash
        que funciona diretamente como src externa.
 
        Quando tiver a foto real:
        1. Coloque em /public/hero.jpg
        2. Troque src para "/hero.jpg"
        3. Remova o domínio de images.unsplash.com do next.config.js
      */}
            <div className="hero-image">
                <Image
                    src="https://images.unsplash.com/photo-1612965110667-4175024b0f77?w=800&q=80"
                    alt="Crochê artesanal feito à mão"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                />
            </div>

        </section>
    )
}

