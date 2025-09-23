import { FaTruck, FaCreditCard, FaFileAlt } from "react-icons/fa";
import "./passos.css"

export default function Passos({ step }) {
  const steps = [
    { id: 0, label: "Entrega", icon: <FaTruck /> },
    { id: 1, label: "Pagamento", icon: <FaCreditCard /> },
    { id: 2, label: "Resumo", icon: <FaFileAlt /> },
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
