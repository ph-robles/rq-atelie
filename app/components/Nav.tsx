export default function Nav() {
    return (
        <>
            <div className="announce">
                FRETE GRÁTIS PARA PEDIDOS ACIMA DE <span>R$ 200</span> · ENCOMENDAS{" "}
                <span>PERSONALIZADAS</span>
            </div>

            <nav>
                <ul className="nav-left">
                    <li><a href="#colecao">Coleção</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                </ul>

                <a href="/" className="nav-logo">
                    RQ <em>Ateliê</em>
                </a>

                <div className="nav-right">
                    <a href="https://wa.me/5511999999999" target="_blank">Contato</a>
                </div>
            </nav>
        </>
    )
}