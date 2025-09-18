import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router";
import LogoSvg from "@/assets/logo.svg?react";
import "./_layout.css";

export default function LayoutUsuario() {
  const location = useLocation();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand href="/lojista">
            <h3 className="m-0 text-bg-primary pb-1">Gerenciamento</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto" variant="underline">
              <Nav.Item>
                <Nav.Link
                  href="/lojista"
                  active={location.pathname === "/lojista"}
                  className="text-bg-primary"
                >
                  Produtos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/lojista/pedidos"
                  active={location.pathname === "/lojista/pedidos"}
                  className="text-bg-primary"
                >
                  Pedidos
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page content */}
      <Container className="_layout__page-content-container">
        <Outlet />
      </Container>

      {/* Page footer */}
      <footer className="py-3 mt-4 border-top bg-body-tertiary">
        <Container>
          <div className="d-flex flex-column gap-3 flex-lg-row align-items-center justify-content-between">
            <div className="d-flex align-items-center text-body-secondary gap-2">
              <Link to="/" className="text-body-secondary lh-1">
                <LogoSvg className="lh-1" />
              </Link>
              <span>&copy; 2025 Filipe & Mateus</span>
            </div>
            <a href="/lojista" className="text-body-secondary">
              Painel Lojista
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}
