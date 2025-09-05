import { SearchIcon } from "lucide-react";
import "./produtos.css";

function ProdutoCard() {
  return (
    <a href="/produtos" className="produtoCard">
      <img src="https://api.dicebear.com/9.x/shapes/svg" alt="produto" />
      <h3 class="produtoCard--nome">
        Nome do produto 100g DeMarca Barata sabor Pimenta
      </h3>
      <p class="produtoCard--preco">R$ 25,50</p>
    </a>
  );
}

export default function Produtos() {
  return (
    <main>
      <div className="main--categorias">
        <h2>Categorias</h2>
      </div>
      <div className="main--listagem">
        <div className="main--listagem--pesquisa">
          <input
            type="text"
            name="produto-search"
            placeholder="Digite o nome de um produto..."
          />
          <SearchIcon />
        </div>

        <div className="main--listagem--produtos">
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
