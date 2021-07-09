import ActiveLink from '../ActiveLink';
import AppIcon from '../AppIcon';
import { PostShortInfo } from '@/lib/api/posts/types';
import { css } from '@emotion/react';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';

export type PostFooterProps = {
  isTemp: boolean;
  nextPost?: PostShortInfo;
  prevPost?: PostShortInfo;
};

const PostFooter = ({ isTemp, prevPost, nextPost }: PostFooterProps) => {
  if (isTemp) return null;

  return (
    <div css={block}>
      {prevPost && (
        <ActiveLink css={linkStyle(false)} to={`/posts/${prevPost.url_slug}`}>
          <AppIcon name="arrowLeft" />
          <div className="title-info">
            <div className="label">Prev Post</div>
            <h3 className="title">{prevPost.title}</h3>
          </div>
        </ActiveLink>
      )}
      {nextPost && (
        <ActiveLink css={linkStyle(true)} to={`/posts/${nextPost.url_slug}`}>
          <div className="title-info">
            <div className="label">Next Post</div>
            <h3 className="title">{nextPost.title}</h3>
          </div>
          <AppIcon name="arrowRight" />
        </ActiveLink>
      )}
    </div>
  );
};

const block = css`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a + a {
    margin-left: 2rem;
  }
  ${media.sm} {
    display: block;
    a + a {
      margin: 0;
      margin-top: 2rem;
    }
  }
`;

const linkStyle = (alignEnd = false) => css`
  text-decoration: none;
  border: 1px solid ${palette.blueGrey[100]};
  border-radius: 0.25rem;
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  transition: all 0.1s ease-in-out;

  svg {
    height: 1.25rem;
    margin-right: 1rem;
    color: ${palette.blue[300]};
    transition: all 0.1s ease-in-out;
  }

  .title-info {
    color: ${palette.blueGrey[900]};
    .label {
      line-height: 1;
      font-size: 0.75rem;
      margin-bottom: 0.5rem;

      ${alignEnd &&
      css`
        text-align: right;
      `}
    }
    h3 {
      line-height: 1;
      font-size: 1.5rem;
      margin: 0;

      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    box-shadow: 0 0.25rem 0.5rem rgba(0 0 0 /5%);
    svg {
      transform: translateX(-0.25rem);
      color: ${palette.blue[500]};
    }
  }

  ${alignEnd &&
  css`
    justify-content: flex-end;
    svg {
      margin: 0;
      margin-left: 1rem;
    }
    &:hover {
      svg {
        transform: translateX(0.25rem);
      }
    }
  `}
`;

export default PostFooter;
