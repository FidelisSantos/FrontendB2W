import CryptoJS from "crypto-js";
import { useContext, useEffect, useState } from "react";

import AppContext from "../../../../context/AppContext";
import { inputSearchOffRef, inputSearchOutRef } from "../../../../ref/ref";
import AuthUserType from "../../../../types/AuthUserType";
import ChatTextType from "../../../../types/ChatTextType";
import PostUserType from "../../../../types/PostUserType";
import ScriptType from "../../../../types/ScriptType";
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
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [image, setImage] = useState("");
  const [titleImage, setTitleImage] = useState("");
  const [scriptsOut, setScriptsOut] = useState<ScriptType[]>([]);
  const [scriptsOff, setScriptsOff] = useState<ScriptType[]>([]);
  const [isSearchOut, setIsSearchOut] = useState(false);
  const [isSearchOff, setIsSearchOff] = useState(false);
  const [isOpenScript, setIsOpenScript] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setPage("home");
    onClose();
    if (localStorage.getItem("token")) {
      getScripts();
      getScriptsOut();
      getScriptsOff();
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

  async function getScriptsOut() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const { data, requestError } = await scriptsService.getScripts(
      "out",
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
    } else setScriptsOut(data);
  }

  async function getScriptsOff() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const { data, requestError } = await scriptsService.getScripts(
      "off",
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
    } else setScriptsOff(data);
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
      if (script.question.toLowerCase().includes(e.toLowerCase())) {
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

  function searchOut() {
    const search = inputSearchOutRef.current?.value as string;
    if (search.length < 0) return;
    setIsSearchOut(true);
    const scripts: ScriptType[] = [];
    scriptsOut.forEach((script) => {
      if (script.question.toLowerCase().includes(search.toLowerCase()))
        scripts.push(script);
    });
    setScriptsOut(scripts);
  }

  function resetSearchOut() {
    if (inputSearchOutRef.current) inputSearchOutRef.current.value = "";
    setIsSearchOut(false);
    getScriptsOut();
  }

  function searchOff() {
    const search = inputSearchOffRef.current?.value as string;
    if (search.length < 0) return;
    setIsSearchOff(true);
    const scripts: ScriptType[] = [];
    scriptsOff.forEach((script) => {
      if (script.question.toLowerCase().includes(search.toLowerCase()))
        scripts.push(script);
    });
    setScriptsOff(scripts);
  }

  function resetSearchOff() {
    if (inputSearchOffRef.current) inputSearchOffRef.current.value = "";
    setIsSearchOff(false);
    getScriptsOff();
  }

  function onClose() {
    const div = document.querySelector(".chat-container");
    if (div) div.innerHTML = "";
    setChatText([]);
    setIsOpenChat(false);
  }

  return {
    user,
    email,
    password,
    error,
    loading,
    name,
    confirmPassword,
    errorMessage,
    createNewUser,
    isOpenChat,
    chatText,
    isOpenMenu,
    isOpenImage,
    image,
    titleImage,
    scriptsOut,
    scriptsOff,
    isSearchOut,
    isSearchOff,
    isOpenScript,
    question,
    answer,
    url,
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    setCreateNewUser,
    setIsOpenChat,
    login,
    createUser,
    setChatText,
    insertQuestionChat,
    onClose,
    setIsOpenMenu,
    setIsOpenImage,
    setImage,
    setTitleImage,
    searchOut,
    setIsSearchOut,
    resetSearchOut,
    searchOff,
    resetSearchOff,
    setIsOpenScript,
    setQuestion,
    setAnswer,
    setUrl,
  };
}
