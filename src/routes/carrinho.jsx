import { useState } from "react";
import { Button, CloseButton, Col, Row } from "react-bootstrap";
import SeletorQtd from "../components/seletorQtd";
import "./carrinho.css";
import Carrinho from "@/services/carrinho";
import { formatPrice } from "@/services/utils";

function ProdsCar({ item, novaQtd, remover }) {
  return (
    <div className="produtos-carrinho border">
      <img
        src={item.images[0]}
        className="produtos-carrinho__img"
        alt="imagem do produto"
      />

      <div className="produtos-carrinho__conteudo">
        <h6>{item.nome}</h6>

        <p>{formatPrice(item.preco)}</p>

        {/* Provavelmente terá que ser alterado no futuro */}
        <SeletorQtd
          value={item.qtd}
          onChange={(q) => novaQtd(item.id, q)}
          min={1}
          max={3}
        />
      </div>

      <CloseButton
        className="produtos-carrinho__remover"
        onClick={() => remover(item.id)}
      />
    </div>
  );
}

export default function CarrinhoPage() {
  const [itens, setItens] = useState(Carrinho.loadCarrinho());

  const remover = (id) =>
    setItens(Carrinho.saveCarrinho(itens.filter((item) => item.id !== id)));

  const novaQtd = (id, qtd) =>
    setItens(
      Carrinho.saveCarrinho(
        itens.map((item) =>
          item.id === id ? { ...item, qtd: Number(qtd) } : item,
        ),
      ),
    );

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  const frete = 35;
  const impostos = 20;
  const total = subtotal + frete + impostos;

  return (
    <main>
      <h1>Carrinho</h1>
      <div className="carrinho">
        <div className="carrinho__listagem">
          {itens.map((item) => (
            <ProdsCar
              key={item.id}
              item={item}
              novaQtd={novaQtd}
              remover={remover}
            />
          ))}
        </div>

        <div className="carrinho__checkout d-none d-lg-block border p-3">
          <Row>
            <Col>Subtotal:</Col>
            <Col className="text-end">{formatPrice(subtotal)}</Col>
          </Row>

          <Row>
            <Col>Frete:</Col>
            <Col className="text-end">{formatPrice(frete)}</Col>
          </Row>

          <Row>
            <Col>Impostos:</Col>
            <Col className="text-end">{formatPrice(impostos)}</Col>
          </Row>

          <hr />

          <Row>
            <Col>Total:</Col>
            <Col className="text-end">{formatPrice(total)}</Col>
          </Row>

          <Button className="carrinho__btn">Checkout</Button>
        </div>
      </div>
      {/* Checkout no final da pagina no mobile.. */}
      <div className="d-lg-none" style={{ height: "10rem" }}></div>
      <div className="d-lg-none d-flex flex-column fixed-bottom bg-body p-4 border-top">
        <Row>
          <Col>Subtotal:</Col>
          <Col className="text-end">{formatPrice(subtotal)}</Col>
        </Row>

        <Row>
          <Col>Frete:</Col>
          <Col className="text-end">{formatPrice(frete)}</Col>
        </Row>

        <Row>
          <Col>Impostos:</Col>
          <Col className="text-end">{formatPrice(impostos)}</Col>
        </Row>

        <hr />

        <Row>
          <Col>Total:</Col>
          <Col className="text-end">{formatPrice(total)}</Col>
        </Row>

        <Button className="carrinho__btn">Checkout</Button>
      </div>
    </main>
  );
}
