import React, { useState } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import { Post } from '@/lib/api/posts/types';
import { useUserValue } from '@/lib/recoil/authState';
import { stringToDateMoreDetail } from '@/lib/utils/dateUtils';
import { humanizeTime } from '@/lib/utils/viewerUtils';
import palette from '@/lib/styles/palette';
import media from '@/lib/styles/media';
import AppButton from '../AppButton';
import useDeletePost from '@/hooks/useDeletePost';
import { useRouter } from 'next/router';
import PopupConfirm from '../Popup/PopupConfirm';
import { useThemeValue } from '@/lib/recoil/appState';

export type PostHeaderProps = {
  post: Post;
};

const PostHeader = ({ post }: PostHeaderProps) => {
  const router = useRouter();
  const theme = useThemeValue();
  const userState = useUserValue();
  const { deletePost } = useDeletePost();

  const [visiblePopup, setVisiblePopup] = useState(false);
  const onOK = async (slug: string) => {
    await deletePost(slug);
    setVisiblePopup(false);
    router.back();
  };

  // TODO: Image blur placeholder lib 사용해보기

  return (
    <>
      <section css={postStyle(theme === 'DARK')}>
        <h1 className="title">{post.title}</h1>
        <div className="sub-info">
          <p className="date">{stringToDateMoreDetail(post.created_at)}</p>
          {post.read_time !== undefined && (
            <>
              <div className="splitter" />
              <p className="view readTimeStyle">
                {humanizeTime(post.read_time)}
              </p>
            </>
          )}
          <div className="splitter" />
          <p className="view">
            {post.read_count ?? 0} view
            {post.read_count && post.read_count > 1 && 's'}
          </p>
        </div>
        {userState && (
          <div className="sub-info">
            <AppButton
              text="DELETE"
              type="thirdary"
              size="small"
              preIconName="remove"
              onClick={() => setVisiblePopup(true)}
            />
          </div>
        )}
        {post.thumbnail && (
          <div css={thumbnailWrapper}>
            <Image
              css={imageStyle}
              quality={100}
              src={post.thumbnail}
              alt="post thumbnail"
              width={768}
              height={500}
              objectFit="contain"
              placeholder="empty"
            />
          </div>
        )}
      </section>
      <PopupConfirm
        visible={visiblePopup}
        title="Delete Post?"
        onCancel={() => setVisiblePopup(false)}
        onOK={() => onOK(post.url_slug)}
        openDelay={false}
      />
    </>
  );
};

const postStyle = (isDarkMode: boolean) => css`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  .title {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    font-weight: 900;
    font-size: 3rem;
    color: ${palette.blueGrey[900]};

    ${isDarkMode &&
    css`
      color: ${palette.grey[100]};
    `}

    ${media.md} {
      font-size: 2.25rem;
    }
  }

  .sub-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;

    .date,
    .view {
      font-size: 0.85rem;
      margin: 0;
      padding: 0;
      color: ${palette.blueGrey[700]};
      text-align: right;
      line-height: 1;

      ${isDarkMode &&
      css`
        color: ${palette.grey[300]};
      `}
    }
    .readTimeStyle {
      color: ${palette.blue[500]};
      font-style: italic;

      ${isDarkMode &&
      css`
        color: ${palette.lightBlue[400]};
      `}
    }
    .splitter {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      background-color: ${palette.blue[500]};
      /* flex: 1;
      margin-right: 5rem;
      height: 0.125rem;
      background: ${palette.blueGrey[100]}; */

      ${isDarkMode &&
      css`
        background-color: ${palette.lightBlue[400]};
      `}
    }
  }
`;

const thumbnailWrapper = css`
  position: relative;
  margin-bottom: 5em;
  margin: 0 auto;
`;

const imageStyle = css`
  display: block;
  width: auto;
  margin: 0px auto;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export default PostHeader;
