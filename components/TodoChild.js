import React, { useState } from "react";
import styled from "styled-components";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiCheckboxChecked, BiCheckbox } from "react-icons/bi";
import useDebounce from "../util/useDebounce";
import axios from "axios";
import PopUp from "./PopUp";
import Form from "./Form";
import todoAPIAgent from "../util/todoAPIAgent";

const ToDoListChild = styled.div`
  display: flex;
  flex-wrap: wrap;
  perspective: 2500px;
  justify-content: space-between;

  align-items: center;
  background-color: rgb(9, 43, 95);
  width: 100%;
  min-width: 200px;
  border: 1px solid black;
  /* flex: 2 1; */
  padding: 20px;
  gap: 20px;
  border-radius: 15px;
  & p,
  span {
    font-size: 20px;
  }

  & svg {
    cursor: pointer;
  }
`;

const TaskDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  max-width: 350px;
  gap: 10px;
  transition: all 0.15s linear;
  position: relative;
  pointer-events: ${({ isCompleted }) => (isCompleted ? "none" : "")};
  & p,
  span {
    font-size: 20px;
  }
  & svg {
    cursor: pointer;
  }

  ::after {
    transition: all 0.15s linear;
    content: "";
    width: ${({ isCompleted }) => (isCompleted ? "100%" : 0)};
    position: absolute;
    border-bottom: 2px solid white;
  }
`;

const TaskManagment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 1s linear;
  position: relative;
  & p,
  span {
    /* text-decoration: ${({ isCompleted }) =>
      isCompleted ? "line-through" : ""}; */
    font-size: 20px;
  }

  & svg {
    cursor: pointer;
  }
`;

const TodoChild = ({ element, refetch, width }) => {
  const [isCompleted, setIsCompleted] = useState(element.isCompleted);
  const [showPopup, setShowPopup] = useState(false);
  const [errosMsg, setErrosMsg] = useState();

  useDebounce(isCompleted, 1000, () => {
    todoUpdate({ ...element, isCompleted });
  });

  const deleteSelf = async () => {
    await todoAPIAgent.deleteTodo(element._id).catch((err) => setErrosMsg(err));
    refetch();
  };

  const todoUpdate = async ({ _id, isCompleted, text }) => {
    await todoAPIAgent
      .todoUpdate({ _id, isCompleted, text })
      .catch((err) => setErrosMsg(err));
    setShowPopup(false);
    refetch();
  };
  return (
    <>
      <ToDoListChild>
        <TaskDetails isCompleted={isCompleted}>
          <p>Task : {element.text}</p>
          <AiFillEdit
            size={20}
            onClick={() => {
              setShowPopup(true);
            }}
          />
        </TaskDetails>
        <TaskManagment>
          {isCompleted ? (
            <BiCheckboxChecked
              size={30}
              onClick={() => setIsCompleted(false)}
            />
          ) : (
            <BiCheckbox size={30} onClick={() => setIsCompleted(true)} />
          )}
          <AiFillDelete size={25} onClick={(e) => deleteSelf()} />
        </TaskManagment>
      </ToDoListChild>
      <PopUp
        width={width}
        isOpen={showPopup}
        closeModal={() => setShowPopup(false)}
      >
        <Form
          onSubmit={({ text }) => todoUpdate({ ...element, text })}
          item={element}
          BtnText={"UPDATE"}
        />
      </PopUp>
    </>
  );
};

export default TodoChild;
