import React from 'react';
import { css } from '@emotion/react';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';

export type AboutPageProps = {};

const AboutPage = (props: AboutPageProps) => {
  return (
    <>
      <PageSEO title="About" description="about SeoNest" />
      <AppLayout>
        <div css={block}>
          🙇‍♂️ 안녕하세요! JHSeo 입니다.
          <br />
          <br />
          ❤️ 방문해 주셔서 감사합니다
          <br />
          <br />
          👷 이 페이지는 아직 완성 되지 않았습니다.
          <br />
          <br />
        </div>
      </AppLayout>
    </>
  );
};

const block = css`
  background: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  letter-spacing: 0.5px;
`;

export default AboutPage;
