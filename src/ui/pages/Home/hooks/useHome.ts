import { useEffect, useState } from "react";

import ScriptType from "../../../../types/ScriptType";
import UserType from "../../../../types/UserType";
import { homeService } from "../service/homeService";

export function useHome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createNewUser, setCreateNewUser] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [scripts, setScripts] = useState<ScriptType[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getScripts();
    }
  }, [localStorage.getItem("token")]);

  const timeError = setInterval(() => {
    setError(false);
    clearInterval(timeError);
  }, 5000);

  async function login() {
    setLoading(true);
    const { data, requestError } = await homeService.login(email, password);
    if (requestError) {
      setErrorMessage(data);
      setError(true);
      timeError;
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      location.reload();
    }
    setLoading(false);
  }

  async function createUser() {
    setLoading(true);
    if (password === confirmPassword) {
      const user: UserType = {
        name: name,
        email: email,
        password: password,
      };
      const { data, requestError } = await homeService.createUser(user);
      if (requestError) {
        setErrorMessage(data);
        setError(true);
        timeError;
      } else {
        setCreateNewUser(false);
        console.log("deu boa");
      }
    } else {
      setErrorMessage("Confirmação da senha diferente da senha");
      setError(true);
      timeError;
    }
    setLoading(false);
  }

  async function getScripts() {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const { data, requestError } = await homeService.getScripts(token);
    if (requestError) {
      setErrorMessage(data);
      setError(true);
      timeError;
    } else {
      setScripts(data);
    }
    setLoading(false);
  }

  return {
    setEmail,
    email,
    password,
    setPassword,
    error,
    loading,
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    createNewUser,
    setCreateNewUser,
    isOpenChat,
    setIsOpenChat,
    login,
    createUser,
  };
}
