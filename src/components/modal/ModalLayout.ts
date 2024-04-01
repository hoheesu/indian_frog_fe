import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalLayout = ({ children }: ModalPortalProps) => {
  const el = document.getElementById('modal-root') as HTMLElement;
  return ReactDOM.createPortal(children, el);
};

export default ModalLayout;
