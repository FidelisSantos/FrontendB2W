import { api } from "../../../../api/api";
import ScriptType from "../../../../types/ScriptType";

const scriptsService = {
  getScripts: async (endPoint: string, token: string) => {
    let requestError = false;
    let data: any;
    await api
      .get<ScriptType[]>(endPoint, { headers: { Authorization: token } })
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

    return { requestError, data };
  },
  createScript: async (endPoint: string, token: string, body: FormData) => {
    let requestError = false;
    let data: any;
    await api
      .post(endPoint, body, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        requestError = false;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          data = "Unauthorized";
        } else {
          data = error.response.data;
        }
        requestError = true;
      });

    return { requestError, data };
  },
  deleteScript: async (endPoint: string, token: string, id: string) => {
    let requestError = false;
    let data: any;
    await api
      .delete(`${endPoint}/${id}`, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        requestError = false;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          data = "Unauthorized";
        } else {
          data = error.response.data;
        }
        requestError = true;
      });

    return { requestError, data };
  },
};

export default scriptsService;
