import { Button, Col, Row } from "react-bootstrap";

export function meta() {
  return [{ title: "Home | éComércio" }];
}

export default function Home() {
  return (
    <main>
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5 mw-100 mx-auto">
        <Col lg="6">
          <img
            src="https://images.unsplash.com/photo-1441123285228-1448e608f3d5?q=80&w=1170&auto=format"
            className="d-block mx-lg-auto img-fluid rounded"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
        </Col>
        <Col lg="6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Tudo o que você imagina, em um só lugar.
          </h1>
          <p className="lead">
            Uma plataforma simples, moderna e intuitiva para criar experiências
            de compra online incríveis.
          </p>
          <div className="d-grid d-md-flex">
            <Button size="lg" href="/produtos">
              Ver Produtos
            </Button>
          </div>
        </Col>
      </Row>

      <hr />

      <h2>Faça compras como nunca antes</h2>
      <p>Nosso sistema de compras é intuitivo</p>
    </main>
  );
}
