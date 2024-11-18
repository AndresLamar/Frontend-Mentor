import './Dialog.css';
import React, { useEffect, useRef } from 'react';

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

export const Dialog: React.FC<ModalProps> = ({ closeModal, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Abre la modal automáticamente al montar el componente
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

    // Limpiar al desmontar el componente
    // return () => {
    //   closeModal();
    // };
  }, [closeModal]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (event.target === dialogRef.current) {
      closeModal();
    }
  };

  return ( 
    <dialog
      ref={dialogRef}
      className="overlay"
      onClick={handleOutsideClick}
    >
        {children}
    </dialog>
  );
};
