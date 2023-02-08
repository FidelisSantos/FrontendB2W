import CryptoJS from "crypto-js";
import { useContext, useEffect, useState } from "react";

import AppContext from "../../../../context/AppContext";
import AuthUserType from "../../../../types/AuthUserType";
import UserType from "../../../../types/UserType";
import { usersService } from "../service/usersService";

function useUsers() {
  const {
    error,
    loading,
    errorMessage,
    timeError,
    isOpenMenu,
    setPage,
    setErrorMessage,
    setLoading,
    setError,
    setIsOpenMenu,
  } = useContext(AppContext);
  const [users, setUsers] = useState<UserType[]>([]);
  const [redirect, setRedirect] = useState(false);
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

  useEffect(() => {
    setPage("user");
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      getUsers();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setRedirect(true);
    }
  }, [localStorage.getItem("token"), localStorage.getItem("user")]);

  async function getUsers() {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    const { data, requestError } = await usersService.get(token);
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        location.reload();
      } else setErrorMessage(data);

      setError(true);
      timeError;
    } else {
      setUsers(data);
    }
    setLoading(false);
  }

  async function updateToadmin(id: string) {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    const { data, requestError } = await usersService.updateToAdmin(id, token);
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        location.reload();
      } else setErrorMessage(data);

      setError(true);
      timeError;
    } else {
      location.reload();
    }
    setLoading(false);
  }

  async function removeAdmin(id: string) {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    const { data, requestError } = await usersService.removeAdmin(id, token);
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        location.reload();
      } else setErrorMessage(data);

      setError(true);
      timeError;
    } else {
      location.reload();
    }
    setLoading(false);
  }

  async function validUser(id: string) {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    const { data, requestError } = await usersService.validUser(id, token);
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        location.reload();
      } else setErrorMessage(data);

      setError(true);
      timeError;
    } else {
      location.reload();
    }
    setLoading(false);
  }

  async function resetPassword(id: string) {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    const { data, requestError } = await usersService.resetPassword(id, token);
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        location.reload();
      } else setErrorMessage(data);

      setError(true);
      timeError;
    } else {
      location.reload();
    }
    setLoading(false);
  }

  async function deleteUser(id: string) {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    const { data, requestError } = await usersService.delete(id, token);
    if (requestError) {
      if (data === "Unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorMessage("Sessão expirou");
        location.reload();
      } else setErrorMessage(data);

      setError(true);
      timeError;
    } else {
      location.reload();
    }
    setLoading(false);
  }

  return {
    users,
    loading,
    errorMessage,
    error,
    currentUser,
    redirect,
    isOpenMenu,
    updateToadmin,
    removeAdmin,
    validUser,
    resetPassword,
    deleteUser,
    setIsOpenMenu,
  };
}

export default useUsers;
