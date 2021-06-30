import React from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import useGetPostBySlug from '@/hooks/useGetPostBySlug';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { stringToDateMoreDetail } from '@/lib/utils/dateUtils';
import { humanizeTime } from '@/lib/utils/viewerUtils';
import PostSkeleton from './PostSkeleton';

export type PostProps = {
  slug: string;
};

const Post = ({ slug }: PostProps) => {
  const { post, error } = useGetPostBySlug(slug);

  // FIXME: error 처리
  if (error) {
    console.log(error);
    return null;
  }

  if (!post) return <PostSkeleton />;

  return (
    <section css={postStyle}>
      <h1 className="title">{post.title}</h1>
      <div className="sub-info">
        <p className="date">{stringToDateMoreDetail(post.created_at)}</p>
        {post.read_time !== undefined && (
          <>
            <div className="splitter" />
            <p className="view readTimeStyle">{humanizeTime(post.read_time)}</p>
          </>
        )}
        <div className="splitter" />
        <p className="view">
          {post.read_count ?? 0} view
          {post.read_count && post.read_count > 1 && 's'}
        </p>
      </div>
      {/* {user && (
        <div className="sub-info">
          <AppButton
            text="DELETE"
            type="thirdary"
            size="small"
            onClick={onDeleteModalOpen}
          />
        </div>
      )} */}
      {post.thumbnail && (
        <div css={thumbnailWrapper}>
          <Image
            quality={100}
            src={post.thumbnail}
            alt="post thumbnail"
            blurDataURL={post.thumbnail}
            width={768}
            height={500}
            objectFit="contain"
            placeholder="blur"
          />
        </div>
      )}
    </section>
  );
};

const postStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 10rem;

  .title {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    font-weight: 900;
    font-size: 3rem;
    color: ${palette.blueGrey[900]};

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
    }
    .readTimeStyle {
      color: ${palette.blue[500]};
      font-style: italic;
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
    }
  }
`;

const thumbnailWrapper = css`
  position: relative;
  margin-bottom: 5em;
  margin: 0 auto;
`;

export default Post;
