import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.jsx", [
    index("routes/home.jsx"),
    route("produtos", "routes/produtos.jsx"),
    route("contato", "routes/contato.jsx"),
    route("carrinho", "routes/carrinho.jsx"),
  ]),
];
