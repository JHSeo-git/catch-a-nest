import { css } from '@emotion/react';
import { PostShortInfo } from '@src/lib/api/posts/types';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import { Link } from 'react-router-dom';
import AppIcon from '../AppIcon';

export type PostPageMoveProps = {
  nextPost?: PostShortInfo;
  prevPost?: PostShortInfo;
};
const PostPageMove = ({ nextPost, prevPost }: PostPageMoveProps) => {
  return (
    <div css={block}>
      {prevPost && (
        <Link css={linkStyle(false)} to={`/post/${prevPost.url_slug}`}>
          <AppIcon name="arrowLeft" />
          <div className="title-info">
            <div className="label">Prev Post</div>
            <h3 className="title">{prevPost.title}</h3>
          </div>
        </Link>
      )}
      {nextPost && (
        <Link css={linkStyle(true)} to={`/post/${nextPost.url_slug}`}>
          <div className="title-info">
            <div className="label">Next Post</div>
            <h3 className="title">{nextPost.title}</h3>
          </div>
          <AppIcon name="arrowRight" />
        </Link>
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

export default PostPageMove;
