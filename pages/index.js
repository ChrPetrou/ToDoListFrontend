import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdAddCircleOutline } from "react-icons/io";
import colos from "../configs/colos";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  padding: 0 15px;
`;

const ContainerInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  /* flex-direction: column; */
  border: 1px solid white;
  border-radius: 25px;
  width: 100%;
  max-width: 1200px;
  color: white;
  background-color: ${colos.dark};
  & h1 {
    font-weight: 900;
    border-bottom: 1px solid white;
    /* width: 100%; */

    margin: auto;
    /* align-self: center; */
  }
`;

const ToDoListChildren = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;

  border-radius: 15px;
`;

const ToDoListChild = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% / 3 - 60px / 3);
  min-width: 200px;
  border: 1px solid white;
  /* flex: 2 1; */
  padding: 20px;
  gap: 20px;
  border-radius: 15px;
  & p,
  span {
    font-size: 20px;
    width: 100%;
  }
`;

const AddNew = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  min-width: 200px;
  border: 1px solid white;
  /* flex: 2 1; */
  padding: 10px;
  background-color: ${colos.blue};
  gap: 10px;
  border-radius: 15px;
  cursor: pointer;
`;

function PopUp() {
  const PopUpContainer = styled.div`
    display: flex;
    height: 100vh;
  `;
  return <PopUpContainer>Hello</PopUpContainer>;
}

export default function Home({ toDoList }) {
  return (
    <Container>
      <ContainerInner>
        <h1>To do List</h1>
        <ToDoListChildren>
          {toDoList.map((element, index) => (
            <ToDoListChild key={element.id}>
              <p>Task : {element.text}</p>
              <span>Done : {element.isCompleted ? "yes" : "no"}</span>
            </ToDoListChild>
          ))}
          <AddNew onClick={() => PopUp()}>
            <p>Add New</p>
            <IoMdAddCircleOutline size={30} />
          </AddNew>
        </ToDoListChildren>
      </ContainerInner>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const toDoList = await axios
    .get(`http://localhost:4000`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      toDoList,
    },
  };
}
