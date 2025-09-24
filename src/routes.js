import { index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.jsx", [
    index("routes/home.jsx"),
    route("produtos", "routes/produtos.jsx"),
    route("produtos/:id", "routes/produtos_id.jsx"),
    route("carrinho", "routes/carrinho.jsx"),
    route("pedidos", "routes/pedidos.jsx"),
  ]),

  ...prefix("lojista", [
    layout("routes/lojista/_layout.jsx", [
      index("routes/lojista/produtos.jsx"),
      route("pedidos", "routes/lojista/pedidos.jsx"),
    ]),
  ]),

  ...prefix("admin", [
    layout("routes/admin/_layout.jsx", [index("routes/admin/index.jsx")]),
  ]),

  route("login", "routes/login.jsx"),
];
