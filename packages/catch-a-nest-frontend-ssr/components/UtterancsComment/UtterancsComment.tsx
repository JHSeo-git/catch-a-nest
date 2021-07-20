// import appConfig from '@/config/app.config';
import { pageFadeInStyle } from '@/lib/styles/animation';
import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import { useUtterances } from '../../hooks/useUtterances';

export type UtterancsCommentProps = {};

const commentNodeId = 'utterancesComment';

const UtterancsComment = (props: UtterancsCommentProps) => {
  useUtterances(commentNodeId);

  return (
    <div css={block}>
      <section id={commentNodeId} />
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
  ${pageFadeInStyle()};
`;

export default UtterancsComment;
