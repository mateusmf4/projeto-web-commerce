const Carrinho = {
  loadCarrinho() {
    try {
      return JSON.parse(localStorage.getItem("carrinho")) ?? [];
    } catch {
      return [];
    }
  },

  saveCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    return carrinho;
  },

  adicionarProduto(produto) {
    const carrinho = this.loadCarrinho();
    if (!carrinho.find((x) => x.id === produto.id))
      carrinho.push({ ...produto, qtd: 1 });
    this.saveCarrinho(carrinho);
    return carrinho;
  },

  removerProduto(produto) {
    let carrinho = this.loadCarrinho();
    carrinho = carrinho.filter((x) => x.id !== produto.id);
    this.saveCarrinho(carrinho);
    return carrinho;
  },

  limparCarrinho() {
    this.saveCarrinho([]);
    return [];
  },
};

export default Carrinho;
