import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import api from "@/services/api";
import "./index.css";

export default function LojistaPedidos() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getAllLojistas()
      .then((users) => {
        setUsers(users);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h2>Lojistas</h2>
      <Table striped bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Nome</th>
            <th>Email</th>
            <th className="text-center">Nº Produtos</th>
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
            users.map((user) => (
              <tr key={user.id}>
                <td className="text-center">{user.id}</td>
                <td>{user.nome}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="text-center">{user.n_produtos}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </main>
  );
}
