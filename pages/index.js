import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiCheckboxChecked, BiCheckbox } from "react-icons/bi";
import * as yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/router";

import colos from "../configs/colos";

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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  /* flex-direction: column; */
  border: 1px solid white;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  color: white;
  background-color: ${colos.purble};
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

const AddNewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: 200px;
  margin-top: 20px;
  border-top: 1px solid white;
  padding: 20px;
  gap: 20px;

  & p,
  span {
    font-size: 20px;
    width: 100%;
  }

  & svg {
    cursor: pointer;
  }
`;

const AddNewContainerInner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1 1;
  & input {
    font-size: 20px;
    padding: 10px;
    border-radius: 8px;
    border: none;
  }
`;

const AddNewContainerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
  border-radius: 8px;
  cursor: pointer;
  border: 0.5px solid white;
`;

const InputField = styled.div`
  display: flex;
  position: relative;
`;

const ErrorTag = styled.div`
  color: ${colos.blue};
  font-size: 20px;
  font-weight: 900;
  margin-top: 5px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  text-align: right;
  top: 100%;
  position: absolute;
`;

export default function Home({ toDoList }) {
  const [toDoListItem, setToDoListItem] = useState(toDoList);
  const [isCompleted, setIsCompleted] = useState(false);

  const schema = yup.object().shape({
    text: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const todODelete = async (id) => {
    // const itemtoDelete = await axios
    //   .delete(`${process.env.NEXT_ENVIRONMENT_URL}/todo-list/${id}`)
    //   .then((res) => res.data)
    //   .catch((err) => console.log(err));

    const itemtoDelete = await axios
      .delete(`http://localhost:4000/todo-list/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    console.log(itemtoDelete);

    setToDoListItem(toDoListItem.filter((a) => a.id !== itemtoDelete.id));
  };
  const router = useRouter();
  const todoComplete = async (element) => {
    const itemtoUpdate = await axios
      .patch(`http://localhost:4000/todo-list/${element.id}`, {
        isCompleted: !element.isCompleted,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    router.reload();
    setIsCompleted(!isCompleted);
    setToDoListItem(
      toDoListItem.map((curr, _) => {
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
    setToDoListItem([...toDoListItem, itemToAdd]);
  };

  return (
    <Container>
      <ContainerInner>
        <h1>To do List</h1>
        <ToDoListChildren>
          {toDoList.map((element, _) => (
            <ToDoListChild key={element.id}>
              <TaskDetails>
                <p>Task : {element.text}</p>
                <AiFillEdit size={15} />
              </TaskDetails>
              <TaskDetails>
                {element.isCompleted ? (
                  <BiCheckboxChecked
                    size={50}
                    onClick={() => todoComplete(element)}
                  />
                ) : (
                  <BiCheckbox size={50} onClick={() => todoComplete(element)} />
                )}
                {/* <CheckBox
                  isCompleted={element.isCompleted}
                  onClick={() => todoComplete(element)}
                /> */}

                <AiFillDelete
                  size={50}
                  onClick={(e) => todODelete(element.id)}
                />
              </TaskDetails>
            </ToDoListChild>
          ))}
        </ToDoListChildren>
        <AddNewContainer>
          <p>Add to the todo list</p>

          <Formik
            initialValues={{
              text: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => {
              todoAdd(values);
              console.log(values);
              resetForm({ text: "" });
            }}
            validateOnChange={true}
            validateOnMount={false}
          >
            {({ errors, handleSubmit, handleChange, touched, values }) => (
              <AddNewContainerInner>
                <InputField>
                  <input
                    name="text"
                    type="text"
                    onChange={handleChange}
                    placeholder="ADD ITEM"
                    value={values.text}
                  />
                  {errors.text && touched.text && (
                    <ErrorTag>{errors.text} </ErrorTag>
                  )}
                </InputField>

                <AddNewContainerButton onClick={() => handleSubmit()}>
                  ADD TASK
                  <IoMdAddCircleOutline size={30} />
                </AddNewContainerButton>
              </AddNewContainerInner>
            )}
          </Formik>
        </AddNewContainer>
      </ContainerInner>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const toDoList = await axios
    .get(`${process.env.NEXT_ENVIRONMENT_URL}/todo-list`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      toDoList,
    },
  };
}
