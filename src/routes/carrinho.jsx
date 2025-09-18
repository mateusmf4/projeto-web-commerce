import { useState } from 'react';
import { Button, CloseButton, Col, Form, Row } from 'react-bootstrap';
import SeletorQtd from '../components/seletorQtd';
import './carrinho.css';

function ProdsCar({ item, novaQtd, remover}) {
  return (
    <div className="produtos-carrinho border">
      <img
        src="https://api.dicebear.com/9.x/shapes/svg?seed=2"
        className="produtos-carrinho__img"
      />

      <div className="produtos-carrinho__conteudo">
        <h6> {item.nome} </h6>

        <p> R$ {item.preco.toFixed(2)} </p>

        {/* Provavelmente terá que ser alterado no futuro */}
        <SeletorQtd
          value={item.qtd}
          onChange={(q) => novaQtd(item.id, q)}
          min={1}
          max={3}
        />
      </div>

      <CloseButton className="produtos-carrinho__remover" onClick={() => remover(item.id)}/>
    </div>
  )
}

export default function Carrinho() {

  const [itens, setItens] = useState([
    {id: 1, nome: "Produto 1", preco: 13, qtd: 1},
    {id: 2, nome: "Produto 2", preco: 7.99, qtd: 1},
    {id: 3, nome: "Produto 3", preco: 25.89, qtd: 1},
    {id: 4, nome: "Produto 4", preco: 23.89, qtd: 1}
  ]);

  const remover = (id) => setItens(itens.filter((item) => item.id !== id));

  const novaQtd = (id, qtd) => setItens(itens.map((item) =>
    item.id === id ? {...item, qtd: Number(qtd)} : item
  ));

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  const frete = 35;
  const impostos = 20;
  const total = subtotal + frete + impostos;

  return (
    <main>
      <div className="carrinho">
        <div className="carrinho__listagem">
          <h1>Carrinho</h1>

          <div className="carrinho__listagem__produtos">
            {itens.map((item) => (
              <ProdsCar key={item.id} item={item} novaQtd={novaQtd} remover={remover} />
            ))}
          </div>
        </div>

        <div className="carrinho__checkout d-none d-lg-block border p-3">
          <Row>
            <Col>Subtotal:</Col>
            <Col className="text-end">R$ {subtotal.toFixed(2)}</Col>
          </Row>

          <Row>
            <Col>Frete:</Col>
            <Col className="text-end">R$ {frete.toFixed(2)}</Col>
          </Row>

          <Row>
            <Col>Impostos:</Col>
            <Col className="text-end">R$ {impostos.toFixed(2)}</Col>
          </Row>

          <hr />

          <Row>
            <Col>Total:</Col>
            <Col className="text-end">R$ {total.toFixed(2)}</Col>
          </Row>

          <Button className="carrinho__btn">Checkout</Button>

        </div>
        {/* Checkout no final da pagina no mobile.. */}
        <div className="d-lg-none" style={{ height: "52rem" }}></div>
        <div className="d-lg-none d-flex flex-column fixed-bottom bg-body p-4 border-top">
          <Row>
              <Col>Subtotal:</Col>
              <Col className="text-end">R$ {subtotal.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Frete:</Col>
              <Col className="text-end">R$ {frete.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Impostos:</Col>
              <Col className="text-end">R$ {impostos.toFixed(2)}</Col>
            </Row>

            <hr />

            <Row>
              <Col>Total:</Col>
              <Col className="text-end">R$ {total.toFixed(2)}</Col>
            </Row>

            <Button className="carrinho__btn">Checkout</Button>
        </div>
      </div>

    </main>
  );
}
