import { createContext } from "react";

import IAppContext from "../interfaces/IAppContext";
import AuthUserType from "../types/AuthUserType";
import ScriptType from "../types/ScriptType";

const AppContext = createContext<IAppContext>({
  user: undefined,
  error: false,
  loading: false,
  errorMessage: "",
  timeError: null,
  scripts: undefined,
  isOpenMenu: false,
  page: "",
  setUser: function (value: AuthUserType): void {
    throw new Error("Function not implemented.");
  },
  setErrorMessage: function (value: string): void {
    throw new Error("Function not implemented.");
  },
  setLoading: function (value: boolean): void {
    throw new Error("Function not implemented.");
  },
  setScripts: function (value: ScriptType[]): void {
    throw new Error("Function not implemented.");
  },
  setError: function (value: boolean): void {
    throw new Error("Function not implemented.");
  },
  setPage: function (value: string): void {
    throw new Error("Function not implemented.");
  },
  setIsOpenMenu: function (value: boolean): void {
    throw new Error("Function not implemented.");
  },
});

export default AppContext;
