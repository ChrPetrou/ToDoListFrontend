import React, { Children } from "react";
import styled from "styled-components";
import colos from "../configs/colos";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${colos.lightGrey};
`;
const Layout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
