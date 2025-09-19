import { index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.jsx", [
    index("routes/home.jsx"),
    route("produtos", "routes/produtos.jsx"),
    route("produtos/:id", "routes/produtos_id.jsx"),
    route("contato", "routes/contato.jsx"),
    route("carrinho", "routes/carrinho.jsx"),
  ]),

  ...prefix("lojista", [
    layout("routes/lojista/_layout.jsx", [
      index("routes/lojista/produtos.jsx"),
      route("pedidos", "routes/lojista/pedidos.jsx"),
    ]),
  ]),
];
