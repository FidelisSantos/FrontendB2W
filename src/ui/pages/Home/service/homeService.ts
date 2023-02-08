import { api } from "../../../../api/api";
import PostUserType from "../../../../types/PostUserType";
import ScriptType from "../../../../types/ScriptType";

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

  createUser: async (user: PostUserType) => {
    let requestError = false;
    let data: any;
    await api
      .post<void>("users", user)
      .then(() => (requestError = false))
      .catch((error) => {
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },

  getScripts: async (token: string) => {
    let requestError = false;
    let data: any;
    await api
      .get<ScriptType[]>("procedures", { headers: { Authorization: token } })
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          data = "Unauthorized";
        } else {
          data = error.response.data.message;
        }
        requestError = true;
      });

    return { data, requestError };
  },
};
