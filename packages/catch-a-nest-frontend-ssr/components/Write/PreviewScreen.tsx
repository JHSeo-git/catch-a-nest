import Headroom from 'react-headroom';
import useLazyClose from '@/hooks/useLazyClose';
import { slideDown, slideUp } from '@/lib/styles/animation';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import { responsiveWidth } from '@/lib/styles/responsive';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import AppIcon from '../AppIcon';
import Modal from '../Modal';
import { useThemeValue } from '@/lib/recoil/appState';

const MarkdownItViewer = dynamic(() => import('../Markdown/MarkdownItViewer'));

export type PreviewScreenProps = {
  visible: boolean;
  markdown: string;
  onClose: () => void;
};

const PreviewScreen = ({ visible, markdown, onClose }: PreviewScreenProps) => {
  const theme = useThemeValue();
  const { lazyClosed } = useLazyClose(visible, 200);

  if (!visible && lazyClosed) return null;

  return (
    <Modal css={modalStyle(visible, theme === 'DARK')}>
      <div css={innerStyle}>
        <div css={headerStyle(theme === 'DARK')}>
          <h1 css={headingStyle}>PREVIEW</h1>
          <button css={closeButton(theme === 'DARK')} onClick={onClose}>
            <AppIcon name="close" />
          </button>
        </div>
        <div css={mdBox}>
          <MarkdownItViewer markdown={markdown} />
        </div>
      </div>
    </Modal>
  );
};

const modalStyle = (visible: boolean, isDarkMode: boolean) => css`
  display: block;
  width: 100%;
  background: #fff;

  ${isDarkMode &&
  css`
    background: ${palette.blueGrey[900]};
  `}

  ${visible
    ? css`
        animation: ${slideUp} 0.2s ease-in-out forwards;
      `
    : css`
        animation: ${slideDown} 0.2s ease-in-out forwards;
      `};
`;

const headerStyle = (isDarkMode: boolean) => css`
  ${responsiveWidth};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  width: 100%;
  background: #fff;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${isDarkMode &&
  css`
    background: ${palette.blueGrey[900]};
  `}
`;

const headingStyle = css`
  margin: 0;
  padding: 0;

  font-size: 2.5rem;
  color: ${palette.blue[500]};

  ${media.sm} {
    font-size: 2rem;
  }
`;

const closeButton = (isDarkMode: boolean) => css`
  ${resetButton}
  cursor: pointer;

  svg {
    color: ${palette.blueGrey[700]};
    width: 1.25rem;
    height: 1.25rem;

    ${isDarkMode &&
    css`
      color: ${palette.grey[100]};
    `}
  }

  ${media.sm} {
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

const innerStyle = css`
  position: relative;
  overflow-y: auto;
  height: 100%;
  padding-top: 4rem;
`;

const mdBox = css`
  ${responsiveWidth};
`;

export default PreviewScreen;
