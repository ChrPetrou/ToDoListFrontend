import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import colos from "../configs/colos";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import todoAPIAgent from "../util/todoAPIAgent";

import { UserAPIAgent } from "../util/userAPIAgent";
import { SignUpForm, SignForm } from "../components/SignForms";

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
  height: 600px;
  padding: 30px 20px;
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
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  overflow: hidden;
  cursor: pointer;
  align-items: ${({ isToggle }) => (isToggle ? "center" : "flex-start")};
  justify-content: center;
  border-radius: ${({ isToggle }) => (isToggle ? "0px" : "100% 100% 0 0")};
  position: absolute;
  bottom: 0;
  background: white;
  padding: 0 30px;
  transition: all 0.25s linear;
  width: 100%;
  height: ${({ isToggle }) => (isToggle ? "100%" : "50px")};
  color: ${colos.purble};
`;

const SignUpContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  cursor: ${({ isToggle }) => (isToggle ? "default" : "pointer")};
  color: ${colos.purble};
`;

const SignUp = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [errosMsg, setErrosMsg] = useState("");
  const route = useRouter();
  const signUpFunction = async (value) => {
    try {
      const user = await UserAPIAgent.signUp(value);
      // localStorage.setItem("User", JSON.stringify(user.user));
      console.log(user);
      setCookie("token", user?.token_id, {
        expires: new Date(user?.expire_at),
      });
      route.push("/todos");
    } catch (err) {
      setErrosMsg(err?.response?.data?.message);
      console.log(err);
    }
  };

  return (
    <SignUpContainer isToggle={isToggle} onClick={() => setIsToggle(!isToggle)}>
      <SignUpContainerInner
        isToggle={isToggle}
        onClick={(e) => isToggle && e.stopPropagation()}
      >
        <h1> Sign Up</h1>
        <SignUpForm onSubmit={signUpFunction} />
      </SignUpContainerInner>
    </SignUpContainer>
  );
};

export default function Index() {
  const [toDoList, setToDoList] = useState([]);
  const [errosMsg, setErrosMsg] = useState("");
  const route = useRouter();
  const ref = useRef();

  const signInFunction = async (value) => {
    try {
      const user = await UserAPIAgent.signIn(value);
      // localStorage.setItem("User", JSON.stringify(user.user));
      console.log(user);
      setCookie("token", user?.tokenId, {
        expires: new Date(user?.tokenExpire),
      });
      route.push("/todos");
    } catch (err) {
      setErrosMsg(err?.response?.data?.message);
      console.log(err);
    }
  };

  return (
    <Container>
      <ContainerInner ref={ref}>
        <h1>Sign In</h1>
        <SignForm onSubmit={signInFunction} />
        {errosMsg && <p>{errosMsg}</p>}
        <SignUp />
      </ContainerInner>
    </Container>
  );
}
