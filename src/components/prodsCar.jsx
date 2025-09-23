import { CloseButton } from "react-bootstrap";
import SeletorQtd from "./seletorQtd";
import { formatPrice } from "@/services/utils";
import "./prodsCar.css"

export default function ProdsCar({ item, novaQtd, remover }) {
  return (
    <div className="produtos-carrinho border">
      <img
        src={item.images[0]}
        className="produtos-carrinho__img"
        alt="imagem do produto"
      />

      <div className="produtos-carrinho__conteudo">
        <h6>
          <a href={`/produtos/${item.id}`}>{item.nome}</a>
        </h6>

        <p>{formatPrice(item.preco)}</p>

        {/* Provavelmente terá que ser alterado no futuro */}
        <SeletorQtd
          value={item.qtd}
          onChange={(q) => novaQtd(item.id, q)}
          min={1}
          max={99}
        />
      </div>

      <CloseButton
        className="produtos-carrinho__remover"
        onClick={() => remover(item.id)}
      />
    </div>
  );
}