https://github.com/facebook/create-react-app/issues/6324

# 프로젝트 설정

react to nextjs(CSR to SSR) migration 시에 문제가 될 부분들을 위해 설정 정보를 작성한다.

## monorepo nohoist: lint, test 등을 위해

프로젝트 package.json (최상위) 에 nohoist에 문제가 될 부분을 추가해서 사전에 hoist되지 않도록 한다.

```json
{
  "...": {},
  "workspaces": {
    "packages": ["packages/*"],
    "nohoist": [
      "**/typeorm/**",
      "**/typeorm",
      "**/babel-eslint",
      "**/babel-jest",
      "**/eslint",
      "**/jest",
      "**/webpack-dev-server",
      "**/webpack-cli"
    ]
  }
}
```

## babel 설정

emotion 설정과 css-prop preset 적용을 위해 custom config 설정

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ],
    "@emotion/babel-preset-css-prop"
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

# dark mode /w emotion

palette 로 color를 관리하도록 만들었다 보니 색깔이 너무 많다.
dark mode일 경우 색을 만들어두지는 않고 palette에서 색을 지정해서 적용하는 방향으로 가야할 듯 싶다.

https://levelup.gitconnected.com/adding-dark-mode-to-your-react-app-with-emotion-css-in-js-fc5c0f926838

# dynamic route

https://nextjs.org/docs/routing/introduction
https://github.com/vercel/next.js/tree/canary/examples/dynamic-routing

```js
<Link
  href={{
    pathname: '/blog/[slug]',
    query: { slug: post.slug },
  }}
>
  <a>{post.title}</a>
</Link>
```

# nextjs svg { ReactComponent } undefined 오류

nextjs에서는 svg 파일을 next/image 통해 img를 관리한다.

그래서 ReactComponent 내부 값이 undefined로 되버리는 문제가 있다.

https://github.com/twopluszero/next-images/issues/15

이거저거 적용해봐도 계속 undefined로 나오는 문제가 있어서 구조 변경

# svg /w svgr/webpack

svgr 라이브러리를 쓰면 svg를 쓸 수는 있지만 default로 viewBox를 제거해버린다.

제거하지 않도록 webpack config를 설정 해준다.

https://github.com/gregberge/svgr/issues/142
https://stackoverflow.com/questions/64376001/pass-options-to-the-builtin-svgo-from-svgr-webpack

```js
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });
    return config;
  },
};
```

# emotion css props /w next/link

next/link 를 이용해 component를 만들고 css props를 받아 처리하려 했는데

일단 component로 css가 전달되지 않음

그래서 component로 만들지 않고 그대로 적용

anchor를 드러나게(?) 하기 위해 passHref를 true로 하고 드러나게 해준다.
스타일 적용을 위해?... 뭐가 어떻게 된건지 나도 헷갈리는데 어째뜬 anchor 역할을 하기 위해서(link) next/link에서 자동생성하게 하지 않고 드러나게 하는 것으로 이해함.

# same page in different route

next.config.js 에서 rewrites 함수를 이용해 redirect? 해주면 된다.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/posts',
      },
    ];
  },
};
```
