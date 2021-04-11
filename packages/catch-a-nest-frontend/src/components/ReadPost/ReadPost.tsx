import React from 'react';
import { css } from '@emotion/react';
import useGetPostBySlugQuery from '@src/hooks/query/useGetPostBySlugQuery';
import palette from '@src/lib/palette';
import { stringToDateMoreDetail } from '@src/lib/utils/dateUtils';
import PostEditButton from './PostEditButton';
import MarkdownItViewer from '../Editor/MarkdownItViewer';
import { useHistory } from 'react-router';

export type ReadPostProps = {
  slug: string;
};

const ReadPost = ({ slug }: ReadPostProps) => {
  const { data: post, isError } = useGetPostBySlugQuery(slug);
  const history = useHistory();
  // useFullScreenLoaderEffect(isLoading);
  if (isError) {
    history.push('/error?status=404');
  }
  return (
    <section css={postStyle}>
      {post && (
        <>
          <h1 className="title">{post.title}</h1>
          <div className="sub-info">
            <div className="splitter" />
            <p className="date">{stringToDateMoreDetail(post.created_at)}</p>
          </div>
          <MarkdownItViewer markdown={post.body} />
          <PostEditButton slug={post.url_slug} />
        </>
      )}
    </section>
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
  }

  .sub-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 2rem;

    .date {
      font-size: 0.85rem;
      margin: 0;
      padding: 0;
      color: ${palette.blueGrey[700]};
      text-align: right;
      line-height: 1;
    }
    .splitter {
      /* flex: 1;
      margin-right: 5rem;
      height: 0.125rem;
      background: ${palette.blueGrey[100]}; */
    }
  }
`;

export default ReadPost;
