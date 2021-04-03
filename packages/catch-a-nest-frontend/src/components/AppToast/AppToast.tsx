import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export type AppToastProps = {} & ToastContainerProps;

const AppToast = ({ ...rest }: AppToastProps) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      pauseOnHover
      pauseOnFocusLoss={false}
      {...rest}
    />
  );
};

export default AppToast;
