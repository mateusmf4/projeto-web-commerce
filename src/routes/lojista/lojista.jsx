import { EditIcon, SearchIcon, XSquareIcon } from "lucide-react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "./lojista.css";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function formatPrice(price) {
  return `R$ ${price.toFixed(2)}`;
}

export default function Admin() {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      images: ["https://api.dicebear.com/9.x/shapes/svg?seed=2"],
      nome: "Produto 1",
      preco: 12.5,
      estoque: 3,
      descricao: "lorem lorem lorem!!",
    },
    {
      id: 2,
      images: ["https://api.dicebear.com/9.x/shapes/svg?seed=3"],
      nome: "Produto 2",
      preco: 9.99,
      estoque: 10,
      descricao: "lorem lorem lorem!!",
    },
    {
      id: 13,
      images: ["https://api.dicebear.com/9.x/shapes/svg?seed=4"],
      nome: "Produto Algum",
      preco: 25.5,
      estoque: 0,
      descricao: "lorem lorem lorem!!",
    },
    {
      id: 25,
      images: ["https://api.dicebear.com/9.x/shapes/svg?seed=5"],
      nome: "Produto 25",
      preco: 10.0,
      estoque: 50,
      descricao: "lorem lorem lorem!!",
    },
    {
      id: 32,
      images: ["https://api.dicebear.com/9.x/shapes/svg?seed=6"],
      nome: "Arroz salgado com um nome muito longo 150g",
      preco: 25.5,
      estoque: 100,
      descricao: "lorem lorem lorem!!",
    },
  ]);

  const [editProduto, setEditProduto] = useState(null);
  const saveProduto = (novoProduto) => {
    setProdutos(
      produtos.map((x) => (x.id === novoProduto.id ? novoProduto : x)),
    );
  };

  const [delProduto, setDelProduto] = useState(null);
  const deletarProduto = (produto) => {
    setProdutos(produtos.filter((x) => x.id !== produto.id));
  };

  const [novoProduto, setNovoProduto] = useState(null);
  const [idCounter, setIdCounter] = useState(100);
  const abrirCriarProduto = () => {
    setNovoProduto({
      id: "",
      nome: "",
      descricao: "",
      images: [],
      estoque: "",
      preco: "",
    });
  };
  const criarProduto = (produto) => {
    setProdutos([
      ...produtos,
      {
        ...produto,
        id: idCounter,
      },
    ]);
    setIdCounter(idCounter + 1);
  };

  return (
    <>
      <main>
        <div className="d-flex gap-3">
          <InputGroup>
            <Form.Control placeholder="Digite o nome de um produto..." />
            <Button>
              <SearchIcon />
            </Button>
          </InputGroup>

          <Button
            className="d-flex align-items-center justify-content-center"
            onClick={abrirCriarProduto}
          >
            <PlusIcon />
            Criar
          </Button>
        </div>

        <Table striped bordered hover responsive className="align-middle">
          <thead>
            <tr>
              <th className="col-1 text-center">#</th>
              <th style={{ minWidth: "20rem" }}>Nome</th>
              <th className="col-1 text-center">Preço</th>
              <th className="col-1 text-center">Estoque</th>
              <th className="col-1 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td className="text-center">{produto.id}</td>
                <td>
                  <img
                    style={{ height: "3rem", aspectRatio: "1" }}
                    alt="foto do produto"
                    className="img-thumbnail me-2 object-fit-contain"
                    src={produto.images[0]}
                  />
                  {produto.nome}
                </td>
                <td className="text-center text-nowrap">
                  {formatPrice(produto.preco)}
                </td>
                <td
                  className={`text-center ${produto.estoque ? "" : "fw-bold text-danger"}`}
                >
                  {produto.estoque}
                </td>
                <td className="text-center">
                  <Button size="sm" onClick={() => setEditProduto(produto)}>
                    <EditIcon />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDelProduto(produto)}
                  >
                    <XSquareIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>

      <ProdutoEditModal
        show={editProduto != null}
        produto={editProduto}
        saveProduto={saveProduto}
        onClose={() => setEditProduto(null)}
        isEdit
      />

      <ProdutoEditModal
        show={novoProduto != null}
        produto={novoProduto}
        saveProduto={criarProduto}
        onClose={() => setNovoProduto(null)}
      />

      <ConfirmarDeletarModal
        show={delProduto != null}
        nome={delProduto?.nome}
        onClose={() => setDelProduto(null)}
        onDelete={() => deletarProduto(delProduto)}
      />
    </>
  );
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function ProdutoEditModal({ produto, saveProduto, show, onClose, isEdit }) {
  const onSave = (data) => {
    if (!images.length) {
      setImageError("Selecione pelo menos uma imagem");
      return;
    }
    saveProduto({ ...produto, ...data, images: images.map(([img]) => img) });
    onClose();
  };

  const defaultValues = useMemo(() => {
    return produto ?? {};
  }, [produto]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [images, setImages] = useState([]);
  const imageInputRef = useRef();
  const [imageError, setImageError] = useState(null);

  const adicionarImagem = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  const onImageChange = async (e) => {
    setImageError(null);
    if (e.target.files.length) {
      const newImages = [];
      for (const file of e.target.files) {
        if (!file.type.startsWith("image/")) {
          setImageError("Selecione somente imagens válidas");
          continue;
        }
        newImages.push([await getBase64(file), Math.random()]);
      }
      e.target.value = null;
      setImages((prev) => [...prev, ...newImages]);
    }
  };
  const deleteImage = (index) => {
    setImages(images.filter((_, i) => index !== i));
  };

  useEffect(() => {
    if (produto) {
      reset();
      setImageError(null);
      setImages(produto.images.map((x) => [x, Math.random()]));
    }
  }, [produto, reset]);

  return (
    <Modal show={show} size="xl" centered>
      {show && (
        <>
          <Modal.Header>
            <Modal.Title>{isEdit ? "Editar" : "Criar"} Produto</Modal.Title>
          </Modal.Header>

          {/* Agrupar para que o botão de salvar faça o submit do form */}
          <Form onSubmit={handleSubmit(onSave)}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Imagens</Form.Label>
                <input
                  type="file"
                  className="d-none"
                  multiple
                  ref={imageInputRef}
                  onChange={onImageChange}
                />
                <div className="image-list">
                  {images.map(([img, key], i) => (
                    <div key={key} className="image-list__image">
                      <img src={img} alt="imagem do produto" />
                      <button type="button" onClick={() => deleteImage(i)}>
                        <XCircleIcon />
                      </button>
                    </div>
                  ))}
                  <Button
                    className="image-list__new"
                    variant="outline-secondary"
                    onClick={adicionarImagem}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                {imageError && (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {imageError}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="ipt-nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={produto.nome}
                  isInvalid={errors.nome}
                  {...register("nome", { required: "Insira um nome" })}
                />
                {errors.nome && (
                  <Form.Control.Feedback type="invalid">
                    {errors.nome.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="ipt-descricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  placeholder="Descreva o produto.."
                  defaultValue={produto.descricao}
                  isInvalid={errors.descricao}
                  {...register("descricao", {
                    required: "Insira uma descrição",
                  })}
                />
                {errors.descricao && (
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Row>
                <Form.Group as={Col} controlId="ipt-preco">
                  <Form.Label>Preço</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>R$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      defaultValue={produto.preco}
                      isInvalid={errors.preco}
                      step="0.01"
                      {...register("preco", {
                        required: "Insira um valor",
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Valor deve ser positivo",
                        },
                      })}
                    />
                    {errors.preco && (
                      <Form.Control.Feedback type="invalid">
                        {errors.preco.message}
                      </Form.Control.Feedback>
                    )}
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="ipt-estoque">
                  <Form.Label>Estoque</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={produto.estoque}
                    isInvalid={errors.estoque}
                    step="1"
                    {...register("estoque", {
                      required: "Insira um valor",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Valor deve ser positivo",
                      },
                    })}
                  />
                  {errors.estoque && (
                    <Form.Control.Feedback type="invalid">
                      {errors.estoque.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onClose} type="button">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        </>
      )}
    </Modal>
  );
}

function ConfirmarDeletarModal({ show, nome, onClose, onDelete }) {
  const doDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza que quer deletar {nome}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={doDelete}>
          Deletar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
