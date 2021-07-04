import zIndex from '@/lib/styles/zIndex';
import { css } from '@emotion/react';

export type ModalProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Modal = ({ children, ...rest }: ModalProps) => {
  return (
    <div css={modalStyle} {...rest}>
      {children}
    </div>
  );
};

const modalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  ${zIndex.modal};
`;

export default Modal;
