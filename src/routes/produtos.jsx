import { SearchIcon } from "lucide-react";
import "./produtos.css";
import { ChevronRightIcon } from "lucide-react";

function Categoria({ nome }) {
  const tags = ["Electrolux", "SONY", "Nvidia", "Logitech", "Panasonic"];
  return (
    <details className="categoria" name="categoria-produtos">
      <summary>
        <ChevronRightIcon size="1em" className="categoria__icon" />
        {nome}
      </summary>
      <div className="categoria__tags">
        {tags.map((tag) => (
          <label key={tag}>
            <input type="checkbox" />
            <span>{tag}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

function ProdutoCard() {
  return (
    <a href="/produtos" className="produtoCard">
      <img src="https://api.dicebear.com/9.x/shapes/svg?seed=2" alt="produto" />
      <h3 className="produtoCard__nome">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </h3>
      <p className="produtoCard__preco">R$ 25,50</p>
    </a>
  );
}

export default function Produtos() {
  return (
    <main>
      <div className="main__sidebar">
        <h2>Categorias</h2>

        <div className="main__sidebar__categorias">
          <Categoria nome="Eletrodomésticos" />
          <Categoria nome="Informática" />
          <Categoria nome="TV e Video" />
        </div>
      </div>
      <div className="main__listagem">
        <div className="main__listagem__pesquisa">
          <input
            type="text"
            name="produto-search"
            placeholder="Digite o nome de um produto..."
          />
          <SearchIcon />
        </div>

        <div className="main__listagem__produtos">
          <ProdutoCard />
          <ProdutoCard />
          <ProdutoCard />
          <ProdutoCard />
          <ProdutoCard />
          <ProdutoCard />
          <ProdutoCard />
        </div>
      </div>
    </main>
  );
}
