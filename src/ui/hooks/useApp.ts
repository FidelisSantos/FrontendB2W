import { useState } from "react";

import AuthUserType from "../../types/AuthUserType";
import ScriptType from "../../types/ScriptType";

export function useApp() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<AuthUserType>();
  const [scripts, setScripts] = useState<ScriptType[]>([]);
  const [page, setPage] = useState<string>("home");
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const timeError = setInterval(() => {
    setError(false);
    clearInterval(timeError);
  }, 5000);

  return {
    user,
    error,
    loading,
    errorMessage,
    timeError,
    scripts,
    page,
    setUser,
    setErrorMessage,
    setLoading,
    setError,
    setScripts,
    setPage,
    isOpenMenu,
    setIsOpenMenu,
  };
}
