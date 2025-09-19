import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Modal,
  Spinner,
  Stack,
  Table,
} from "react-bootstrap";
import api from "@/services/api";
import "./pedidos.css";

export default function LojistaPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getAllPedidos()
      .then((pedidos) => {
        setPedidos(pedidos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [curPedido, setCurPedido] = useState(null);

  return (
    <>
      <main>
        <Table striped bordered hover responsive className="align-middle">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th style={{ minWidth: "20rem" }}>Pedido</th>
              <th className="text-center">Data</th>
              <th className="text-center">Status</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="text-center">
                  <Spinner className="text-secondary" />
                </td>
              </tr>
            )}
            {!isLoading &&
              pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td className="text-center">{pedido.id}</td>
                  <td>
                    {pedido.produtos.length}
                    {pedido.produtos.length > 1 ? " Produtos: " : " Produto: "}
                    {pedido.produtos.slice(0, 3).map((produto) => (
                      <img
                        key={produto.id}
                        style={{ height: "3rem", aspectRatio: "1" }}
                        alt="foto do produto"
                        className="img-thumbnail me-2 object-fit-contain"
                        src={produto.images[0]}
                      />
                    ))}
                  </td>
                  <td className="text-center">{pedido.data}</td>
                  <td className="text-center">
                    <StatusBadge status={pedido.status} />
                  </td>

                  <td className="text-center">
                    <Button
                      size="sm"
                      className="p-1"
                      onClick={() => setCurPedido(pedido)}
                    >
                      <InfoIcon />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </main>

      <PedidoInfoModal
        show={curPedido !== null}
        pedido={curPedido}
        onClose={() => setCurPedido(null)}
      />
    </>
  );
}

function StatusBadge({ status }) {
  if (status === "entregue") {
    return <Badge bg="success">Entregue</Badge>;
  } else if (status === "enviado") {
    return <Badge bg="warning">Enviado</Badge>;
  } else if (status === "cancelado") {
    return <Badge bg="secondary">Cancelado</Badge>;
  }
  <Badge>status</Badge>;
}

function PedidoInfoModal({ show, pedido, onClose }) {
  if (!pedido) return;
  return (
    <Modal centered show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Informações do pedido #{pedido.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Informações do Cliente</h3>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control readOnly defaultValue={pedido.cliente.nome} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control readOnly defaultValue={pedido.cliente.email} />
        </Form.Group>

        <h3 className="mt-3">Produtos</h3>
        <Stack gap={3}>
          {pedido.produtos.map((produto) => (
            <Card key={produto.id} className="overflow-hidden">
              <Stack direction="horizontal">
                <img
                  alt="thumbnail do produto"
                  src={produto.images[0]}
                  style={{ height: "5rem", aspectRatio: 1 }}
                />
                <Card.Body>
                  <Card.Title>{produto.nome}</Card.Title>
                  <Card.Subtitle>R$ {produto.preco}</Card.Subtitle>
                </Card.Body>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}
