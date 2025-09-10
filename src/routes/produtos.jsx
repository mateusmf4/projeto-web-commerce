import { SearchIcon } from "lucide-react";
import "./produtos.css";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";

function Categoria({
  nome,
  tags,
  tagsAtivas,
  active,
  mudarCategoria,
  toggleTag,
  resetarTags,
}) {
  const toggleDetails = (e) => {
    if (e.target.open) {
      mudarCategoria(nome);
    }
  };
  return (
    <details
      className="categoria"
      name="categoria-produtos"
      onToggle={toggleDetails}
      open={active}
    >
      <summary data-active={active}>
        <ChevronRightIcon size="1em" className="categoria__icon" />
        {nome}
      </summary>
      <div className="categoria__tags">
        <label>
          <input
            type="checkbox"
            checked={tagsAtivas.length === 0}
            onChange={(e) => e.target.checked && resetarTags()}
          />
          <span>Todos</span>
        </label>
        {tags.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={tagsAtivas.includes(tag)}
              onChange={(e) => toggleTag(tag, e.target.checked)}
            />
            <span>{tag}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

function TagMobile({ tag, active, onClick }) {
  return (
    <button type="button" onClick={onClick} data-active={!!active}>
      {!!active && <CheckIcon size="1em" />}
      {tag}
    </button>
  );
}

function TagsMobile({ tags, tagsAtivas, toggleTag, resetarTags }) {
  const todos = useMemo(() => {
    return tagsAtivas.length === 0;
  }, [tagsAtivas]);

  return (
    <div className="mobile-tags">
      <TagMobile tag="Todos" active={todos} onClick={resetarTags} />
      {tags.map((tag) => (
        <TagMobile
          key={tag}
          tag={tag}
          active={tagsAtivas.includes(tag)}
          onClick={() => toggleTag(tag, !tagsAtivas.includes(tag))}
        />
      ))}
    </div>
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
  const categorias = [
    "Todos os produtos",
    "Eletrodomésticos",
    "Informática",
    "TV e Video",
  ];
  const [categoriaAtiva, setCategoriaAtiva] = useState(0);
  const [tags, _setTags] = useState([
    "Electrolux",
    "SONY",
    "Nvidia",
    "Logitech",
    "Panasonic",
  ]);
  const [tagsAtivas, setTagsAtivas] = useState([]);

  const mudarCategoria = (nome) => {
    const index = categorias.indexOf(nome);
    if (index === -1) return;
    if (index === categoriaAtiva) return;
    setCategoriaAtiva(index);
    setTagsAtivas([]);
  };

  const toggleTag = (tag, value) => {
    if (value && !tagsAtivas.includes(tag)) {
      setTagsAtivas([...tagsAtivas, tag]);
    } else if (!value && tagsAtivas.includes(tag)) {
      setTagsAtivas(tagsAtivas.filter((x) => x !== tag));
    }
  };

  const resetarTags = () => {
    setTagsAtivas([]);
  };

  const modalCategoriaRef = useRef(null);
  return (
    <main>
      <div className="main__sidebar">
        <h2>Categorias</h2>

        <div className="main__sidebar__categorias">
          {categorias.map((categoria, i) => (
            <Categoria
              key={categoria}
              nome={categoria}
              tags={tags}
              tagsAtivas={tagsAtivas}
              active={categoriaAtiva === i}
              mudarCategoria={mudarCategoria}
              toggleTag={toggleTag}
              resetarTags={resetarTags}
            />
          ))}
        </div>
      </div>
      <div className="main__listagem">
        <button
          className="main__listagem__categoria-btn"
          type="button"
          onClick={() => modalCategoriaRef.current.showModal()}
        >
          <ChevronRightIcon strokeWidth={1.5} size="1.4em" />
          {categorias[categoriaAtiva]}
        </button>
        <dialog className="modal-categoria" ref={modalCategoriaRef}>
          <h2>Categorias</h2>

          <div className="list">
            {categorias.map((categoria, i) => (
              <button
                key={categoria}
                type="button"
                data-active={i === categoriaAtiva}
                onClick={() => {
                  mudarCategoria(categoria);
                  modalCategoriaRef.current.close();
                }}
              >
                {categoria}
              </button>
            ))}
          </div>
        </dialog>
        <TagsMobile
          tags={tags}
          tagsAtivas={tagsAtivas}
          toggleTag={toggleTag}
          resetarTags={resetarTags}
        />

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
