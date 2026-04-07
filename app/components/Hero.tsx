export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-right">
                <div className="hero-season">Coleção Atual</div>

                <h1 className="hero-title">
                    Arte feita
                    <br />
                    à <em>mão</em>
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
        </section>
    )
}