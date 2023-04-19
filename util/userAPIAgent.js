import axios from "axios";

const userAPIAxios = axios.create({
  baseURL: process.env.NEXT_ENVIRONMENT_URL,
});

export const UserAPIAgent = {
  signIn: async ({ email, password }) => {
    return userAPIAxios
      .post("/users/sign-in/", {
        email,
        password,
      })
      .then((res) => res.data);
  },
  signUp: async ({ email, password, confirmPassword }) => {
    return userAPIAxios
      .post("/users/register/", {
        email,
        password,
        confirmPassword,
      })
      .then((res) => res.data);
  },
};
