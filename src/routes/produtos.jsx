import { SearchIcon } from "lucide-react";
import "./produtos.css";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

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
    <Card className="produtoCard">
      <Card.Img
        variant="top"
        src="https://api.dicebear.com/9.x/shapes/svg?seed=2"
        alt="produto"
      />
      <Card.Body>
        <Card.Title>
          <a href="/produtos/123" className="stretched-link produtoCard__title">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </a>
        </Card.Title>
        <Card.Text>R$ 25,50</Card.Text>
      </Card.Body>
    </Card>
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

  return (
    <main>
      <div className="main__sidebar border rounded">
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
        <Form.Select
          size="lg"
          aria-label="Selecione uma categoria"
          onChange={(e) => mudarCategoria(categorias[e.target.selectedIndex])}
          className="main__listagem__categoria-btn"
        >
          {categorias.map((categoria, i) => (
            <option key={categoria} value={i}>
              {categoria}
            </option>
          ))}
        </Form.Select>

        <TagsMobile
          tags={tags}
          tagsAtivas={tagsAtivas}
          toggleTag={toggleTag}
          resetarTags={resetarTags}
        />

        <InputGroup>
          <Form.Control
            size="lg"
            placeholder="Digite o nome de um produto..."
          />
          <Button>
            <SearchIcon />
          </Button>
        </InputGroup>

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
