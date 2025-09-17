import { Button, Card, CloseButton, Col, Form, Row } from 'react-bootstrap';
import './carrinho.css';

function prodsCar({ item, novaQtd, remover}) {
  return (
    <Card className="produtos-carrinho">
      <Card.Img
        src="https://api.dicebear.com/9.x/shapes/svg?seed=2"
        className="produtos-carrinho__img"
      />

      <Card.Body className="produtos-carrinho__conteudo">
        <Card.Title> {item.nome} </Card.Title>

        <Card.Text> R$ {item.preco.toFixed(2)} </Card.Text>

        {/* Provavelmente terá que ser alterado no futuro */}
        <Form.Select
          size="sm"
          value={item.qtd}
          onChange={(e) => novaQtd(item.id, e.target.value)}
          className="produtos-carrinho__seletor"
        >
          {[1,2,3].map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </Form.Select>
      </Card.Body>

      <CloseButton variant="outline-danger" onClick={() => remover(item.id)}/>
    </Card>
  )
}

export default function Carrinho() {
  return (
    <main>
      <div className="carrinho">
        <div className="carrinho__listagem">
          <h1>Carrinho</h1>

          <div className="carrinho__listagem__produtos">
            {/* produtos aqui */}
          </div>
        </div>

        <div className="carrinho__checkout border p-3">
          <Row>
            <Col>Subtotal:</Col>
            <Col className="text-end">R$ 35,00</Col>
          </Row>

          <Row>
            <Col>Frete:</Col>
            <Col className="text-end">R$ 35,00</Col>
          </Row>

          <Row>
            <Col>Impostos:</Col>
            <Col className="text-end">R$ 35,00</Col>
          </Row>

          <hr />

          <Row>
            <Col>Total:</Col>
            <Col className="text-end">R$ 35,00</Col>
          </Row>

          <Button className="carrinho__btn">Checkout</Button>

        </div>
      </div>
    </main>
  );
}
