import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./etapaEntrega.css";
import MaskedInput from "@/components/MaskedInput";

export default function EtapaEntrega({ dados, onNext }) {
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
          <h2 className="text-center mb-0">Endereço de Entrega</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row xs={1} lg={2}>
              <Form.Group as={Col}>
                <Form.Label>CEP</Form.Label>
                <MaskedInput
                  mask="00000-000"
                  type="text"
                  placeholder="CEP"
                  className="input__cep"
                  isInvalid={errors.cep}
                  {...register("cep", { required: "O CEP é obrigatório" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cep?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Logradouro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Logradouro"
                  className="input__logradouro"
                  isInvalid={errors.logradouro}
                  {...register("logradouro", {
                    required: "O logradouro é obrigatório",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.logradouro?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Número</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Número"
                  className="input__numero"
                  isInvalid={errors.numero}
                  {...register("numero", {
                    required: "O número é obrigatório",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numero?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Complemento"
                  isInvalid={errors.complemento}
                  {...register("complemento")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.complemento?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bairro"
                  isInvalid={errors.bairro}
                  {...register("bairro", {
                    required: "O bairro é obrigatório",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bairro?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cidade"
                  isInvalid={errors.cidade}
                  {...register("cidade", {
                    required: "A cidade é obrigatória",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cidade?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-center mt-3">
              <Button type="submit">Próximo</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
