import { SearchIcon } from "lucide-react";
import "./produtos.css";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Form, InputGroup, Spinner } from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce";
import api from "@/services/api";
import { formatPrice } from "@/services/utils";

export function meta() {
  return [{ title: "Produtos | éComércio" }];
}

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

function ProdutoCard({ produto }) {
  return (
    <Card className="produtoCard">
      <Card.Img
        variant="top"
        src={produto.images[0]}
        alt="produto"
        style={{ aspectRatio: 1, objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title>
          <a
            href={`/produtos/${produto.id}`}
            className="stretched-link produtoCard__title"
          >
            {produto.nome}
          </a>
        </Card.Title>
        <Card.Text>{formatPrice(produto.preco)}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default function Produtos() {
  const [categorias, setCategorias] = useState(["Todos os produtos"]);
  const [categoriaAtiva, setCategoriaAtiva] = useState(0);

  const [tags, setTags] = useState([]);
  const [tagsAtivas, setTagsAtivas] = useState([]);

  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);

  const [produtosRaw, setProdutosRaw] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getAllCategorias()
      .then((data) => setCategorias(["Todos os produtos", ...data]));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setProdutosRaw([]);
    setTags([]);
    api
      .getAllProdutos({
        categoria:
          categoriaAtiva === 0 ? undefined : categorias[categoriaAtiva],
        search: searchText,
      })
      .then((data) => {
        setProdutosRaw(data);
        setTagsAtivas([]);
        if (categoriaAtiva !== 0) {
          setTags([
            ...new Set(
              data
                .flatMap((x) => x.tags)
                .filter((x) => x !== categorias[categoriaAtiva]),
            ),
          ]);
        }
      })
      .finally(() => setIsLoading(false));
  }, [categoriaAtiva, categorias[categoriaAtiva], searchText]);

  const produtos = useMemo(
    () =>
      tagsAtivas.length
        ? produtosRaw.filter((p) => tagsAtivas.some((t) => p.tags.includes(t)))
        : produtosRaw,
    [produtosRaw, tagsAtivas],
  );

  const triggerPesquisa = () => {
    if (searchInputRef.current) {
      setSearchText(searchInputRef.current.value);
    }
  };
  const triggerPesquisaDebounce = useDebouncedCallback(triggerPesquisa, 250);

  const mudarCategoria = (nome) => {
    const index = categorias.indexOf(nome);
    if (index === -1) return;
    if (index === categoriaAtiva) return;
    setCategoriaAtiva(index);
    setTagsAtivas([]);
    setSearchText("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
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
            ref={searchInputRef}
            onChange={triggerPesquisaDebounce}
          />
          <Button>
            <SearchIcon />
          </Button>
        </InputGroup>

        {(isLoading || !produtos.length) && (
          <div className="d-flex justify-content-center">
            {isLoading && <Spinner className="text-secondary" />}
            {!isLoading && (
              <p>
                <i>Nenhum produto encontrado</i>
              </p>
            )}
          </div>
        )}
        <div className="main__listagem__produtos">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </main>
  );
}
