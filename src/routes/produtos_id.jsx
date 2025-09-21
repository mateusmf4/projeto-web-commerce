import { useEffect, useState } from "react";
import { Button, Carousel, Ratio, Spinner } from "react-bootstrap";
import "./produtos_id.css";
import api from "@/services/api";
import { formatPrice } from "@/services/utils";

export function meta() {
  return [{ title: "Produto | éComércio" }];
}

export default function Produto({ params }) {
  const [produto, setProduto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getProduto(parseInt(params.id, 10))
      .then((dado) => {
        setProduto(dado);
        console.log(dado);
        document.title = `${dado.nome} | éComércio`;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);

  if (!produto) {
    if (isLoading) {
      return (
        <main>
          <Spinner className="text-secondary" />
        </main>
      );
    }
    return (
      <main className="flex-column align-items-center">
        <p>Produto não encontrado</p>
        <a href="/produtos">Voltar para produtos</a>
      </main>
    );
  }

  return (
    <main>
      <Carousel
        interval={null}
        className="main__carousel rounded border overflow-hidden"
      >
        {produto.images.map((img, i) => (
          <Carousel.Item key={img}>
            <Ratio aspectRatio="1x1">
              <img src={img} alt={`produto, imagem ${i + 1}`} />
            </Ratio>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="main__info">
        <h1>{produto.nome}</h1>
        <h3>{formatPrice(produto.preco)}</h3>
        <p>{produto.descricao}</p>
      </div>
      <div className="main__actions">
        <Button href="/carrinho">Comprar</Button>
      </div>

      {/* Botão no final da pagina no mobile.. */}
      <div className="d-lg-none" style={{ height: "7rem" }}></div>
      <div className="d-lg-none fixed-bottom d-flex flex-column p-4 bg-body border-top">
        <Button size="lg" href="/carrinho">
          Comprar
        </Button>
      </div>
    </main>
  );
}
