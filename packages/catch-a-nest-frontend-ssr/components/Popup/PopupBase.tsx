import useLazyClose from '@/hooks/useLazyClose';
import { useThemeValue } from '@/lib/recoil/appState';
import { pageZoomInStyle, pageZoomOutStyle } from '@/lib/styles/animation';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import Modal from '../Modal';

export type PopupBaseProps = {
  visible: boolean;
  children: React.ReactNode;
  isDelay?: boolean;
};

const ANIMATION_ON_INTERVAL = 500;
const ANIMATION_OFF_INTERVAL = 200;

const PopupBase = ({ visible, children, isDelay = false }: PopupBaseProps) => {
  const theme = useThemeValue();
  const { lazyClosed } = useLazyClose(visible, ANIMATION_OFF_INTERVAL);

  if (!visible && lazyClosed) return null;

  return (
    <Modal>
      <div css={popupWrapper(visible, isDelay, theme === 'DARK')}>
        {children}
      </div>
    </Modal>
  );
};

const popupWrapper = (
  visible: boolean,
  isDelay: boolean,
  isDarkMode: boolean
) => css`
  width: 25rem;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  transform: scale(0);

  ${isDarkMode &&
  css`
    background: ${palette.blueGrey[700]};
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.4);
  `}

  ${media.custom(500)} {
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  ${visible
    ? css`
        ${pageZoomInStyle(
          ANIMATION_ON_INTERVAL,
          isDelay ? ANIMATION_ON_INTERVAL : 0
        )}
      `
    : css`
        ${pageZoomOutStyle(ANIMATION_OFF_INTERVAL)}
      `}
`;

export default PopupBase;
