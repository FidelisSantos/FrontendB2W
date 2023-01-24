import { useEffect, useState } from "react";
import { VscEye } from "react-icons/vsc";
import { Form, FormGroup, Label, Button } from "reactstrap";

import styles from "./CreateUser.module.css";

function CreateUser({ ...props }) {
  const [passwordVisibilty, setPasswordVisibilty] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  useEffect(() => {
    props.setEmail("");
    props.setPassword("");
  }, []);

  return (
    <>
      <div className={styles["container"]}>
        <Form className={styles["form-container"]}>
          <FormGroup>
            <div>
              <Label className={styles["form-label"]}>Nome</Label>
            </div>
            <input
              type="email"
              placeholder="Informe o Nome Completo"
              className={styles["form-input"]}
              onChange={(e) => props.setName(e.target.value)}
              value={props.name}
            />
          </FormGroup>
          <FormGroup>
            <div>
              <Label className={styles["form-label"]}>Email</Label>
            </div>
            <input
              type="email"
              placeholder="Informe o Email"
              className={styles["form-input"]}
              onChange={(e) => props.setEmail(e.target.value)}
              value={props.email}
            />
          </FormGroup>
          <FormGroup>
            <div>
              <Label className={styles["form-label"]}>Senha</Label>
            </div>
            <input
              type={passwordVisibilty ? "text" : "password"}
              placeholder="Informe a Senha"
              className={styles["form-input"]}
              onChange={(e) => props.setPassword(e.target.value)}
              value={props.password}
            />
            <VscEye
              className={styles["show-password"]}
              onMouseDown={() => setPasswordVisibilty(true)}
              onMouseUp={() => setPasswordVisibilty(false)}
            />
          </FormGroup>
          <FormGroup>
            <div>
              <Label className={styles["form-label"]}>Confirme a senha</Label>
            </div>
            <div className={styles["password-container"]}>
              <input
                type={confirmPasswordVisibility ? "text" : "password"}
                placeholder="Confirme a senha"
                className={styles["form-input"]}
                onChange={(e) => props.setConfirmPassword(e.target.value)}
                value={props.confirmPassword}
              />
              <VscEye
                className={styles["show-password"]}
                onMouseDown={() => setConfirmPasswordVisibility(true)}
                onMouseUp={() => setConfirmPasswordVisibility(false)}
              />
            </div>
          </FormGroup>
          <Button
            className={styles["form-button"]}
            onClick={() => props.createUser()}
          >
            Cadastrar
          </Button>
          <Button
            className={styles["form-button"]}
            onClick={() => props.setCreateNewUser(false)}
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CreateUser;
