import axios from "axios";
import { getCookie } from "cookies-next";

const token_id = getCookie("token");
const todoAPIAxios = axios.create({
  baseURL: process.env.NEXT_ENVIRONMENT_URL,
  headers: {
    Authorization: `Bearer ${token_id}`,
  },
});

const todoAPIAgent = {
  getAllTodos: async () => {
    return todoAPIAxios.get("/todo-list").then((res) => res.data);
  },
  getTodoById: async (value) => {},
  createTodo: async ({ text }) => {
    return todoAPIAxios
      .post("/todo-list", {
        text,
      })
      .then((res) => res.data);
  },
  deleteTodo: async (id) => {
    return todoAPIAxios.delete(`/todo-list/${id}`).then((res) => res.data);
  },
  todoUpdate: async ({ _id, isCompleted, text }) => {
    return todoAPIAxios.patch(
      `${process.env.NEXT_ENVIRONMENT_URL}/todo-list/${_id}`,
      {
        text,
        isCompleted,
      }
    );
  },
};

export default todoAPIAgent;
