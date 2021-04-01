import { css } from '@emotion/react';
import zIndex from '@src/lib/styles/zIndex';

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
  background: rgba(0, 0, 0, 0.4);
  ${zIndex.modal};
`;

export default Modal;
