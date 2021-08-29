import { useThemeValue } from '@/lib/recoil/appState';
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
  const theme = useThemeValue();

  return (
    <PopupBase visible={visible} isDelay={openDelay}>
      <h1 css={titleStyle(theme === 'DARK')}>{title}</h1>
      {message && <p css={messageStyle(theme === 'DARK')}>{message}</p>}
      <div css={buttonGroup}>
        {onCancel && (
          <AppButton text="CANCEL" type="normal" onClick={onCancel} />
        )}
        <AppButton text="OK" type="thirdary" onClick={onOK} />
      </div>
    </PopupBase>
  );
};

const titleStyle = (isDarkMode: boolean) => css`
  margin: 0;
  margin-bottom: 2rem;
  color: ${palette.blueGrey[900]};

  ${isDarkMode &&
  css`
    color: ${palette.grey[50]};
  `}
`;

const messageStyle = (isDarkMode: boolean) => css`
  margin: 0;
  padding: 0;
  font-size: 1rem;

  ${isDarkMode &&
  css`
    color: ${palette.grey[50]};
  `}
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
