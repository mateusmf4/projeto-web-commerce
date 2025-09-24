import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./etapaPagamento.css";

export default function EtapaPagamento({ dados, onPrev, onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: dados,
  });

  const onSubmit = (nDados) => {
    onNext(nDados);
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <h2 className="mb-0 text-center">Pagamento</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Parcela</Form.Label>
              <Form.Select {...register("parcela")}>
                <option>À vista</option>
                <option>2x</option>
                <option>3x</option>
                <option>4x</option>
              </Form.Select>
            </Form.Group>

            <Row xs={2} lg={1}>
              <Form.Group as={Col} xs={8} lg={8}>
                <Form.Label>Número do Cartão</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Número do cartão"
                  isInvalid={errors.numeroCartao}
                  {...register("numeroCartao", {
                    required: "O número do cartão é obrigatório",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numeroCartao?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={4} lg={2}>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CVV"
                  isInvalid={errors.cvvCartao}
                  {...register("cvvCartao", {
                    required: true,
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cvvCartao?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} lg={2}>
                <Form.Label>Validade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM / AAAA"
                  isInvalid={errors.validadeCartao}
                  {...register("validadeCartao", {
                    required: true,
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.validadeCartao?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group>
              <Form.Label>Nome do titular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do titular"
                isInvalid={errors.nomeCartao}
                {...register("nomeCartao", {
                  required: "O nome é obrigatório",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nomeCartao?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button type="button" onClick={onPrev} variant="secondary">
                Voltar
              </Button>
              <Button type="submit">Próximo</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
