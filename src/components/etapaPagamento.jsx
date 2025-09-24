import { useMemo, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./etapaPagamento.css";
import creditCardType from "credit-card-type";
import { CreditCardIcon } from "lucide-react";
import BadgeElo from "@/assets/cards/elo.svg?react";
import BadgeHipercard from "@/assets/cards/hipercard.svg?react";
import BadgeMastercard from "@/assets/cards/mastercard.svg?react";
import BadgeVisa from "@/assets/cards/visa.svg?react";
import MaskedInput from "@/components/MaskedInput";

const KNOWN_CARDS = ["elo", "hipercard", "mastercard", "visa"];
const CARD_LOGOS = [
  CreditCardIcon,
  BadgeElo,
  BadgeHipercard,
  BadgeMastercard,
  BadgeVisa,
];

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

  const [cardIndex, setCardIndex] = useState(0);
  const ActiveCardLogo = useMemo(() => CARD_LOGOS[cardIndex], [cardIndex]);

  const onCartaoInput = (e) => {
    const filtered = e.target.value.replace(/\D/g, "").trim();
    if (!filtered.length) {
      setCardIndex(0);
      return;
    }

    const guesses = creditCardType(filtered).filter((card) =>
      KNOWN_CARDS.includes(card.type),
    );
    if (!guesses.length) {
      setCardIndex(0);
      return;
    }
    setCardIndex(KNOWN_CARDS.indexOf(guesses[0].type) + 1);
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
                <InputGroup>
                  <MaskedInput
                    mask="0000 0000 0000 0000"
                    type="text"
                    placeholder="Número do cartão"
                    isInvalid={errors.numeroCartao}
                    onInput={onCartaoInput}
                    {...register("numeroCartao", {
                      required: "O número do cartão é obrigatório",
                    })}
                  />
                  <InputGroup.Text>
                    <ActiveCardLogo width="auto" height="1lh" />
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {errors.numeroCartao?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={4} lg={2}>
                <Form.Label>CVV</Form.Label>
                <MaskedInput
                  // não sei se tem algum maior que 3 digitos, mais vai que
                  mask="00000"
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
                <MaskedInput
                  mask="00/0000"
                  type="text"
                  placeholder="MM/AA"
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
