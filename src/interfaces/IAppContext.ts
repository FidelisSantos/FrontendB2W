import { Dispatch } from "react";

import AuthUserType from "../types/AuthUserType";
import ScriptType from "../types/ScriptType";

interface IAppContext {
  user: AuthUserType | undefined;
  scripts: ScriptType[] | undefined;
  error: boolean;
  loading: boolean;
  errorMessage: string;
  timeError: NodeJS.Timer | null;
  page: string;
  isOpenMenu: boolean;
  setUser: Dispatch<AuthUserType>;
  setScripts: Dispatch<ScriptType[]>;
  setErrorMessage: Dispatch<string>;
  setLoading: Dispatch<boolean>;
  setError: Dispatch<boolean>;
  setPage: Dispatch<string>;
  setIsOpenMenu: Dispatch<boolean>;
}

export default IAppContext;
