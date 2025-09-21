// @ts-check

import { PEDIDOS, PRODUTOS } from "./mockData";

/** @typedef {import('./mockData').Produto} Produto */
/** @typedef {import('./mockData').Pedido} Pedido */

/**
 * @param {number} ms
 */
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Retorna o valor com um delay arbitrario, para simular uma chamada a api
 * @template T
 * @param {T} value
 * @returns {Promise<T>}
 */
async function mockReturn(value) {
  await sleep(100 + Math.random() * 400);
  return value;
}

/**
 *
 * @param {{
 *   search?: string,
 *   categoria?: string,
 *   tags?: string[]
 * }} filter
 * @returns {Promise<Produto[]>}
 */
export async function getAllProdutos(filter = {}) {
  const { search, categoria, tags } = filter;
  const result = PRODUTOS.filter((p) => {
    let include = true;
    if (include && search)
      include = p.nome.toLowerCase().includes(search.toLowerCase());
    if (include && categoria) include = p.categoria === categoria;
    if (include && tags) include = tags.every((t) => p.tags.includes(t));
    return include;
  });
  return await mockReturn(result);
}

/**
 *
 * @param {number} id Id do produto
 * @returns {Promise<Produto>}
 */
export async function getProduto(id) {
  const p = PRODUTOS.find((p) => p.id === id);
  if (!p) throw "Produto não encontrado";
  return await mockReturn(p);
}

export async function getAllCategorias() {
  return await mockReturn(
    Array.from(new Set(PRODUTOS.map((x) => x.categoria))),
  );
}

export async function getAllPedidos() {
  return await mockReturn(PEDIDOS);
}

/**
 * @param {'lojista' | 'admin'} tipo
 * @param {string} usuario
 * @param {string} senha
 */
export async function login(tipo, usuario, senha) {
  await sleep(1000 + Math.random() * 500);
  if (usuario === senha) {
    throw "Usuario e senha não podem ser iguais";
  }

  return await mockReturn({
    nome: "Usuario Fulano",
    email: "usuario@example.com",
    tipo,
  });
}

export async function getAllLojistas() {
  /**
   * @type {{
   *   users: {
   *     id: number,
   *     firstName: string,
   *     lastName: string,
   *     email: string,
   *     age: number
   *   }[],
   *   total: number
   * }}
   */
  const data = await (await fetch("https://dummyjson.com/users")).json();
  return data.users.map((user) => ({
    id: user.id,
    nome: `${user.firstName} ${user.lastName}`,
    email: user.email,
    n_produtos: (user.age % 5) + 1,
  }));
}

const api = Object.freeze({
  getAllProdutos,
  getProduto,
  getAllCategorias,
  getAllPedidos,
  login,
  getAllLojistas,
});
export default api;
