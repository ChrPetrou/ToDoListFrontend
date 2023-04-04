import { getCookie, hasCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { Children, useEffect, useState } from "react";
import styled from "styled-components";
import colos from "../configs/colos";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${colos.lightGrey};
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 50px;
  padding: 30px;
  top: 0;
  border-bottom: 1px solid ${colos.grey};
`;

const LogOutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 5px;
  margin-left: auto;
  width: 100px;
  cursor: pointer;
  border: 1px solid red;
  transition: all 0.3s linear;
  :hover {
    background: red;
    color: white;
  }
`;

const Layout = ({ children }) => {
  const router = useRouter();
  const handleCookie = () => {
    removeCookies("token");
    router.push("/");
  };

  return (
    <Container>
      {hasCookie("token") && (
        <NavBar>
          <LogOutBtn onClick={() => handleCookie()}>Log out</LogOutBtn>
        </NavBar>
      )}

      {children}
    </Container>
  );
};

export default Layout;
