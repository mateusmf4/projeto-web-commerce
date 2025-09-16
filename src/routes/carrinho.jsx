import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import './carrinho.css';

export default function Carrinho() {
  return (
    <main>
      <div className="carrinho">
        <div className="carrinho__listagem">
          <h1>Produtos</h1>
        </div>

        <div className="carrinho__checkout border p-3">
          <Row>
            <Col>Subtotal:</Col>
            <Col className='text-end'>R$ 35,00</Col>
          </Row>

          <Row>
            <Col>Frete:</Col>
            <Col className='text-end'>R$ 35,00</Col>
          </Row>

          <Row>
            <Col>Impostos:</Col>
            <Col className='text-end'>R$ 35,00</Col>
          </Row>

          <hr />

          <Row>
            <Col>Total:</Col>
            <Col className='text-end'>R$ 35,00</Col>
          </Row>

          <Button className='carrinho__btn'>Checkout</Button>

        </div>
      </div>
    </main>
  );
}
