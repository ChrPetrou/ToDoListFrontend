import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

// const PopUpBg = styled.div`
//   position: fixed;
//   z-index: 1;
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   left: 0;
//   z-index: 10;
//   backdrop-filter: blur(10px);
// `;

const PopUpContainer = styled.div`
  display: flex;
  backdrop-filter: blur(10px);
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
`;

const PopUpContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  max-width: ${({ maxWidth }) => maxWidth + "px"};
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  margin: 20px;
  width: 100%;
`;

const ClosePopUp = styled.div`
  display: flex;
  width: 100%;
  & > svg {
    margin-left: auto;
    cursor: pointer;
  }
`;
const PopUp = ({ isOpen, closeModal, children, width }) => {
  if (!isOpen) return null;
  return (
    <PopUpContainer onClick={() => closeModal()}>
      <PopUpContainerInner
        maxWidth={width}
        onClick={(e) => e.stopPropagation()}
      >
        <ClosePopUp onClick={() => closeModal()}>
          <AiOutlineClose size={35} />
        </ClosePopUp>
        {children}
      </PopUpContainerInner>
    </PopUpContainer>
  );
};

export default PopUp;
