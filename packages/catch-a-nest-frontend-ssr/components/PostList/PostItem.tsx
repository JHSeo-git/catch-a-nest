import React from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import ActiveLink from '@/components/ActiveLink';
import { Post } from '@/lib/api/posts/types';
import { getDiffOfNow } from '@/lib/utils/dateUtils';
import palette from '@/lib/styles/palette';
import { humanizeTime } from '@/lib/utils/viewerUtils';
import media from '@/lib/styles/media';
import { useThemeValue } from '@/lib/recoil/appState';

export type PostItemProps = {
  post: Post;
  viewThumbnail?: boolean;
};

const isUpdated = (createdAt: string, updatedAt: string) => {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);

  const diff = updated.getTime() - created.getTime();
  // 하루 미만일 때는 updated 표시 안하도록
  if (diff < 1000 * 60 * 60 * 24) {
    return false;
  }
  return true;
};

const PostItem = ({ post, viewThumbnail = true }: PostItemProps) => {
  const theme = useThemeValue();
  const updatedBy = isUpdated(post.created_at, post.updated_at)
    ? getDiffOfNow(post.updated_at)
    : null;
  return (
    <li css={block}>
      <ActiveLink
        css={itemStyle(theme === 'DARK')}
        to={`/posts/${post.url_slug}`}
      >
        {viewThumbnail && (
          <div css={imageWrapper}>
            {post.thumbnail ? (
              <Image
                css={thumbnailImage}
                src={post.thumbnail}
                alt="post thumbnail"
                layout="fill"
                placeholder={'blur'}
                blurDataURL={post.thumbnail}
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
        )}
        <div css={infoWrapper(theme === 'DARK')}>
          <h4>
            {getDiffOfNow(post.created_at)}
            {post.read_time !== undefined && (
              <>
                <div className="splitter" />
                <span className="readTimeStyle">
                  {humanizeTime(post.read_time)}
                </span>
              </>
            )}
          </h4>
          <h1>{post.title}</h1>
          <p>{post.short_description}</p>
          {updatedBy && (
            <div className="updated">
              <span>updated</span>
              {updatedBy}
            </div>
          )}
        </div>
      </ActiveLink>
    </li>
  );
};

const block = css`
  position: relative;
`;

const itemStyle = (isDarkMode: boolean) => css`
  text-decoration: none;
  height: 8rem;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 0.0625rem solid ${palette.blueGrey[100]};

  ${isDarkMode &&
  css`
    border-color: ${palette.blueGrey[700]};
  `}

  display: flex;
  transition: all 0.1s ease-in-out;
  &:hover {
    box-shadow: 0 0.25rem 0.5rem rgba(0 0 0 /5%);

    ${isDarkMode &&
    css`
      box-shadow: 0 0.25rem 0.5rem rgba(0 0 0 /30%);
    `}
  }
`;

const imageWrapper = css`
  position: relative;
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

const infoWrapper = (isDarkMode: boolean) => css`
  flex: 1;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  h4 {
    margin: 0;
    padding: 0;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    color: ${palette.blueGrey[700]};

    ${isDarkMode &&
    css`
      color: ${palette.grey[100]};
    `}

    display: flex;
    align-items: center;

    .splitter {
      width: 0.25rem;
      height: 0.25rem;
      background: ${palette.blue[500]};
      margin: 0 0.25rem;
      border-radius: 50%;

      ${isDarkMode &&
      css`
        background: ${palette.lightBlue[400]};
      `}
    }

    .readTimeStyle {
      font-style: italic;
      color: ${palette.blue[500]};

      ${isDarkMode &&
      css`
        color: ${palette.lightBlue[400]};
      `}
    }
  }
  h1 {
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
    line-height: 1;
    ${media.sm} {
      font-size: 1.5rem;
    }

    ${isDarkMode &&
    css`
      color: ${palette.grey[200]};
    `}
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

    ${isDarkMode &&
    css`
      color: ${palette.grey[300]};
    `}
  }
  .updated {
    text-align: right;
    margin: 0;
    padding: 0;
    margin-top: auto;
    color: ${palette.blueGrey[700]};
    word-break: break-word;
    font-size: 0.75rem;
    line-height: 1.5;
    font-style: italic;

    ${isDarkMode &&
    css`
      color: ${palette.grey[300]};
    `}

    span {
      margin-right: 0.5rem;
      color: ${palette.red[500]};
      font-size: 0.75rem;
      line-height: 1.5;

      ${isDarkMode &&
      css`
        color: ${palette.red[400]};
      `}
    }
  }
`;

export default PostItem;
