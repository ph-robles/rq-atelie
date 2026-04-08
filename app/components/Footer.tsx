export default function Footer() {
    return (
        <footer>
            <div className="footer-grid">
                <div>
                    <div className="footer-brand">
                        RQ <em>Ateliê</em>
                    </div>

                    <div className="footer-tagline">
                        Crochê e macramê artesanal feito à mão, ponto a ponto.
                    </div>

                    <div className="footer-social">
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>

                        <a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>

                <div>
                    <div className="footer-col-title">Ateliê</div>
                    <ul className="footer-links">
                        <li>
                            <a href="#colecao">Coleção</a>
                        </li>
                        <li>
                            <a href="#sobre">Sobre</a>
                        </li>
                        <li>
                            <a href="#colecao">Encomendas</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="footer-col-title">Informações</div>
                    <ul className="footer-links">
                        <li>
                            <a href="#">Como comprar</a>
                        </li>
                        <li>
                            <a href="#">Prazos</a>
                        </li>
                        <li>
                            <a href="#">Trocas</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="footer-col-title">Contato</div>
                    <ul className="footer-links">
                        <li>
                            <a
                                href="https://wa.me/5511999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                WhatsApp
                            </a>
                        </li>
                        <li>
                            <a href="#">Instagram DM</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} RQ Ateliê</span>
                <span>Feito à mão no Brasil</span>
            </div>
        </footer>
    )
}
``