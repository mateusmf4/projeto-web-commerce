import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useLocation } from "react-router";
import "./_layout.css";
import Footer from "@/components/Footer";

export function meta() {
  return [{ title: "Painel Admin | éComércio" }];
}

export default function LayoutUsuario() {
  const location = useLocation();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand href="/admin">
            <h3 className="m-0 text-bg-primary pb-1">Admin</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto" variant="underline">
              <Nav.Item>
                <Nav.Link
                  href="/admin"
                  active={location.pathname === "/admin"}
                  className="text-bg-primary"
                >
                  Lojistas
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page content */}
      <Container className="flex-fill">
        <Outlet />
      </Container>

      {/* Page footer */}
      <Footer />
    </>
  );
}
