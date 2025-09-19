import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LogoSvg from "@/assets/logo.svg?react";
import "./login.css";
import api from "@/services/api";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    subscribe,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    return subscribe({
      formState: {
        values: true,
      },
      callback: () => {
        // é chamado quando qualquer mudança é feita no form
        setErrorMessage(null);
      },
    });
  }, [subscribe]);

  const onSubmit = (data) => {
    setIsLoading(true);
    api
      .login(data.tipo, data.usuario, data.senha)
      .then(() => {
        if (data.tipo === "lojista") {
          window.location.pathname = "/lojista";
        } else if (data.tipo === "admin") {
          window.location.pathname = "/admin";
        }
      })
      .catch((msg) => {
        setErrorMessage(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="login__bg-pattern"></div>

      <Container className="flex-fill d-flex flex-column">
        <main>
          <Card className="w-100 login__login-card shadow">
            <Card.Header className="d-flex justify-content-center">
              <a href="/" className="text-body-secondary">
                <LogoSvg />
              </a>
            </Card.Header>
            <Card.Body>
              <h2>Login</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Check
                  inline
                  label="Lojista"
                  type="radio"
                  value="lojista"
                  name="tipo-login"
                  defaultChecked
                  disabled={isLoading}
                  {...register("tipo")}
                />

                <Form.Check
                  inline
                  label="Admin"
                  value="admin"
                  type="radio"
                  name="tipo-login"
                  disabled={isLoading}
                  {...register("tipo")}
                />

                <Form.Group>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Usuario"
                    isInvalid={errors.usuario}
                    disabled={isLoading}
                    {...register("usuario", { required: "Insira um valor" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.usuario?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    isInvalid={errors.senha}
                    disabled={isLoading}
                    {...register("senha", { required: "Insira um valor" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.senha?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="mt-3 w-100"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="sm" /> : "Login"}
                </Button>

                {errorMessage && (
                  <span className="d-flex">
                    <small className="text-danger text-center w-100">
                      {errorMessage}
                    </small>
                  </span>
                )}
              </Form>
            </Card.Body>
          </Card>
        </main>
      </Container>
    </>
  );
}
