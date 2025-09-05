import { SearchIcon } from "lucide-react";
import "./produtos.css";

function ProdutoCard() {
  return (
    <a href="/produtos" className="produtoCard">
      <img src="https://api.dicebear.com/9.x/shapes/svg" alt="produto" />
      <h3 class="produtoCard__nome">
        Nome do produto 100g DeMarca Barata sabor Pimenta
      </h3>
      <p class="produtoCard__preco">R$ 25,50</p>
    </a>
  );
}

export default function Produtos() {
  return (
    <main>
      <div className="main__categorias">
        <h2>Categorias</h2>
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
        </div>
      </div>
    </main>
  );
}
