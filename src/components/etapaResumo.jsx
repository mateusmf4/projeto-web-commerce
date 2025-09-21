export default function EtapaResumo({ dados, onPrev, onConfirm }) {
  return (
    <div>
      <h2>Resumo do pedido</h2>

      <p>{ JSON.stringify(dados.entrega) }</p>

      <button onClick={onPrev}>Voltar</button>
      <button onClick={onConfirm}>Finalizar Pedido</button>
    </div>
  )
}