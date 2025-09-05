import { Outlet, useLocation } from "react-router";
import "./_layout.css";
import { ShoppingCartIcon } from "lucide-react";
import Logo from "../assets/logo.png";

export default function LayoutUsuario() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <img src={Logo} alt="Logotipo" />
        <div className="navbar--links">
          <a href="/" data-active={location.pathname === "/"}>
            Home
          </a>
          <a href="/produtos" data-active={location.pathname === "/produtos"}>
            Produtos
          </a>
          <a href="/contato" data-active={location.pathname === "/contato"}>
            Contato
          </a>
        </div>

        <div className="flex-1"></div>

        <div className="navbar--carrinho">
          <a href="/carrinho">
            <ShoppingCartIcon />
          </a>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
