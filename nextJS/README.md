# next.js

next.js는 **서버 사이드 렌더링을 위한 리액트 프레임워크**이다.

리액트에서 **서버 사이드 렌더링**을 하기 위해 초기 작업들이 필요한데 next.js는 이를 셋팅해주어 셋팅을 해준 프레임안에서 작업을 해주면 된다.

초기 작업들이란 **code spliting , compling , minifying , bundlin**g 등의 작업이다.

만약 기존 **CRA(Create React App)으로 만든 리액트 프로젝트로 서버 사이드 렌더링**을 하기 위해서는 `npm run eject`를 하여 **바벨 , 웹팩 및 code spliting 등을 수작업**으로 해야한다.

하지만 next.js를 사용하면 위와 같은 작업들을 **자동적**으로 해주기 때문에 **별다른 셋업없이 사용**할 수 있다.

> **코드 스플리팅**
> 어떠한 경로에 들어갔을 때, 해당 페이지에 대한 파일만 가져올 수 있도록 파일별로 분류해주는 것

즉, next.js는 **리액트를 기반으로 서버 사이드 렌더링을 할 수 있게 해주는 프레임워크**이다.

## 특징

next.js에서 가장 중요한 특징은 **pre-rendering**이다.

### CSR

기존 리액트는 CSR(Client Side Rendering)으로 서버로부터 요청하여 js파일로 응답해주면 브라우저가 이를 파싱하여 html,css로 파싱하여 렌더링을 해준다.

즉, 처음 html을 요청을 하였을 때 html파일에 DOM요소는 거의 비어져 있고 js가 이를 그려주는 것이다.

때문에 초기 렌더링을 느릴 수 있으며 처음에 html요소들이 비어있는 상태이니 SEO에도 최적화되어있지 않다는 단점을 가지고 있다.

### next.js(pre-rendering)

위와 다르게 next.js는 서버에서 pre-rendering을 실행해준다.

서버에서 html을 렌더링해주어 브라우저에서 요청하였을 때 렌더링된 페이지를 응답받을 수 있는 것이다.

때문에 **초기 렌더링이 빠르며** 이미 html이 완성된 상태에서 전달받기 때문에 **SEO에도 최적화**된다는 장점을 가지고 있다.

### 설치

`npm create next-app`

**with Typescript**
`npm create next-app --typescript`

### html 파일이 없다?

`npm create next-app`로 next.js 구조를 형성하면 폴더 어디에도 html파일을 찾을 수 없다.

public 디렉토리에 가도 없고 다른 디렉토리에 가도 html파일이 없다.
이유는 **next.js는 각 페이지를 js로 형성**하기 때문에 html파일이 없다.

이는 `next build`로 빌드로 한뒤 `.next` 디렉터리에 html파일이 생성된다.(빌드한 뒤 html 위치 : `/.next/server/pages/index.html`)

## Routing

next.js에서 **파일명은 곧 라우팅 경로**이다.

### react routing

리액트에서는 라우팅을 할 때에 **react-router-dom**과 같은 라이브러리를 사용하여 라우팅을 했다.

```js
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

위와 같이 리액트를 클라이언트측에서 사용할 때에 **각 경로에 따라 보여주고 싶은 컴포넌트를 할당**하여 보여주는 형태로 라우팅을 한다.

SPA로써 **각 경로마다** 다른 페이지(html)를 보여주는 것이 아닌 **다른 컴포넌트를 보여주는 것**이다.

### next.js routing

next.js에서 routing을 하는 방법은 위와 좀 다르다.
**파일명으로 라우팅 경로를 지정**하여 각 파일이 라우팅 경로에 따른 페이지가 된다.

next.js는 **Server Side Rendering**으로써 각 경로마다 **다른 페이지(html)**를 보여준다.

그래서 라우팅을 하는데 기존 리액트 라우팅과는 **다른 방식으로 라우팅**을 하게 된다.

1. **pages라는 폴더를 생성**한 뒤
2. **경로별로 파일들을 중첩**해주어 경로를 지정해준다.

다음은 라우팅을 하기 위한 **폴더 구조**이다.
![](https://velog.velcdn.com/images/kcj_dev96/post/c893e452-ca4f-4304-8be2-86fbdf66f342/image.png)

**index.js**는 기본 경로에 들어갈 페이지이고
(`http://localhost:3000`)

