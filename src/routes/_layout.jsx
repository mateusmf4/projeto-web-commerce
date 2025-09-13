import { Outlet, useLocation } from "react-router";
import "./_layout.css";
import { ShoppingCartIcon } from "lucide-react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import Logo from "../assets/logo.png";

export default function LayoutUsuario() {
  const location = useLocation();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-primary layout__navbar"
      >
        <Container>
          <Navbar.Brand href="/">
            <Image src={Logo} alt="Logotipo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link
                active={location.pathname === "/"}
                href="/"
                className="text-bg-primary"
              >
                Home
              </Nav.Link>
              <Nav.Link
                active={location.pathname === "/produtos"}
                href="/produtos"
                className="text-bg-primary"
              >
                Produtos
              </Nav.Link>
              <Nav.Link
                active={location.pathname === "/contato"}
                href="/contato"
                className="text-bg-primary"
              >
                Contato
              </Nav.Link>
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
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
