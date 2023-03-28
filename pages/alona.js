import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import colos from "../configs/colos";
import Form from "../components/Form";
import TodoChild from "../components/TodoChild";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  padding: 20px;
`;

const ContainerInner = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
  border: 1px solid white;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  color: white;
  background-color: ${colos.purble};
  & h1 {
    font-weight: 900;
    border-bottom: 1px solid white;
    margin: auto;
  }
`;

const ToDoListChildren = styled.div`
  width: 100%;
  height: 550px;
  padding: 20px 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default function Alona() {
  const [toDoList, setToDoList] = useState([]);
  const ref = useRef();

  const TodoFunction = async () => {
    try {
      setToDoList(
        await axios
          .get(`${process.env.NEXT_ENVIRONMENT_URL}/todo-list`)
          .then((res) => res.data)
          .catch((err) => console.log(err))
      );
    } catch {
      (err) => console.log(err.message);
    }
  };

  const todoAdd = async (value) => {
    console.log(value);
    await axios
      .post(`${process.env.NEXT_ENVIRONMENT_URL}/todo-list`, {
        text: value.text,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    TodoFunction();
  };

  useEffect(() => {
    return () => {
      TodoFunction();
    };
  }, []);

  return (
    <Container>
      <ContainerInner ref={ref}>
        <h1>Todo List</h1>
        <ToDoListChildren>
          {toDoList.map((element, _) => (
            <TodoChild
              key={element.id}
              element={element}
              width={ref.current.clientWidth}
              refetch={TodoFunction}
            />
          ))}
        </ToDoListChildren>
        <Form onSubmit={todoAdd} BtnText={"ADD"} />
      </ContainerInner>
    </Container>
  );
}
