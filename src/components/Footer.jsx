import { Container } from "react-bootstrap";
import LogoSvg from "@/assets/logo.svg?react";

export default function Footer() {
  return (
    <footer className="py-3 mt-4 border-top bg-body-tertiary">
      <Container>
        <div className="d-flex flex-column gap-3 flex-lg-row align-items-center justify-content-between">
          <div className="d-flex align-items-center text-body-secondary gap-2">
            <a href="/" className="text-body-secondary lh-1">
              <LogoSvg className="lh-1" />
            </a>
            <span>&copy; 2025 Filipe & Mateus</span>
          </div>
          <a href="/login" className="text-body-secondary">
            Menu Login
          </a>
        </div>
      </Container>
    </footer>
  );
}
