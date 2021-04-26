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
import OKCancelModal from '../Modal/OKCancelModal';
import { Helmet } from 'react-helmet-async';
import ReadPostSkeleton from './ReadPostSkeleton';

export type ReadPostProps = {
  slug: string;
};

const ReadPost = ({ slug }: ReadPostProps) => {
  const [user] = useUserState();
  const { data: post, isError, isLoading } = useGetPostBySlugQuery(slug);
  const {
    onDelete,
    onDeleteModal,
    deleteModal,
    onCancelModal,
    loading,
  } = useDeletePost();
  const history = useHistory();
  // useFullScreenLoaderEffect(isLoading);
  if (isError) {
    history.push('/error?status=404');
  }
  const onDeleteOKClick = () => {
    onDelete(slug, true);
  };

  const url = `https://seonest.net/post/${slug}`;

  // TODO: skeleton
  if (!post || isLoading) return <ReadPostSkeleton />;

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
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
        </div>
        {user && (
          <div className="sub-info">
            <AppButton
              text="DELETE"
              type="thirdary"
              size="small"
              onClick={onDeleteModal}
            />
          </div>
        )}
        {post.thumbnail && (
          <div css={thumbnailWrapper}>
            <img src={post.thumbnail} alt="thumbnail" />
          </div>
        )}
        <MarkdownItViewer markdown={post.body} />
        <PostEditButton slug={post.url_slug} />
      </section>
      <OKCancelModal
        view={deleteModal}
        title="Post Delete"
        onClick={onDeleteOKClick}
        onCancel={onCancelModal}
        loading={loading}
      />
    </>
  );
};

const postStyle = css`
  display: flex;
  flex-direction: column;

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

    .date {
      font-size: 0.85rem;
      margin: 0;
      padding: 0;
      color: ${palette.blueGrey[700]};
      text-align: right;
      line-height: 1;
      margin-left: 1rem;
    }
    .splitter {
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
