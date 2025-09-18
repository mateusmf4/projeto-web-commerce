import { ShoppingCartIcon } from "lucide-react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router";
import "./_layout.css";
import LogoSvg from "../assets/logo.svg?react";

export default function LayoutUsuario() {
  const location = useLocation();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand href="/">
            <LogoSvg className="text-bg-primary" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto" variant="underline">
              <Nav.Item>
                <Nav.Link
                  active={location.pathname === "/"}
                  href="/"
                  className="text-bg-primary"
                >
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={location.pathname === "/produtos"}
                  href="/produtos"
                  className="text-bg-primary"
                >
                  Produtos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={location.pathname === "/contato"}
                  href="/contato"
                  className="text-bg-primary"
                >
                  Contato
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Button
              as="a"
              href="/carrinho"
              style={{
                "--bs-btn-padding-y": ".4rem",
                "--bs-btn-padding-x": ".5rem",
              }}
            >
              <ShoppingCartIcon />
            </Button>
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
