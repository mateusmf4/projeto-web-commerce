import { EditIcon, SearchIcon, XSquareIcon } from "lucide-react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Nav,
  Navbar,
  Row,
  Table,
} from "react-bootstrap";
import "./lojista.css";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

function formatPrice(price) {
  return `R$ ${price.toFixed(2)}`;
}

export default function Admin() {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      img: "https://api.dicebear.com/9.x/shapes/svg?seed=2",
      nome: "Produto 1",
      preco: 12.5,
      estoque: 3,
      descricao: "lorem lorem lorem!!",
    },
    {
      id: 2,
      img: "https://api.dicebear.com/9.x/shapes/svg?seed=3",
      nome: "Produto 2",
      preco: 9.99,
      estoque: 10,
      descricao: "lorem lorem lorem!!",
    },
    {
      id: 13,
      img: "https://api.dicebear.com/9.x/shapes/svg?seed=4",
      nome: "Produto Algum",
      preco: 25.5,
      estoque: 0,
      descricao: "lorem lorem lorem!!",
    },
    {
      id: 25,
      img: "https://api.dicebear.com/9.x/shapes/svg?seed=5",
      nome: "Produto 25",
      preco: 10.0,
      estoque: 50,
      descricao: "lorem lorem lorem!!",
    },
    {
      id: 32,
      img: "https://api.dicebear.com/9.x/shapes/svg?seed=6",
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

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand href="/lojista">
            <h3 className="m-0 text-bg-primary pb-1">Gerenciamento</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto" variant="underline">
              <Nav.Item>
                <Nav.Link href="/produtos" className="text-bg-primary">
                  Produtos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/produtos" className="text-bg-primary">
                  Pedidos
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <main>
          <InputGroup>
            <Form.Control placeholder="Digite o nome de um produto..." />
            <Button>
              <SearchIcon />
            </Button>
          </InputGroup>
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
                      style={{ height: "3rem" }}
                      alt="foto do produto"
                      className="img-thumbnail me-2"
                      src={produto.img}
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
      </Container>

      <ProdutoEditModal
        show={editProduto != null}
        produto={editProduto}
        saveProduto={saveProduto}
        onClose={() => setEditProduto(null)}
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

function ProdutoEditModal({ produto, saveProduto, show, onClose }) {
  const onSave = (data) => {
    console.log(data);
    saveProduto({ ...produto, ...data });
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

  useEffect(() => {
    if (produto) reset();
  }, [produto, reset]);

  return (
    <Modal show={show} size="xl" centered>
      {show && (
        <>
          <Modal.Header>
            <Modal.Title>Editar Produto</Modal.Title>
          </Modal.Header>

          {/* Agrupar para que o botão de salvar faça o submit do form */}
          <Form onSubmit={handleSubmit(onSave)}>
            <Modal.Body>
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
    <Modal show={show} onHide={onClose}>
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
