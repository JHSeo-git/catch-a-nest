import React from 'react';
import { css } from '@emotion/react';
import useGetPostBySlugQuery from '@src/hooks/query/useGetPostBySlugQuery';
import palette from '@src/lib/palette';
import { stringToDateMoreDetail } from '@src/lib/utils/dateUtils';
import PostEditButton from './PostEditButton';
import MarkdownItViewer from '../Editor/MarkdownItViewer';
import { useHistory } from 'react-router';
import media from '@src/lib/styles/media';
import { useUserState } from '@src/states/authState';
import AppButton from '../AppButton';
import useDeletePost from '@src/hooks/useDeletePost';
import { Helmet } from 'react-helmet-async';
import ReadPostSkeleton from './ReadPostSkeleton';
import { useAppModalActions } from '@src/states/appModalState';
import { humanizeTime } from '@src/lib/utils/viewerUtils';
import { isAxiosError } from '@src/lib/utils/isAxiosError';
import PostPageMove from './PostPageMove';

export type ReadPostProps = {
  slug: string;
};

const ReadPost = ({ slug }: ReadPostProps) => {
  const {
    data: post,
    error,
    isLoading,
  } = useGetPostBySlugQuery(slug, {
    retry: 3,
  });
  const [user] = useUserState();
  const { open } = useAppModalActions();
  const { onDelete } = useDeletePost();
  const history = useHistory();

  const onDeleteModalOpen = () => {
    open({
      title: 'Post Delete',
      message: 'Could you delete this post?',
      onConfirm: () => {
        onDelete(slug, true);
      },
    });
  };

  const url = `https://seonest.net/post/${slug}`;

  if (!post || isLoading) return <ReadPostSkeleton />;

  // TODO: Refactoring to appBoundary
  if (error) {
    if (isAxiosError(error)) {
      const errorUrl = error.response?.status
        ? `/error?status=${error.response.status}`
        : `/error`;
      history.replace(errorUrl);
    } else {
      throw error;
    }
  }

  return (
    <>
      <Helmet>
        <title>{post.title} – Seo Nest</title>
        {post.short_description && (
          <meta name="description" content={post.short_description} />
        )}
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.short_description ?? post.body.slice(0, 150)}
        />
        <meta property="og:url" content={url} />
        {post.thumbnail && (
          <meta property="og:image" content={post.thumbnail} />
        )}
      </Helmet>
      <section css={postStyle}>
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
        {user && (
          <div className="sub-info">
            <AppButton
              text="DELETE"
              type="thirdary"
              size="small"
              onClick={onDeleteModalOpen}
            />
          </div>
        )}
        {post.thumbnail && (
          <div css={thumbnailWrapper}>
            <img src={post.thumbnail} alt="thumbnail" />
          </div>
        )}
        <MarkdownItViewer markdown={post.body} />
        <PostPageMove nextPost={post.next_post} prevPost={post.prev_post} />
        <PostEditButton slug={post.url_slug} />
      </section>
    </>
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
  margin-bottom: 5em;
  img {
    display: block;
    width: auto;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    object-fit: cover;
  }
`;

export default ReadPost;
