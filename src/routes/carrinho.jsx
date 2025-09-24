import { useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./carrinho.css";
import ProdsCar from "@/components/prodsCar";
import Carrinho from "@/services/carrinho";
import { formatPrice } from "@/services/utils";

export function meta() {
  return [{ title: "Carrinho | éComércio" }];
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

  const subtotal = useMemo(
    () => itens.reduce((acc, item) => acc + item.preco * item.qtd, 0),
    [itens],
  );
  const impostos = useMemo(() => (itens.length ? 20 : 0), [itens.length]);
  const total = useMemo(() => subtotal + impostos, [subtotal, impostos]);

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
          {itens.length === 0 && (
            <p>
              Seu carrinho está vazio. Adicione <a href="/produtos">produtos</a>{" "}
              e veja-os aqui!
            </p>
          )}
        </div>

        <div className="carrinho__checkout d-none d-lg-block border p-3">
          <Row>
            <Col>Subtotal:</Col>
            <Col className="text-end">{formatPrice(subtotal)}</Col>
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

          <Button
            className="carrinho__btn"
            href="/pagamento"
            disabled={itens.length === 0}
          >
            Checkout
          </Button>
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
          <Col>Impostos:</Col>
          <Col className="text-end">{formatPrice(impostos)}</Col>
        </Row>

        <hr />

        <Row>
          <Col>Total:</Col>
          <Col className="text-end">{formatPrice(total)}</Col>
        </Row>

        <Button className="carrinho__btn" href="/pagamento">
          Checkout
        </Button>
      </div>
    </main>
  );
}
