import { css } from '@emotion/react';
import { Post } from '@src/lib/api/posts/types';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import { getDiffOfNow } from '@src/lib/utils/dateUtils';
import { Link } from 'react-router-dom';

export type PostItemProps = {
  post: Post;
};

const PostItem = ({ post }: PostItemProps) => {
  return (
    <li css={block}>
      <Link css={itemStyle} to={`/post/${post.url_slug}`}>
        <div css={imageWrapper}>
          {post.thumbnail ? (
            <img
              css={thumbnailImage}
              src={post.thumbnail}
              alt="post thumbnail"
            />
          ) : (
            <div
              css={imageEmptySection(
                palette.colorArray[
                  post.id % palette.colorArray.length
                ]?.[200] ?? palette.blueGrey[200]
              )}
            ></div>
          )}
        </div>
        <div css={infoWrapper}>
          <h4>{getDiffOfNow(post.created_at)}</h4>
          <h2>{post.title}</h2>
          <p>{post.short_description}</p>
        </div>
      </Link>
    </li>
  );
};

const block = css`
  position: relative;
  & + & {
    margin-top: 1rem;
  }
`;

const itemStyle = css`
  text-decoration: none;
  height: 6.6rem;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 0.0625rem solid ${palette.blueGrey[100]};

  display: flex;
  transition: all 0.1s ease-in-out;
  &:hover {
    box-shadow: 0 0.25rem 0.5rem rgba(0 0 0 /5%);
  }
`;

const imageWrapper = css`
  width: 11.25rem;
  ${media.sm} {
    width: 5rem;
  }
`;

const imageEmptySection = (bgColor: string) => css`
  height: 100%;
  background: ${bgColor};
`;

const thumbnailImage = css`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const infoWrapper = css`
  flex: 1;
  padding: 0.5rem 1rem;
  h4 {
    margin: 0;
    padding: 0;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    color: ${palette.blueGrey[700]};
  }
  h2 {
    margin: 0;
    padding: 0;
    margin-bottom: 0.25rem;
    color: ${palette.blueGrey[900]};
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    ${media.sm} {
      font-size: 1.5rem;
    }
  }
  p {
    margin: 0;
    padding: 0;
    color: ${palette.blueGrey[800]};
    word-break: break-word;
    font-size: 0.85rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default PostItem;
