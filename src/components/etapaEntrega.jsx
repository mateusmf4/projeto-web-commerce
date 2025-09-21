import { useForm } from "react-hook-form"

export default function EtapaEntrega({ dados, onNext }) {
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: dados
  });

  const onSubmit = (nDados) => {
    onNext(nDados);
  };

  return (
    <div>
      <h2>Endereço de Entrega</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Endereço"
          {...register("endereco", { required: "O endereço é obrigatório" })}
        />
        {errors.endereco && <p style={{ color: "red" }}>{errors.endereco.message}</p>}

        <input
          type="text"
          placeholder="Número"
          {...register("numero", { required: "O número é obrigatório" })}
        />
        {errors.numero && <p style={{ color: "red" }}>{errors.numero.message}</p>}

        <input
          type="text"
          placeholder="Cidade"
          {...register("cidade", { required: "A cidade é obrigatória" })}
        />
        {errors.cidade && <p style={{ color: "red" }}>{errors.cidade.message}</p>}

        <input
          type="text"
          placeholder="Bairro"
          {...register("bairro", { required: "O bairro é obrigatório" })}
        />
        {errors.bairro && <p style={{ color: "red" }}>{errors.bairro.message}</p>}

        <button type="submit">Próximo</button>
      </form>
    </div>
  )
}