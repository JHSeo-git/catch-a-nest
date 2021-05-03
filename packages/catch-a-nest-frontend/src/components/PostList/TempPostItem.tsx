import React from 'react';
import { css } from '@emotion/react';
import { Post } from '@src/lib/api/posts/types';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import { resetButton } from '@src/lib/styles/resetButton';
import { getDiffOfNow } from '@src/lib/utils/dateUtils';
import { Link } from 'react-router-dom';
import useDeletePost from '@src/hooks/useDeletePost';
import { useAppModalActions } from '@src/states/appModalState';

export type TempPostItemProps = {
  post: Post;
};

const TempPostItem = ({ post }: TempPostItemProps) => {
  const { onDelete } = useDeletePost();
  const { open } = useAppModalActions();

  const onDeleteModalOpen = () => {
    open({
      title: 'Temp Post Delete',
      message: 'Could you delete this temp post?',
      onConfirm: () => {
        onDelete(post.url_slug);
      },
    });
  };

  return (
    <>
      <li css={block}>
        <div css={itemStyle}>
          <div css={infoWrapper}>
            <h4>{getDiffOfNow(post.updated_at)}</h4>
            <Link css={linkStyle} to={`/post/${post.url_slug}`}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </Link>
            <button onClick={onDeleteModalOpen}>DELETE</button>
          </div>
        </div>
      </li>
    </>
  );
};

const block = css`
  & + & {
    margin-top: 1rem;
  }
`;

const itemStyle = css`
  height: 6.6rem;
  overflow: hidden;
  border-bottom: 0.0625rem solid ${palette.blueGrey[100]};

  display: flex;
`;

const linkStyle = css`
  text-decoration: none;
  text-decoration-color: ${palette.blueGrey[900]};

  transition: all 0.1s ease-in-out;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${palette.blueGrey[900]};
  }
  &:active {
    text-decoration-color: ${palette.blueGrey[900]};
  }
`;

const infoWrapper = css`
  flex: 1;
  padding: 0.5rem 1rem;
  padding-right: 3rem;
  position: relative;
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
  button {
    ${resetButton}
    cursor: pointer;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    color: ${palette.blueGrey[800]};
    word-break: break-word;
    font-size: 0.85rem;
    line-height: 1.5;
    &:hover {
      text-decoration: underline;
      color: ${palette.red[700]};
    }
  }
`;

export default TempPostItem;
