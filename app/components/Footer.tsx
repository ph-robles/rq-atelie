// app/components/Footer.tsx
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/config"

export default function Footer() {
    return (
        <footer>
            <div className="footer-grid">

                <div>
                    <div className="footer-brand">RQ <em>Ateliê</em></div>
                    <div className="footer-tagline">
                        Crochê artesanal feito à mão, ponto a ponto.
                    </div>
                    <div className="footer-social">
                        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                            WhatsApp
                        </a>
                    </div>
                </div>

                <div>
                    <div className="footer-col-title">Ateliê</div>
                    <ul className="footer-links">
                        <li><a href="/#colecao">Coleção</a></li>
                        <li><a href="/sobre">Sobre</a></li>
                        <li><a href="/encomendas">Encomendas</a></li>
                    </ul>
                </div>

                <div>
                    <div className="footer-col-title">Informações</div>
                    <ul className="footer-links">
                        <li><a href="/sobre#processo">Como funciona</a></li>
                        <li><a href="/sobre#processo">Prazos</a></li>
                        <li>
                            <a
                                href={`${WHATSAPP_URL}?text=${encodeURIComponent("Olá! Quero saber sobre trocas e devoluções.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Trocas
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="footer-col-title">Contato</div>
                    <ul className="footer-links">
                        <li>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                                WhatsApp
                            </a>
                        </li>
                        <li>
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                                Instagram DM
                            </a>
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
