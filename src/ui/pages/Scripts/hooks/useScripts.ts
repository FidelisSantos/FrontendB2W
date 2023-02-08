import CryptoJS from "crypto-js";
import { useContext, useEffect, useState } from "react";

import AppContext from "../../../../context/AppContext";
import ActionEnum from "../../../../enum/ActionEnum";
import AuthUserType from "../../../../types/AuthUserType";
import scriptsService from "../service/scriptsService";

function useScripts() {
  const {
    error,
    loading,
    errorMessage,
    timeError,
    isOpenMenu,
    setPage,
    setErrorMessage,
    setLoading,
    setScripts,
    setIsOpenMenu,
    scripts,
    setError,
  } = useContext(AppContext);

  const [redirect, setRedirect] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");
  const [answerFile, setAnswerFile] = useState<FileList>();
  const [action, setAction] = useState(ActionEnum.Create);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [image, setImage] = useState("");
  const [titleImage, setTitleImage] = useState("");
  const [id, setId] = useState("");
  let currentUser: AuthUserType = {
    id: "",
    email: "",
    name: "",
    role: "",
  };
  if (localStorage.getItem("user")) {
    const encriptedUser = localStorage.getItem("user") as string;
    const decriptedUser = CryptoJS.AES.decrypt(encriptedUser, "testinho");
    currentUser = JSON.parse(
      decriptedUser.toString(CryptoJS.enc.Utf8)
    ) as AuthUserType;
  }
  const imagesTypes = ["image/jpeg", "image/jpg", "image/png"];

  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setRedirect(true);
      return;
    }
  }, [localStorage.getItem("token"), localStorage.getItem("user")]);

  async function getScripts(endPoint: string) {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      location.reload();
    }
    const { data, requestError } = await scriptsService.getScripts(
      endPoint,
      token as string
    );
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        setError(true);
        location.reload();
      } else {
        setError(true);
        setErrorMessage(data);
      }

      timeError;
    } else setScripts(data);

    setLoading(false);
  }

  async function createScript(
    endPoint: string,
    question: string,
    answer: string,
    answerUrl?: string,
    answerFiles?: FileList
  ) {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      location.reload();
    }

    console.log({ question: question });
    console.log({ answer: answer });
    console.log({ answerUrl: answerUrl });
    console.log({ answerFile: answerFile });

    const body = new FormData();
    body.append("question", question);
    body.append("answer", answer);
    if (answerUrl) body.append("imgAnswer", answerUrl);
    if (
      answerFiles &&
      answerFiles.length > 0 &&
      imagesTypes.includes(answerFiles[0].type)
    )
      body.append("image", answerFiles[0], answerFiles[0].name);

    const { data, requestError } = await scriptsService.createScript(
      endPoint,
      token as string,
      body
    );
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        setError(true);
        location.reload();
      } else {
        setErrorMessage(data);
        setError(true);
      }

      timeError;
    } else getScripts(endPoint);

    setLoading(false);
  }

  async function deleteScript(endPoint: string, id: string) {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      location.reload();
    }
    const { data, requestError } = await scriptsService.deleteScript(
      endPoint,
      token as string,
      id
    );
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        setError(true);
        location.reload();
      } else {
        setError(true);
        setErrorMessage(data);
      }

      timeError;
    } else getScripts(endPoint);

    setLoading(false);
  }

  async function updateScript(
    endPoint: string,
    id: string,
    question: string,
    answer: string,
    answerUrl?: string,
    answerFiles?: FileList
  ) {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      location.reload();
    }

    console.log({ question: question });
    console.log({ answer: answer });
    console.log({ answerUrl: answerUrl });
    console.log({ answerFile: answerFile });

    const body = new FormData();
    body.append("question", question);
    body.append("answer", answer);
    if (answerUrl) body.append("imgAnswer", answerUrl);
    if (
      answerFiles &&
      answerFiles.length > 0 &&
      imagesTypes.includes(answerFiles[0].type)
    )
      body.append("image", answerFiles[0], answerFiles[0].name);

    const { data, requestError } = await scriptsService.updateScript(
      endPoint,
      token as string,
      body,
      id
    );
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        setError(true);
        location.reload();
      } else {
        setErrorMessage(data);
        setError(true);
      }

      timeError;
    } else getScripts(endPoint);

    setLoading(false);
  }

  return {
    loading,
    errorMessage,
    error,
    redirect,
    scripts,
    isOpen,
    question,
    answer,
    answerUrl,
    currentUser,
    isOpenMenu,
    answerFile,
    action,
    image,
    isOpenImage,
    titleImage,
    id,
    setTitleImage,
    setImage,
    setAnswerUrl,
    setAnswer,
    setQuestion,
    setAnswerFile,
    setIsOpen,
    setAction,
    setIsOpenMenu,
    getScripts,
    setPage,
    setIsOpenImage,
    createScript,
    deleteScript,
    updateScript,
    setId,
  };
}

export default useScripts;
