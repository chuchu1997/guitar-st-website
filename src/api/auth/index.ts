/** @format */

import api from "../interceptor";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {}

const authApi = {
  login: async (data: LoginPayload) => {
    return await api({
      method: "POST",
      url: "/auth/login",
      data,
    });
  },
};

export default authApi;
