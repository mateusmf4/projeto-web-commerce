// @ts-check

/**
 * @typedef {{
 *   id: number,
 *   nome: string,
 *   descricao: string,
 *   preco: number,
 *   estoque?: number,
 *   images: string[],
 *   categoria: string,
 *   tags: string[],
 * }} Produto
 */

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

/** @type {Produto[]} */
const PRODUTOS = [
  {
    id: 1,
    images: ["https://api.dicebear.com/9.x/shapes/svg?seed=2"],
    nome: "Produto 1",
    preco: 12.5,
    estoque: 3,
    descricao: "lorem lorem lorem!!",
    categoria: "Eletrodomésticos",
    tags: [],
  },
  {
    id: 2,
    images: ["https://api.dicebear.com/9.x/shapes/svg?seed=3"],
    nome: "Produto 2",
    preco: 9.99,
    estoque: 10,
    descricao: "lorem lorem lorem!!",
    categoria: "Informática",
    tags: [],
  },
  {
    id: 13,
    images: ["https://api.dicebear.com/9.x/shapes/svg?seed=4"],
    nome: "Produto Algum",
    preco: 25.5,
    estoque: 0,
    descricao: "lorem lorem lorem!!",
    categoria: "Informática",
    tags: [],
  },
  {
    id: 25,
    images: ["https://api.dicebear.com/9.x/shapes/svg?seed=5"],
    nome: "Produto 25",
    preco: 10.0,
    estoque: 50,
    descricao: "lorem lorem lorem!!",
    categoria: "Eletrodomésticos",
    tags: [],
  },
  {
    id: 32,
    images: ["https://api.dicebear.com/9.x/shapes/svg?seed=6"],
    nome: "Arroz salgado com um nome muito longo 150g",
    preco: 25.5,
    estoque: 100,
    descricao: "lorem lorem lorem!!",
    categoria: "TV e Video",
    tags: [],
  },
];

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
 * @typedef {{
 *   id: number,
 *   produtos: Produto[],
 *   cliente: {
 *     nome: string,
 *     email: string,
 *   },
 *   status: "entregue" | "enviado" | "cancelado",
 *   data: string,
 * }} Pedido
 * */

/** @type {Pedido[]} */
const PEDIDOS = [
  {
    id: 1,
    produtos: [PRODUTOS[0]],
    cliente: {
      nome: "José Alberto",
      email: "jose.alberto@example.com",
    },
    status: "entregue",
    data: "10/02/2024",
  },
  {
    id: 2,
    produtos: [PRODUTOS[1], PRODUTOS[0]],
    cliente: {
      nome: "Demetrio Gomes",
      email: "demetrio.g@example.com",
    },
    status: "enviado",
    data: "15/08/2025",
  },
  {
    id: 3,
    produtos: [PRODUTOS[3], PRODUTOS[4]],
    cliente: {
      nome: "José Robert",
      email: "jose.robert@example.com",
    },
    status: "cancelado",
    data: "11/08/2025",
  },
];

export async function getAllPedidos() {
  return await mockReturn(PEDIDOS);
}

const api = Object.freeze({ getAllProdutos, getAllPedidos });
export default api;
