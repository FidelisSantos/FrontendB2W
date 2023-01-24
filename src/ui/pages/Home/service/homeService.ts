import { api } from "../../../../api/api";
import ScriptType from "../../../../types/ScriptType";
import UserType from "../../../../types/UserType";

export const homeService = {
  login: async (email: string, password: string) => {
    let requestError = false;
    let data: any;
    await api
      .post<string>("auth", {
        email: email,
        password: password,
      })
      .then((response) => {
        data = response.data;
        requestError = false;
      })
      .catch((error) => {
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },

  createUser: async (user: UserType) => {
    let requestError = false;
    let data: any;
    await api
      .post<void>("users", user)
      .then(() => (requestError = false))
      .catch((error) => {
        console.log(error.response.data.message);
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },

  getScripts: async (token: string) => {
    let requestError = false;
    let data: any;
    await api
      .get<ScriptType[]>("scripts", { headers: { Authorization: token } })
      .then((response) => {
        console.log(response.data);
        data = response.data;
      })
      .catch((error) => {
        console.log(error.response.data.message);
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },
};
