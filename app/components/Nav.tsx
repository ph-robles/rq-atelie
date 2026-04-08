// app/components/Nav.tsx
import { WHATSAPP_URL } from "@/lib/config"

export default function Nav() {
    return (
        <>
            {/* ── Barra de aviso ── */}
            <div className="announce">
                FRETE GRÁTIS PARA PEDIDOS ACIMA DE{" "}
                <span>R$ 200</span>{" "}
                ·{" "}
                ENCOMENDAS <span>PERSONALIZADAS</span>
            </div>

            {/* ── Navegação principal ── */}
            <nav className="main-nav">
                <ul className="nav-left">
                    <li>
                        <a href="#colecao">Coleção</a>
                    </li>
                    <li>
                        <a href="#sobre">Sobre</a>
                    </li>
                </ul>

                <a href="/" className="nav-logo">
                    RQ <em>Ateliê</em>
                </a>

                <div className="nav-right">
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contato
                    </a>
                </div>
            </nav>
        </>
    )
}
