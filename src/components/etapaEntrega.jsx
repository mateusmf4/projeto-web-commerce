import { useForm } from "react-hook-form"
import "./etapaEntrega.css"
import { Button } from "react-bootstrap";

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
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__input">
          <div>
            <input
              type="text"
              placeholder="CEP"
              className="input__cep border rounded"
              {...register("cep", { required: "O CEP é obrigatório" })}
            />
            {errors.cep && <p style={{ color: "red" }}>{errors.cep.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Logradouro"
              className="input__logradouro border rounded"
              {...register("logradouro", { required: "O logradouro é obrigatório" })}
            />
            {errors.logradouro && <p style={{ color: "red" }}>{errors.logradouro.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Número"
              className="input__numero border rounded"
              {...register("numero", { required: "O número é obrigatório" })}
            />
            {errors.numero && <p style={{ color: "red" }}>{errors.numero.message}</p>}
          </div>
        </div>

        <div className="form__input">
          <div>
            <input
              type="text"
              placeholder="Bairro"
              className="border rounded"
              {...register("bairro", { required: "O bairro é obrigatório" })}
            />
            {errors.bairro && <p style={{ color: "red" }}>{errors.bairro.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Cidade"
              className="border rounded"
              {...register("cidade", { required: "A cidade é obrigatória" })}
            />
            {errors.cidade && <p style={{ color: "red" }}>{errors.cidade.message}</p>}
          </div>
        </div>

        <Button className="form__button" type="submit">Próximo</Button>
      </form>
    </div>
  )
}