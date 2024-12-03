import styled, { keyframes } from "styled-components";

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) => (type === "success" ? "#558C8C" : "#82204A")};
  color: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: ${({ isExiting }) =>
      isExiting ? slideOutToRight : slideInFromRight}
    0.5s ease;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NotificationText = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