**about.js**는 about이라는 경로에 있는 페이지 이다.
(`http://localhost:3000/about`)

만약 **posts라는 폴더**에 `first-post.js`라는 파일이 있다면 `http://localhost:3000/posts/first-post`와 같이 라우팅이 되며 페이지가 할당되는 것이다.

각 경로에 대한 페이지는 html로 구성하는 것이 아닌 **리액트 컴포넌트로 페이지를 구성**한다.

## pre-rendering

next.js에서는 **서버측에서 pre-rendering**을 해준다.

**CSR의 경우**에는 브라우저 렌더링 엔진이 **html,css,js 등을 받아와 파싱하여 rendering**을 해준다.

하지만 next.js는 서버측에서 **각 페이지에 대하여 pre-rendering**을 해주어 **미리 렌더링된 html을 클라이언트에 응답**해준다.

응답해준 **html파일은 단지 정적인 파일**이고 js기능이 덧입혀져있지않다.  
때문에 기능을 덧붙힐 js파일이 필요하다.

이를 위해 next.js는 **번들링된 js파일을 보내줘 html파일에 기능을 덧입히며 클라이언트측에서 다시 한번 렌더링**된다.

이 과정을 **hydrate**라고 한다.

서버측에서 렌더링 한번, 클라이언트 측에서 렌더링 한번을 하여 **총 두번 렌더링**이 된다.

이는 두번 렌더링이 되어 비효율적이라 생각할 수 있지만 클라이언트측은 이미 렌더링된 html파일위에 js파일의 기능만 덧붙히면 되기 때문에  
실제로 브라우저에서 **초기 렌더링해주는 속도는 훨씬 빠르다는 장점**이 있다.

뿐만 아니라 이미 완성된 html을 응답받기 때문에 **SEO에도 최적화**될 수 있다는 장점이 있다.

### Static Generation vs Server Side Rendering

next.js에서 pre-rendering은 두 가지 방법을 가지고 있다.

1. Static Generation
2. Server Side Rendering

둘의 차이는 html을 만드는 **시기**이다.

**Static Generation**의 경우에는 build시에 모든 페이지에 대하여 html을 완성하여 사용자가 요청할 때마다 미리 렌더링해둔 html을 응답해주고  
**Server Side Rendering**의 경우에는 사용자가 요청할 때마다 그때 그때 렌더링을 해준다.

즉 , **Static Generation**는 build시 한번만 html을 pre-rendering하여 만든 html을 요청이 들어올때마다 재사용한다.
**Server Side Rendering**는 요청이 들어올 때마다 pre-rendering을 해줘야한다.

**Static Generation**은 사용자의 요청에 pre-rendering이 영향을 받지 않을 때 사용하고  
**Server Side Rendering**은 사용자의 요청에 따라 빈번히 pre-rendering이 달라져야할 경우 사용하면 된다.

사용자의 요청에 따라 데이터가 변경되고 그 빈번히 변경되는 데이터를 지속적으로 rendering해줘야하는데 빌드할 때 rendering해놨던 html을 계속쓰면 이는 해당 데이터들이 적용이 안된다.

이럴 때 **Server Side Rendering**을 사용하면 되고 만약 요청에 따라 변화가 없어도 되는 html이라면 static Generation방법을  
사용하면 되겠다.

## Reference

- https://nextjs.org/

- https://stackoverflow.com/questions/66286528/no-index-html-file-in-my-nextjs-app-netlify-doesnt-like-that

- https://stackoverflow.com/questions/70641546/how-does-next-js-application-works-on-browser-even-without-html-file-in-folder
