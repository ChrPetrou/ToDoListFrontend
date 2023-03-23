import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
`;

const ContainerInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  /* flex-direction: column; */
  border: 2px solid white;
  border-radius: 25px;
  width: 100%;
  max-width: 1200px;
  color: white;
  & h1 {
    font-weight: 900;
    /* width: 100%; */

    margin: auto;
    /* align-self: center; */
  }
`;

const ToDoListChildren = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
`;

const ToDoListChild = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;
  gap: 20px;
  border-radius: 15px;
`;

export default function Alona() {
  const [toDoList, setToDoList] = useState([]);

  const TodoFunction = async () => {
    try {
      setToDoList(
        await axios
          .get(`http://localhost:4000`)
          .then((res) => res.data)
          .catch((err) => console.log(err))
      );
    } catch {
      (err) => console.log(err.message);
    }
  };

  useEffect(() => {
    return () => {
      TodoFunction();
    };
  }, []);

  return (
    <Container>
      <ContainerInner>
        <h1>To do List</h1>
        <ToDoListChildren>
          {toDoList &&
            toDoList?.map((element, index) => (
              <ToDoListChild key={element.id}>
                <p>{element.text}</p>
                <p>{element.isCompleted.toString()}</p>
              </ToDoListChild>
            ))}
        </ToDoListChildren>
      </ContainerInner>
    </Container>
  );
}
