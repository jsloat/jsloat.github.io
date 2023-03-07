import React, { useState } from "react";
import styled from "styled-components/macro";
import { useKeyListener } from "./utils";

const setBodyOverflow = (value: string) => {
  const bodyEl = document.querySelector("body");
  if (!bodyEl) throw new Error("No body knows");
  bodyEl.style.overflow = value;
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: 100vh;
  filter: blur(1%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0 0 0 / 30%);
  z-index: 999;
`;

const DialogClickShield = styled.div`
  min-width: 300px;
  width: 50%;
  max-width: 500px;
`;

type UseModalReturns = {
  Modal: React.FC<React.PropsWithChildren>;
  setIsModalActive: (isActive: boolean) => void;
};

export const useModal = (): UseModalReturns => {
  const [isModalActive, setIsModalActive] = useState(false);
  const setIsActiveWithSideEffects = (isActive: boolean) => {
    setIsModalActive(isActive);
    setBodyOverflow(isActive ? "hidden" : "auto");
  };
  return {
    setIsModalActive: setIsActiveWithSideEffects,
    Modal: ({ children }) => {
      if (!isModalActive) return null;
      useKeyListener(["Escape"], () => setIsActiveWithSideEffects(false));
      return (
        <Backdrop onClick={() => setIsActiveWithSideEffects(false)}>
          <DialogClickShield onClick={e => e.stopPropagation()}>
            {children}
          </DialogClickShield>
        </Backdrop>
      );
    },
  };
};
