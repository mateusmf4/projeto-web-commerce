import { useForm } from "react-hook-form"
import { Form, Button } from "react-bootstrap";
import "./etapaPagamento.css"

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
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__input">
          <Form.Select
            className="input__parcela"
            {...register("parcela")}
          >
            <option>À vista</option>
            <option>2x</option>
            <option>3x</option>
            <option>4x</option>
          </Form.Select>

          <div>
            <input
              type="text"
              placeholder="Número do cartão"
              className="input__cartao border rounded"
              {...register("numeroCartao", { required: "O número do cartão é obrigatório" })}
            />
            {errors.numeroCartao && <p style={{ color: "red" }}>{errors.numeroCartao.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="CVV"
              className="input__cvv border rounded"
              {...register("cvvCartao", { required: "O CVV é obrigatório" })}
            />
            {errors.cvvCartao && <p style={{ color: "red" }}>{errors.cvvCartao.message}</p>}
          </div>
        </div>

        <div className="form__input">
          <div>
            <input
              type="text"
              placeholder="Nome no cartão"
              className="input__nome border rounded"
              {...register("nomeCartao", { required: "O nome é obrigatório" })}
            />
            {errors.nomeCartao && <p style={{ color: "red" }}>{errors.nomeCartao.message}</p>}
          </div>
        </div>

        <div className="form__input">
          <div>
            <input
              type="text"
              placeholder="Endereço de cobrança"
              className="input__endereco border rounded"
              {...register("nomeCartao", { required: "O nome é obrigatório" })}
            />
            {errors.nomeCartao && <p style={{ color: "red" }}>{errors.nomeCartao.message}</p>}
          </div>
        </div>

        <div className="form__buttons">
          <Button type="button" onClick={onPrev}>
            Voltar
          </Button>
          <Button type="submit">Próximo</Button>
        </div>
      </form>
    </div>
  )
}