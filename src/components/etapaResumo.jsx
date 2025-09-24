import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Carrinho from "@/services/carrinho";
import { formatPrice } from "@/services/utils";
import ProdsCar from "./prodsCar";
import "./etapaResumo.css";

export default function EtapaResumo({ dados, onPrev, onConfirm }) {
  const [itens, setItens] = useState(Carrinho.loadCarrinho());

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.qtd, 0);

  const impostos = 20;

  const frete = 35;

  const total = subtotal + impostos + frete;

  return (
    <div>
      <h2>Resumo do pedido</h2>

      <div className="resumo">
        <div className="checkout-produtos">
          {itens.map((item) => (
            <ProdsCar key={item.id} item={item} novaQtd={null} remover={null} />
          ))}
        </div>

        <div className="resumo-pedido d-none d-lg-block border p-3">
          <Row>
            <Col>
              {`Endereço de entrega: ${dados.entrega.logradouro}, ${dados.entrega.numero},
                ${dados.entrega.cep}, ${dados.entrega.bairro}, ${dados.entrega.cidade}`}
            </Col>
          </Row>

          <Row>
            <Col>{`Pagamento: ${dados.pagamento.parcela}`}</Col>
          </Row>

          <hr />

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

          <div className="resumo-buttons">
            <Button onClick={onPrev}>Voltar</Button>

            <Button onClick={onConfirm}>Finalizar Pedido</Button>
          </div>
        </div>

        {/* Checkout no final da pagina no mobile.. */}
        <div className="d-lg-none" style={{ height: "10rem" }}></div>
        <div className="d-lg-none d-flex flex-column fixed-bottom bg-body p-4 border-top">
          <Row>
            <Col>
              {`Endereço de entrega: ${dados.entrega.logradouro}, ${dados.entrega.numero},
                ${dados.entrega.cep}, ${dados.entrega.bairro}, ${dados.entrega.cidade}`}
            </Col>
          </Row>

          <Row>
            <Col>{`Pagamento: ${dados.pagamento.parcela}`}</Col>
          </Row>

          <hr />

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

          <div className="resumo-buttons">
            <Button onClick={onPrev}>Voltar</Button>

            <Button onClick={onConfirm}>Finalizar Pedido</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
