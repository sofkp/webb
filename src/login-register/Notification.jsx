import React, { useState, useEffect } from "react";
import * as Styled from "./Notification-style";

const Notification = ({ message, type = "success", onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsExiting(true), 5000);
    const removeTimeout = setTimeout(onClose, 5500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(removeTimeout);
    };
  }, [onClose]);

  return (
    <Styled.NotificationContainer type={type} isExiting={isExiting}>
      <Styled.NotificationText>{message}</Styled.NotificationText>
      <Styled.CloseButton onClick={onClose}>×</Styled.CloseButton>
    </Styled.NotificationContainer>
  );
};

export default Notification;
