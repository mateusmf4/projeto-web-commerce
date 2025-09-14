import { Button, Card, Carousel, Ratio } from "react-bootstrap";
import "./produtos_id.css";

export default function Produto({ params }) {
  return (
    <main>
      <Carousel
        interval={null}
        className="main__carousel rounded border overflow-hidden"
      >
        {[2, 3, 4].map((i) => (
          <Carousel.Item key={i}>
            <Ratio aspectRatio="1x1">
              <img
                src={`https://api.dicebear.com/9.x/shapes/svg?seed=${i}`}
                alt="oi"
              />
            </Ratio>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="main__info">
        <h1>Produto {params.id} qualquer com um nome incrivel 100g SVX2341</h1>
        <h3>R$ 25,50</h3>
        <p>
          Este produto incrivel vai fazer você Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Deleniti, aut ad corporis magni odit,
          cupiditate officiis autem porro molestias molestiae earum quidem rem
          nostrum aspernatur mollitia tenetur nemo adipisci dignissimos natus
          provident ut! Obcaecati, hic vitae officiis repudiandae quo asperiores
          aperiam unde odit. Eum eius sed possimus fuga aliquid eveniet! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Architecto a magni
          laudantium labore, maiores unde delectus aliquid quod minus ad!
        </p>
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
