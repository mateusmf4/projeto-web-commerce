import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useLocation } from "react-router";
import "./_layout.css";
import Footer from "@/components/Footer";

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
      <Footer />
    </>
  );
}
