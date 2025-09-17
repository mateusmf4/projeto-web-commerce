import "./seletorQtd.css";

export default function SeletorQtd({ value, onChange, min = 1, max = 3 }) {
  const dec = () => {
    if (value > min) onChange(value - 1);
  };
  const inc = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="seletor-qtd" role="group" aria-label="Quantidade">
      <button
        type="button"
        className="seletor-qtd__btn"
        onClick={dec}
        aria-label="Diminuir quantidade"
        disabled={value <= min}
      >
        -
      </button>

      <div className="seletor-qtd__display" aria-live="polite">
        {value}
      </div>

      <button
        type="button"
        className="seletor-qtd__btn"
        onClick={inc}
        aria-label="Aumentar quantidade"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}