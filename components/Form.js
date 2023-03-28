import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import styled from "styled-components";
import colos from "../configs/colos";
import { IoMdAddCircleOutline } from "react-icons/io";
const AddNewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: 200px;
  margin-top: 20px;
  border-top: 1px solid white;
  padding: 20px 0;
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

const Form = ({ BtnText, onClick, item }) => {
  const schema = yup.object().shape({
    text: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <AddNewContainer>
      <Formik
        initialValues={{
          text: item ? item?.text : "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          onClick(values, item?.id);
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
                placeholder={`${BtnText} ITEM`}
                value={values.text}
              />
              {errors.text && touched.text && (
                <ErrorTag>{errors.text} </ErrorTag>
              )}
            </InputField>

            <AddNewContainerButton onClick={() => handleSubmit()}>
              {BtnText} TASK
              <IoMdAddCircleOutline size={30} />
            </AddNewContainerButton>
          </AddNewContainerInner>
        )}
      </Formik>
    </AddNewContainer>
  );
};

export default Form;
