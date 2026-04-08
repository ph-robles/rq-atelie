export default function Hero() {
    return (
        <section className="hero hero-split">
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

            <div className="hero-image">
                <img
                    src="https://images.unsplash.com/photo-1618354691373-65b84b8a8f6c?auto=format&fit=crop&w=1200&q=80"
                    alt="Crochê artesanal"
                />
            </div>
        </section>
    )
}
