import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import { ToastContainer, ToastContainerProps, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export type AppToastProviderProps = {} & ToastContainerProps;

const AppToastProvider = ({ ...rest }: AppToastProviderProps) => {
  return (
    <ToastContainer
      css={toastStyle}
      position="top-right"
      autoClose={4000}
      pauseOnHover
      pauseOnFocusLoss={false}
      closeButton={false}
      transition={Flip}
      {...rest}
    />
  );
};

const toastStyle = css`
  .Toastify__toast {
    font-family: inherit;
    font-weight: 500;
    &--success {
      /* background-color: ${palette.teal[600]}; */
    }
    &--error {
      background-color: ${palette.deepOrange[600]};
    }
    &--info {
      background-color: ${palette.lightBlue[600]};
    }
  }
`;

export default AppToastProvider;
