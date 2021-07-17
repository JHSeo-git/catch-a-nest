import React from 'react';
import { css } from '@emotion/react';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';
import palette from '@/lib/styles/palette';

export type AboutPageProps = {};

const AboutPage = (props: AboutPageProps) => {
  return (
    <>
      <PageSEO title="About" description="About Seo Nest Blog" />
      <AppLayout>
        <article css={block}>
          <h1>
            Hi👋 I&apos;m <strong>JHSeo</strong> .
          </h1>
          <section>
            <h2>
              <strong>seonest.net</strong> developed by ...
            </h2>
            <h3>Front-end</h3>
            <ul>
              <li>Typescript</li>
              <li>React</li>
              <li>Nextjs</li>
              <li>Recoiljs</li>
              <li>Vercel</li>
              <li>Axios</li>
              <li>@emotion</li>
              <li>@toast-ui/editor</li>
              <li>Markdown-it</li>
            </ul>
            <h3>Back-end</h3>
            <ul>
              <li>Nodejs(Koa)</li>
              <li>Mariadb</li>
              <li>Typeorm</li>
              <li>AWS-EC2</li>
              <li>AWS-S3</li>
              <li>PM2</li>
              <li>nginx</li>
              <li>Cloudflare</li>
            </ul>
          </section>
        </article>
      </AppLayout>
    </>
  );
};

const block = css`
  background: #fff;
  height: 100%;

  letter-spacing: 0.5px;

  h1,
  h2 {
    strong {
      color: ${palette.lightBlue[800]};
    }
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }

  ul {
    padding-left: 2rem;
    list-style: square;

    li {
      &::marker {
        font-size: 1rem;
        color: ${palette.lightBlue[800]};
      }
    }
    li + li {
      margin-top: 0.5rem;
    }
  }
`;

export default AboutPage;
