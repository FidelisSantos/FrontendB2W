import { useEffect, useState } from "react";
import { VscEye } from "react-icons/vsc";
import { Form, FormGroup, Label, Button } from "reactstrap";

import styles from "./Login.module.css";

function Login({ ...props }) {
  const [visible, setVisible] = useState(false);

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
            <div className={styles["password-container"]}>
              <input
                type={visible ? "text" : "password"}
                placeholder="Informe a Senha"
                className={styles["form-input"]}
                onChange={(e) => props.setPassword(e.target.value)}
                value={props.password}
              />
              <VscEye
                className={styles["show-password"]}
                onMouseDown={() => setVisible(true)}
                onMouseUp={() => setVisible(false)}
              />
            </div>
          </FormGroup>
          <Button
            className={styles["form-button"]}
            onClick={() => props.login()}
          >
            Logar
          </Button>
          <Button
            className={styles["form-button"]}
            onClick={() => props.setCreateNewUser(true)}
          >
            Cadatrar-se
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
