import { styled } from '@stitches.js';

export type ModalProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Box>;

const Modal = ({ children, css, ...rest }: ModalProps) => {
  return <Box {...rest}>{children}</Box>;
};

const Box = styled('div', {
  position: 'fixed',
  inset: 0,
  zIndex: '$modal',

  display: 'flex',
  jc: 'center',
  ai: 'center',
});

export default Modal;
