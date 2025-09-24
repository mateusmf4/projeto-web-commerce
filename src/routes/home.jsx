import { Button, Col, Row } from "react-bootstrap";
import LogoIconSvg from "@/assets/icon.svg?react";

export function meta() {
  return [{ title: "Home | éComércio" }];
}

export default function Home() {
  return (
    <main>
      <div className="text-center my-5">
        <h1 className="display-2 fw-bold">Comércio é na éComércio!</h1>
        <p className="display-6">Sua nova plataforma de comércio está aqui.</p>
        <LogoIconSvg width="5em" height="5em" />
      </div>

      <hr />

      <ImageHero
        img="https://images.unsplash.com/photo-1441123285228-1448e608f3d5?q=80&w=1170&auto=format"
        alt="Frutas num carrinho"
        reverse
      >
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
          Tudo o que você imagina, em um só lugar.
        </h1>
        <p className="lead">
          Uma plataforma simples, moderna e intuitiva para criar experiências de
          compra online incríveis.
        </p>
        <div className="d-grid d-md-flex">
          <Button size="lg" href="/produtos">
            Ver Produtos
          </Button>
        </div>
      </ImageHero>

      <hr />

      <ImageHero
        img="https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg"
        alt="oii"
      >
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
          Faça compras como nunca antes
        </h1>
        <p className="lead">
          Nosso sistema de compras é intuitivo e responsivo. Faça compras no seu
          computador ou no seu celular!
        </p>
      </ImageHero>

      <hr />

      <div className="text-center my-5">
        <p className="text-secondary">
          <i>
            Este site é fictício, feito para a disciplina de Programação Web I -
            2025.1
          </i>
        </p>
      </div>
    </main>
  );
}

const ImageHero = ({ img, alt, reverse, children }) => (
  <Row
    className={
      "align-items-center g-5 py-5 mw-100 mx-auto " +
      (reverse ? "flex-lg-row-reverse" : "flex-lg-row")
    }
  >
    <Col lg="6">
      <img
        src={img}
        className="d-block mx-lg-auto img-fluid rounded"
        alt={alt}
        width="700"
        height="500"
        loading="lazy"
      />
    </Col>
    <Col lg="6">{children}</Col>
  </Row>
);
