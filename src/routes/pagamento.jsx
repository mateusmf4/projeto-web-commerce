import { useState } from "react";
import EtapaEntrega from "@/components/etapaEntrega";
import EtapaPagamento from "@/components/etapaPagamento";
import EtapaResumo from "@/components/etapaResumo";
import Passos from "@/components/passos";
import "./pagamento.css";

export function meta() {
  return [{ title: "Checkout" }];
}

export default function Pagamento() {
  const [etapa, setEtapa] = useState(0);

  const [checkoutForm, setCheckoutForm] = useState({
    entrega: {},
    pagamento: {},
  });

  const atualizaForm = (dados) => {
    setCheckoutForm((antDados) => ({ ...antDados, ...dados }));
  };

  const proxEtapa = () => setEtapa((ant) => ant + 1);
  const antEtapa = () => setEtapa((ant) => ant - 1);

  const renderEtapa = () => {
    switch (etapa) {
      case 0:
        return (
          <EtapaEntrega
            dados={checkoutForm.entrega}
            onNext={(dadosEntrega) => {
              atualizaForm({ entrega: dadosEntrega });
              proxEtapa();
            }}
          />
        );
      case 1:
        return (
          <EtapaPagamento
            dados={checkoutForm.pagamento}
            onPrev={antEtapa}
            onNext={(dadosPagamento) => {
              atualizaForm({ pagamento: dadosPagamento });
              proxEtapa();
            }}
          />
        );
      case 2:
        return (
          <EtapaResumo
            dados={checkoutForm}
            onPrev={antEtapa}
            onConfirm={() => {
              alert("Pedido realizado!");
              console.log(checkoutForm);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <div>
        <h1>Checkout</h1>

        <div className="checkout-etapas">
          <Passos step={etapa} />
        </div>

        {renderEtapa()}
      </div>
    </main>
  );
}
