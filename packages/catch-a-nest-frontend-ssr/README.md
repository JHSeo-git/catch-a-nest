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

# react-query /w nextjs

ssg, ssr 둘 다 사용 가능하다.
동작 개념은 preFetch를 통해 데이터를 '미리' 가지고 있도록 하는 것이다.
실제 사용 시에는 react-query cache 기능을 통해 렌더링 하는 방식

기존 대로 csr 방식으로 불러오는 것도 상관없다.(다만 ssg, ssr 보단 느림)

https://github.com/tannerlinsley/react-query/tree/master/examples/nextjs

hydration이라고 하는 용어는 '서버사이드 렌더링으로 만들어진 수분이 없는 정적 HTML, State로 부터 수분을 보충하는 과정(동적인 상태로 변화)을 말한다.

# next/image

next에서 제공하는 image component를 사용시에 public path가 아닌 외부 url 일 경우 사전에 url 을 등록해주어야 한다.

```js
module.exports = {
  images: {
    domains: ['files.seonest.net', 'd1ml1bwdb9n1pg.cloudfront.net'],
  },
};
```

그리고 자동으로 image 크기나 lazy loading등 최적화해서 화면에 rendering 해주는데 스타일이 꼬일 수가 있다.

layout props나 width, height 적절히 사용하고
fill 사용 시에는 상위 component에 position: relative를 걸어주어야 한다.
image render 시에 스타일이 absolute이기 때문에 fill시 예상한 범위내에서 그려져야 하기 때문

# WebAPI Issue

nextjs pre-render 기능으로 인해 WebAPI에 접근하여 사용할 때 없는 경우가 발생한다.

recoil initialize 를 위해 localStorage에 접근하는데 문제가 생기면서 찾아보았다.

해결책은 useEffect를 이용해 render 후 진행 되도록 하는 방법...이 있고 여러가지 있는듯

https://github.com/facebookexperimental/Recoil/issues/408

# getStaticProps typescript

```ts
import { InferGetStaticPropsType } from 'next';

type Post = {
  author: string;
  content: string;
};

export const getStaticProps = async () => {
  const res = await fetch('https://.../posts');
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    },
  };
};

function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  // will resolve posts to type Post[]
}

export default Blog;
```

# tui editor issue

## window is not defined

dynamic import 사용하여 브라우저에서 로드되고 나서 쓸 수 있게 하면 된다.

## ref, ref.current is null

pre-render 기능으로 인해 ref 값이 정상적으로 전달되지 않는다.
해결할 수 있는 구조가 있으니 참고 하자.

> - https://myeongjae.kim/blog/2020/04/05/tui-editor-with-nextjs

# write에서 new | edit 관리

new 일 경우 title, markdown 등이 초기화 된 값이 들어가야 하고
edit 일 경우 api를 통해 가져온 값들이 채워져야 한다.

각 page가 다르기 때문에 간단하게 진행 될 걸로 예상했으나
첫 페이지를 write 페이지로 한다던지, dynamic import를 쓰지않아 문제가 되었던지
꽤 자잘한 버그들이 많아서 고생했다.

sync 완료했다는 값을 관리할 atom을 만들어 관리하였다.
(여기서 sync라는 것은 외부(api나 변수 등)에서 post content atom에 주입하는 것을 말한다.)

현재 sync case는 2,3개 정도 될것으로 생각된다.

1. edit인데 temp가 없는 것 sync
2. edit인데 temp가 있고 그 temp를 사용할 때 sync
3. reset을 위해 sync

# react-hook-form 사용

일단 form이 크지 않고 해서 이번에 한 번 적용해보려고 한다.
validation 기능을 쓰려 했지만 사전에 erro를 위한 alert창을 따로 만들어놔서 별도 validate을 넣진 않았다.(react-hook-form 내에서)

typescript 지원이 매우 깔끔하게 잘 되어 있어서 무리 없이 적용가능 할 것 같다.

그런데 만약 form 내부에 깊게 input 이 있다면 prop drilling을 해야할 것 같은데
별도 context를 관리하는 hook이 있는진 봐야 될 것 같다.
그렇지 않다면 register도 마찬가지로 recoil state로 관리해서 하는 방법이 있을 수 있겠다.

```ts
export type WriteInputs = {
  title: string;
  shortDescription?: string;
  thumbnailUrl?: string;
};

const { register, handleSubmit } = useForm<WriteInputs>();

<textarea
  {...register('title')}
  css={textareaStyle}
  rows={1}
  placeholder={placeholder}
  value={postTitle ?? ''}
  onChange={onChange}
  autoFocus
/>;
```

# seo 구성을 위해 next-seo 를 이용함

https://github.com/garmeeh/next-seo#

간편하게 설정할 수 있고 og나 다른 meta tag들을 쉽게 제공해주는 듯...

# toast 처리

프로그레스 바 사용 시 좋을 것 같음
https://fkhadra.github.io/react-toastify/use-a-controlled-progress-bar

# 에러처리

공통 처리 영역을 만들어서 처리하는게 좋을 것 같음

https://gist.github.com/saqueib/a495af17d7c0e2fd5c2316b0822ebac3

1. axios intercepter를 이용해 error 시 toast 처리
2. 401일 경우 logout 처리