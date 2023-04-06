import React, { ReactNode } from 'react';
import './Modal.scss';

interface ModalProps {
  active: boolean;
  setActive: any;
  children?: ReactNode;
}

export function Modal(props: ModalProps) {
  return (
    <div
      className={props.active ? 'modal active' : 'modal'}
      onClick={() => props.setActive(false)}
    >
      <div
        className={props.active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}
