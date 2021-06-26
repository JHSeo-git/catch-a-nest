https://github.com/facebook/create-react-app/issues/6324

# 프로젝트 설정

react to nextjs(CSR to SSR) migration 시에 문제가 될 부분들을 위해 설정 정보를 작성한다.

## monorepo nohoist: lint, test 등을 위해

프로젝트 package.json (최상위) 에 nohoist에 문제가 될 부분을 추가해서 사전에 hoist되지 않도록 한다.

```json
{
  "..." : {}
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

nextjs에서는 svg 파일을 file-loader를 통해 img로 변환해버린다.

이거저거 적용해봐도 계속 undefined로 나오는 문제가 있어서 구조 변경
