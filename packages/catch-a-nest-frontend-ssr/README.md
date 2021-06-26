https://github.com/facebook/create-react-app/issues/6324

# 프로젝트 설정

react to nextjs(CSR to SSR) migration 시에 문제가 될 부분들을 위해 설정 정보를 작성한다.

# monorepo nohoist: lint, test 등을 위해

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

# babel 설정

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
