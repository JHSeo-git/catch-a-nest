import React from 'react';
import { css } from '@emotion/react';
import useGetPostBySlugQuery from '@src/hooks/query/useGetPostBySlugQuery';
import palette from '@src/lib/palette';
import { stringToDateMoreDetail } from '@src/lib/utils/dateUtils';
import Viewer from '../Editor/Viewer';
import ErrorInfo from '../ErrorInfo';

export type ReadPostProps = {
  slug: string;
};

const ReadPost = ({ slug }: ReadPostProps) => {
  const { data: post, isError } = useGetPostBySlugQuery(slug);
  // useFullScreenLoaderEffect(isLoading);
  return (
    <section css={postStyle}>
      {isError ? (
        <ErrorInfo />
      ) : (
        post && (
          <>
            <h1 className="title">{post.title}</h1>
            <div className="sub-info">
              <div className="splitter" />
              <p className="date">{stringToDateMoreDetail(post.created_at)}</p>
            </div>
            <Viewer markdown={post.body} />
          </>
        )
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
