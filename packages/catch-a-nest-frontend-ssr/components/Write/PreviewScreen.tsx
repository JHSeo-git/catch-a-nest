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

const MarkdownItViewer = dynamic(() => import('../Markdown/MarkdownItViewer'));

export type PreviewScreenProps = {
  visible: boolean;
  markdown: string;
  onClose: () => void;
};

const PreviewScreen = ({ visible, markdown, onClose }: PreviewScreenProps) => {
  const { lazyClosed } = useLazyClose(visible, 200);

  if (!visible && lazyClosed) return null;

  return (
    <Modal css={modalStyle(visible)}>
      <div css={innerStyle}>
        <h1 css={headerStyle}>Markdown Preview</h1>
        <MarkdownItViewer markdown={markdown} />
      </div>
      <button css={closeButton} onClick={onClose}>
        <AppIcon name="close" />
      </button>
    </Modal>
  );
};

const modalStyle = (visible: boolean) => css`
  display: block;
  width: 100%;
  background: #fff;
  padding: 0 1rem 1rem 1rem;
  ${visible
    ? css`
        animation: ${slideUp} 0.2s ease-in-out forwards;
      `
    : css`
        animation: ${slideDown} 0.2s ease-in-out forwards;
      `};
`;

const headerStyle = css`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  color: ${palette.blue[500]};
  border-bottom: 0.125rem solid ${palette.blue[500]};

  ${media.sm} {
    font-size: 2rem;
  }
`;

const innerStyle = css`
  ${responsiveWidth};
  padding-left: 1rem;
  padding-right: 1rem;
  overflow-y: auto;
  height: 100%;
`;

const closeButton = css`
  ${resetButton}
  cursor: pointer;
  position: fixed;
  top: 2rem;
  right: 2rem;

  svg {
    color: ${palette.blueGrey[700]};
    width: 1.5rem;
    height: 1.5rem;
  }

  ${media.sm} {
    right: 1rem;
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export default PreviewScreen;
