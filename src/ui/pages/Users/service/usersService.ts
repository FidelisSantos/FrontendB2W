import { api } from "../../../../api/api";

export const usersService = {
  get: async (token: string) => {
    let requestError = false;
    let data: any;
    await api
      .get("users", { headers: { Authorization: token } })
      .then((response) => (data = response.data))
      .catch((error) => {
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },
  updateToAdmin: async (id: string, token: string) => {
    let requestError = false;
    let data: any;
    await api
      .patch(
        `users/updatetoadmin/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => (data = response.data))
      .catch((error) => {
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },
  removeAdmin: async (id: string, token: string) => {
    let requestError = false;
    let data: any;
    await api
      .patch(
        `users/removeadmin/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => (data = response.data))
      .catch((error) => {
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },
  validUser: async (id: string, token: string) => {
    let requestError = false;
    let data: any;
    await api
      .patch(
        `users/valid/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => (data = response.data))
      .catch((error) => {
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },
  resetPassword: async (id: string, token: string) => {
    let requestError = false;
    let data: any;
    await api
      .patch(
        `users/resetpassword/${id}`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => (data = response.data))
      .catch((error) => {
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },
  delete: async (id: string, token: string) => {
    let requestError = false;
    let data: any;
    await api
      .delete(`users/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => (data = response.data))
      .catch((error) => {
        data = error.response.data.message;
        requestError = true;
      });

    return { data, requestError };
  },
};
