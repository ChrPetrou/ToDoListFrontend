import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import styled from "styled-components";
import colos from "../configs/colos";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const FormContainerInner = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  flex: 1 1;
  & input {
    width: 100%;
    font-size: 20px;
    padding: 10px;
    border-radius: 8px;
    border: none;
    background: ${({ backgroundClr }) => backgroundClr};
    color: ${({ textClr }) => textClr};
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const ErrorTag = styled.div`
  color: ${colos.tomato};
  font-size: 20px;
  font-weight: 900;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  text-align: right;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  margin: auto;
  cursor: pointer;
  border: 0.5px solid white;
  transition: all 0.15s linear;
  background: ${({ buttonBg }) => buttonBg};
  color: ${({ buttonText }) => buttonText};
  :hover {
    background: rgba(9, 43, 95, 0.5);
  }
`;

export const SignForm = ({ onSubmit }) => {
  const SignUpSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(3, "Password is too short").required("Required"),
  });

  return (
    <FormContainer>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          onSubmit(values);
          // console.log(email, password);
        }}
        validateOnChange={true}
        validateOnMount={false}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <FormContainerInner>
            <InputField>
              <input
                autoComplete="off"
                name="email"
                type="email"
                onChange={handleChange}
                placeholder={`Email`}
                value={values.email}
              />
              {errors.email && touched.email && (
                <ErrorTag>{errors.email} </ErrorTag>
              )}
            </InputField>
            <InputField>
              <input
                autoComplete="off"
                name="password"
                type="password"
                onChange={handleChange}
                placeholder={`Password`}
                value={values.password}
              />
              {errors.password && touched.password && (
                <ErrorTag>{errors.password} </ErrorTag>
              )}
            </InputField>
            <Button onClick={() => handleSubmit()}>Sign in</Button>
          </FormContainerInner>
        )}
      </Formik>
    </FormContainer>
  );
};

export const SignUpForm = ({ onSubmit }) => {
  const SignUpSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(3, "Password is too short").required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  return (
    <FormContainer>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        validateOnChange={true}
        validateOnMount={false}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <FormContainerInner
            backgroundClr={colos.purble}
            textClr={colos.lightGrey}
          >
            <InputField>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder={`Email`}
                value={values.email}
              />
              {errors.email && touched.email && (
                <ErrorTag>{errors.email} </ErrorTag>
              )}
            </InputField>
            <InputField>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder={`Password`}
                value={values.password}
              />
              {errors.password && touched.password && (
                <ErrorTag>{errors.password} </ErrorTag>
              )}
            </InputField>
            <InputField>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                placeholder={`Confirm Password`}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <ErrorTag>{errors.confirmPassword} </ErrorTag>
              )}
            </InputField>
            <Button
              buttonBg={colos.purble}
              buttonText={colos.lightGrey}
              onClick={() => handleSubmit()}
            >
              Sign up
            </Button>
          </FormContainerInner>
        )}
      </Formik>
    </FormContainer>
  );
};
