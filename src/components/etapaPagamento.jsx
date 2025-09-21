import { useForm } from "react-hook-form"

export default function EtapaPagamento({ dados, onPrev, onNext }) {
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: dados
  });

  const onSubmit = (nDados) => {
    onNext(nDados);
  };

  return (
    <div>
      <h2>Pagamento</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Número do cartão"
          {...register("numeroCartao", { required: "O número do cartão é obrigatório" })}
        />
        {errors.numeroCartao && <p style={{ color: "red" }}>{errors.numeroCartao.message}</p>}

        <input
          type="text"
          placeholder="Nome no cartão"
          {...register("nomeCartao", { required: "O nome é obrigatório" })}
        />
        {errors.nomeCartao && <p style={{ color: "red" }}>{errors.nomeCartao.message}</p>}

        <input
          type="text"
          placeholder="CVV"
          {...register("cvvCartao", { required: "O CVV é obrigatório" })}
        />
        {errors.cvvCartao && <p style={{ color: "red" }}>{errors.cvvCartao.message}</p>}

        <button type="button" onClick={onPrev}>
          Voltar
        </button>
        <button type="submit">Próximo</button>
      </form>
    </div>
  )
}