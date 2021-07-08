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
          이 페이지는 아직 완성 되지 않았습니다.
          <br />
          <br />
          url을 직접 치고 들어오신 당신께 환호를 보냅니다!
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
`;

export default AboutPage;
