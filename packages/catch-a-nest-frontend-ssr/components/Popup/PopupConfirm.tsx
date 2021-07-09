import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import AppButton from '../AppButton';

const PopupBase = dynamic(() => import('./PopupBase'));

export type PopupConfirmProps = {
  visible: boolean;
  title: string;
  message?: string;
  onCancel?: () => void;
  onOK: () => void;
  openDelay?: boolean;
};

const PopupConfirm = ({
  visible,
  message,
  onCancel,
  onOK,
  title,
  openDelay = false,
}: PopupConfirmProps) => {
  return (
    <PopupBase visible={visible} isDelay={openDelay}>
      <h1 css={titleStyle}>{title}</h1>
      {message && <p css={messageStyle}>{message}</p>}
      <div css={buttonGroup}>
        {onCancel && (
          <AppButton text="CANCEL" type="normal" onClick={onCancel} />
        )}
        <AppButton text="OK" type="thirdary" onClick={onOK} />
      </div>
    </PopupBase>
  );
};

const titleStyle = css`
  margin: 0;
  margin-bottom: 2rem;
  color: ${palette.blueGrey[900]};
`;

const messageStyle = css`
  margin: 0;
  padding: 0;
  font-size: 1rem;
`;

const buttonGroup = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  button + button {
    margin-left: 1rem;
  }
`;

export default PopupConfirm;
