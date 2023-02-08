import CryptoJS from "crypto-js";
import { useContext, useEffect, useState } from "react";

import AppContext from "../../../../context/AppContext";
import AuthUserType from "../../../../types/AuthUserType";
import ChatTextType from "../../../../types/ChatTextType";
import PostUserType from "../../../../types/PostUserType";
import scriptsService from "../../Scripts/service/scriptsService";
import { homeService } from "../service/homeService";

export function useHome() {
  const {
    error,
    loading,
    errorMessage,
    timeError,
    scripts,
    user,
    isOpenMenu,
    setUser,
    setErrorMessage,
    setLoading,
    setError,
    setScripts,
    setPage,
    setIsOpenMenu,
  } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createNewUser, setCreateNewUser] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [chatText, setChatText] = useState<ChatTextType[]>([]);

  useEffect(() => {
    setPage("home");
    onClose();
    if (localStorage.getItem("token")) {
      getScripts();
      const encriptedUser = localStorage.getItem("user") as string;
      const decriptedUser = CryptoJS.AES.decrypt(encriptedUser, "testinho");
      const currentUser: AuthUserType = JSON.parse(
        decriptedUser.toString(CryptoJS.enc.Utf8)
      ) as AuthUserType;
      setUser(currentUser);
    }
  }, [localStorage.getItem("token")]);

  async function login() {
    setLoading(true);
    const { data, requestError } = await homeService.login(email, password);
    if (requestError) {
      setErrorMessage(data);
      setError(true);
      timeError;
    } else {
      localStorage.setItem("token", data.token);
      const userEncrypte = CryptoJS.AES.encrypt(
        JSON.stringify(data.user) as string,
        "testinho"
      ).toString();

      localStorage.setItem("user", userEncrypte);
    }
    setLoading(false);
  }

  async function createUser() {
    setLoading(true);
    if (password === confirmPassword) {
      const user: PostUserType = {
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
    const { data, requestError } = await scriptsService.getScripts(
      "procedures",
      token
    );
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("scripts");
        setErrorMessage("Sessão expirou");
        location.reload();
      } else {
        setError(true);
        setErrorMessage(data);
        timeError;
      }
    } else setScripts(data);

    setLoading(false);
  }

  function insertQuestionChat(question: string) {
    const questionUser: string[] = [];
    questionUser.push(question);
    const userText: ChatTextType = {
      sender: "User",
      message: {
        text: questionUser,
      },
    };
    chatText.push(userText);
    searchScript(question);
  }

  function searchScript(e: string) {
    let search = false;
    const questions: string[] = [];
    let answers: string[] = [];
    let answer: ChatTextType = {
      sender: "",
      message: {
        text: [],
      },
    };

    scripts?.forEach((script) => {
      if (script.question.includes(e)) {
        search = true;
        answers.push(script.answer);
        questions.push(script.question);
        answers.push("Posso te ajudar em mais alguma dúvida?");
        answer = {
          sender: "Olivia",
          message: {
            image: script.imgAnswer,
            text: answers,
          },
        };
      }
    });

    if (questions.length > 1) {
      answers = [];
      answers.push("Resultados Encontrados: ");
      questions.forEach((question) => {
        answers.push(`- ${question}`);
      });
      answers.push(
        "Para facilitar poderia informar o procedimento completo que está procurando?"
      );
      answer = {
        sender: "Olivia",
        message: {
          text: answers,
        },
      };
    }

    if (!search) {
      answers = [];
      answers.push("Desculpe não encontrei");
      answers.push("Posso te ajudar em mais alguma dúvida?");
      answer = {
        sender: "Olivia",
        message: {
          text: answers,
        },
      };
    }

    chatText.push(answer);
  }

  function onClose() {
    const div = document.querySelector(".chat-container");
    if (div) div.innerHTML = "";
    setChatText([]);
    setIsOpenChat(false);
  }

  return {
    setEmail,
    user,
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
    chatText,
    setChatText,
    insertQuestionChat,
    onClose,
    isOpenMenu,
    setIsOpenMenu,
  };
}
