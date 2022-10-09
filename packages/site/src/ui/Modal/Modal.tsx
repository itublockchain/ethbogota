/* eslint-disable */
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ReactNode, useEffect } from 'react';
import { Icon } from '../Icon/Icon';
import { clsnm } from '../../utils/clsnm';
import styles from './Modal.module.scss';
import styled from 'styled-components';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
  closeOnClickOutside?: boolean;
  className?: string;
  width?: string;
};

const Wrapper = styled.div`
  z-index: 100000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s linear;
`;

const Inside = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.snapshot} !important;
  border: 1px solid rgb(98, 98, 98);
  border-radius: 12px;
  padding: 1.5rem;
  padding-top: 2.5rem;
  box-shadow: rgb(98, 98, 98);
  animation: main 0.2s linear;
  color: ${({ theme }) => theme.colors.text.default};
  background-color: ${({ theme }) => theme.colors.border.snapshot};
`;

const Modal = ({
  children,
  isOpen,
  close,
  closeOnClickOutside = true,
  className,
  width,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const closeModal = (e: any) => {
      if (e.keyCode === 27) {
        close();
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  const outsideRef = useOnClickOutside<HTMLDivElement>(() => {
    if (closeOnClickOutside) {
      close();
    }
  });

  return isOpen ? (
    <Wrapper style={{ animationTimingFunction: 'linear' }}>
      <Inside
        ref={outsideRef}
        style={{
          width: width,
        }}
      >
        <Icon
          hoverable
          onClick={() => {
            close();
          }}
          className={styles.close}
          borderRadius="50%"
        >
          x
        </Icon>
        {children}
      </Inside>
    </Wrapper>
  ) : null;
};

export { Modal };
