import "./passos.css"
import { TruckIcon, WalletCardsIcon, FileTextIcon } from "lucide-react";

export default function Passos({ step }) {
  const steps = [
    { id: 0, label: "Entrega", icon: <TruckIcon /> },
    { id: 1, label: "Pagamento", icon: <WalletCardsIcon /> },
    { id: 2, label: "Resumo", icon: <FileTextIcon /> },
  ];

  return (
    <div className="passos">
      {steps.map((s, index) => (
        <div className="passos__etapa" key={s.id}>
          <div className={`passos__icone
            ${step === s.id ? "passos__icone--ativo" :
              step > s.id ? "passos__icone--feito" : ""}
          `}
          >
            {s.icon}
          </div>

          {/* Linha de conexão (não desenha depois da última etapa) */}
          {index < steps.length - 1 && (
            <div className={`passos__linha
                ${step > s.id ? "passos__linha--feito" : ""}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}
