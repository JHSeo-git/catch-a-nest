import React from 'react';
import { css } from '@emotion/react';
import useGetPostBySlugQuery from '@src/hooks/query/useGetPostBySlugQuery';
import palette from '@src/lib/palette';
import { responsiveWidth } from '@src/lib/styles/responsive';
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
            <p className="date">{stringToDateMoreDetail(post.created_at)}</p>
            <Viewer markdown={post.body} />
            <div css={marginStyle} />
          </>
        )
      )}
    </section>
  );
};

const postStyle = css`
  ${responsiveWidth};
  min-height: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  .title {
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
    line-height: 1.5;
    font-weight: 900;
    font-size: 3rem;
    color: ${palette.blueGrey[900]};
  }
  .date {
    font-size: 0.85rem;
    margin: 0;
    padding: 0;
    color: ${palette.blueGrey[700]};
    text-align: right;
    margin-bottom: 2rem;
  }
`;

const marginStyle = css`
  margin-top: 5rem;
  height: 10rem;
  background: ${palette.lightBlue[100]};
`;

export default ReadPost;
