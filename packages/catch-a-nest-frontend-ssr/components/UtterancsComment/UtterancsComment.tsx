// import appConfig from '@/config/app.config';
import { pageFadeInStyle } from '@/lib/styles/animation';
import { css } from '@emotion/react';
import { useUtterances } from '../../hooks/useUtterances';

export type UtterancsCommentProps = {};

const UtterancsComment = (props: UtterancsCommentProps) => {
  const ref = useUtterances();

  return (
    <div css={block}>
      <section ref={ref} />
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
  margin-top: 4rem;
  transition: all 0.5s ease-in-out;
  ${pageFadeInStyle()};

  .utterances {
    width: 100%;
    max-width: 100%;
    .utterances-frame {
    }
  }
`;

export default UtterancsComment;
