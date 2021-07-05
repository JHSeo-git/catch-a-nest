import { pageZoomInStyle, pageZoomOutStyle } from '@/lib/styles/animation';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Modal from '../Modal';

export type PopupBaseProps = {
  visible: boolean;
  children: React.ReactNode;
};

const ANIMATION_ON_INTERVAL = 500;
const ANIMATION_OFF_INTERVAL = 200;

const PopupBase = ({ visible, children }: PopupBaseProps) => {
  const [lazyClosed, setLazyClosed] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (visible) {
      setLazyClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setLazyClosed(true);
      }, ANIMATION_OFF_INTERVAL);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!visible && lazyClosed) return null;

  return (
    <Modal>
      <div css={popupWrapper(visible)}>{children}</div>
    </Modal>
  );
};

const popupWrapper = (visible: boolean) => css`
  width: 25rem;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgb(0, 0, 0, 0.25);
  transform: scale(0);

  ${media.custom(500)} {
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  ${visible
    ? css`
        ${pageZoomInStyle(ANIMATION_ON_INTERVAL, ANIMATION_ON_INTERVAL)}
      `
    : css`
        ${pageZoomOutStyle(ANIMATION_OFF_INTERVAL)}
      `}
`;

export default PopupBase;
