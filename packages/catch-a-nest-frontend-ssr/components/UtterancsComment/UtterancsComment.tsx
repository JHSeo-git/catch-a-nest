// import appConfig from '@/config/app.config';
import { pageFadeInStyle, rotateAnimation } from '@/lib/styles/animation';
import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import { useUtterances } from '../../hooks/useUtterances';
import AppIcon from '../AppIcon';

export type UtterancsCommentProps = {};

const UtterancsComment = (props: UtterancsCommentProps) => {
  const ref = useUtterances();

  return (
    <div css={block}>
      <div css={loading}>
        <AppIcon name="spinner" />
      </div>
      <section css={commentBox} ref={ref} />
    </div>
  );
  // return (
  //   <section
  //     ref={(elem) => {
  //       if (!elem) {
  //         return;
  //       }
  //       const scriptElem = document.createElement('script');
  //       scriptElem.src = 'https://utteranc.es/client.js';
  //       scriptElem.async = true;
  //       scriptElem.crossOrigin = 'anonymous';
  //       scriptElem.setAttribute('repo', appConfig.utterances.repo);
  //       scriptElem.setAttribute('issue-term', appConfig.utterances.issueTerm);
  //       scriptElem.setAttribute('label', appConfig.utterances.label);
  //       scriptElem.setAttribute('theme', appConfig.utterances.theme);
  //       elem.appendChild(scriptElem);
  //     }}
  //   />
  // );
};

const block = css`
  position: relative;
  margin-top: 4rem;
  ${pageFadeInStyle()};
`;

const loading = css`
  position: absolute;
  z-index: -1;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  svg {
    width: 3rem;
    height: 3rem;
    animation: ${rotateAnimation} 1s ease-in-out infinite;
    color: ${palette.lightBlue[500]};
  }
`;

const commentBox = css`
  position: absolute;
  background-color: white;
  left: 0;
  top: 0;
  right: 0;
  .utterances {
    width: 100%;
    max-width: 100%;
    .utterances-frame {
    }
  }
`;

export default UtterancsComment;
