import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { BiCheckboxChecked, BiCheckbox } from "react-icons/bi";
import { useRouter } from "next/router";
import colos from "../configs/colos";
import Form from "../components/Form";

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
  /* flex-wrap: wrap; */
  /* justify-content: center;
  align-items: center; */
  gap: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const ToDoListChild = styled.div`
  display: flex;

  justify-content: space-between;
  /* justify-content: center; */
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
    width: 100%;
  }

  & svg {
    cursor: pointer;
  }
`;

const TaskDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & p,
  span {
    font-size: 20px;
    width: 100%;
  }

  & svg {
    cursor: pointer;
  }
`;

const CheckBox = styled.div`
  display: flex;
  margin: auto;
  cursor: pointer;
  background: white;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 10px;
    transform: rotate(295deg);
    opacity: ${({ isCompleted }) => (isCompleted ? 1 : 0)};
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 3px solid ${colos.blue};
    border-left: 3px solid ${colos.blue};
  }
`;

const PopUpContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  z-index: 1;

  backdrop-filter: blur(10px);
`;

const PopUpContainerInner = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 8px;
  padding: 10px;
  margin: 20px;
  width: 100%;
  /* height: 200px; */
`;

const ClosePopUp = styled.div`
  display: flex;
  width: 100%;
  & > svg {
    margin-left: auto;
    cursor: pointer;
  }
`;

export default function Alona() {
  const [toDoList, setToDoList] = useState([]);
  const [popUpItem, setPopUpItem] = useState({ state: false, value: null });
  const [isCompleted, setIsCompleted] = useState(false);

  const TodoFunction = async () => {
    try {
      setToDoList(
        await axios
          .get(`http://localhost:4000/todo-list`)
          .then((res) => res.data)
          .catch((err) => console.log(err))
      );
    } catch {
      (err) => console.log(err.message);
    }
  };

  const todODelete = async (id) => {
    const itemtoDelete = await axios
      .delete(`http://localhost:4000/todo-list/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setToDoList(toDoList.filter((a) => a.id !== itemtoDelete.id));
  };

  const todoComplete = async (element) => {
    const itemtoUpdate = await axios
      .patch(`http://localhost:4000/todo-list/${element.id}`, {
        isCompleted: !element.isCompleted,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setIsCompleted(!isCompleted);
    setToDoList(
      toDoList.map((curr, _) => {
        if (curr.id == itemtoUpdate.id) {
          return itemtoUpdate;
        }
        return curr;
      })
    );
  };

  const todoAdd = async (value) => {
    console.log(value);
    const itemToAdd = await axios
      .post(`http://localhost:4000/todo-list`, {
        text: value.text,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setToDoList([...toDoList, itemToAdd]);
  };

  useEffect(() => {
    return () => {
      TodoFunction();
    };
  }, []);

  const todoUpdate = async (element, id) => {
    const itemtoUpdate = await axios
      .patch(`http://localhost:4000/todo-list/${id}`, {
        text: element.text,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setPopUpItem({ state: false });
    setToDoList(
      toDoList.map((curr, _) => {
        if (curr.id == itemtoUpdate.id) {
          return itemtoUpdate;
        }
        return curr;
      })
    );
  };

  const PopUp = ({ isPopUp: PopUpItem, setIsPopUp: setPopUpItem }) => {
    return (
      <PopUpContainer>
        <PopUpContainerInner>
          <ClosePopUp>
            <AiOutlineClose
              size={35}
              onClick={() => setPopUpItem({ state: false })}
            />
          </ClosePopUp>

          <Form
            onClick={todoUpdate}
            item={PopUpItem.value}
            BtnText={"UPDATE"}
          />
        </PopUpContainerInner>
      </PopUpContainer>
    );
  };

  return (
    <Container>
      <ContainerInner>
        <h1>To do List</h1>
        <ToDoListChildren>
          {popUpItem.state === true && (
            <PopUp isPopUp={popUpItem} setIsPopUp={setPopUpItem} />
          )}
          {toDoList.map((element, _) => (
            <ToDoListChild key={element.id}>
              <TaskDetails>
                <p>Task : {element.text}</p>
                <AiFillEdit
                  size={20}
                  onClick={() =>
                    setPopUpItem({ state: !popUpItem.state, value: element })
                  }
                />
              </TaskDetails>
              <TaskDetails>
                {element.isCompleted ? (
                  <BiCheckboxChecked
                    size={30}
                    onClick={() => todoComplete(element)}
                  />
                ) : (
                  <BiCheckbox size={30} onClick={() => todoComplete(element)} />
                )}
                <AiFillDelete
                  size={25}
                  onClick={(e) => todODelete(element.id)}
                />
              </TaskDetails>
            </ToDoListChild>
          ))}
        </ToDoListChildren>
        <Form onClick={todoAdd} BtnText={"ADD"} />
      </ContainerInner>
    </Container>
  );
}
