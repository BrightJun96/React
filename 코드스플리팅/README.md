# 코드스플리팅

리액트에서는 웹팩을 사용하여 여러 js파일을 하나로 번들링하여 서버로부터 응답받는다.
이 때 만약 여러 페이지가 구성되있고 프로젝트 규모가 크다면 처음 스크립트 파일을 받아올 때 로딩 시간이 길어질 수 있다.

이러한 이슈를 해결하기 위해 code-spliting이라는 방법을 사용하여 해결할 수 있다.
각 파일 혹은 컴포넌트를 사용할 때 해당 스크립트 파일을 로딩할 수 있게 하는 기술이며 주로 필요한 페이지에 들어갔을 때 해당 페이지에 대한 컴포넌트 스크립트가 로딩되도록 구현한다.

방법은 간단한다. 나중에 불러오고 싶은 컴포넌트를 React.lazy로 묶어주고 해당 컴포넌트를 사용할 때 Suspense로 nesting 해주면 된다.

## React.lazy

**Before**

```js
import OtherComponent from "./OtherComponent";
```

**After**

```js
const OtherComponent = React.lazy(() => import("./OtherComponent"));
```

위와 같이 컴포넌트를 import를 사용하면서 React.lazy로 감싸주면 해당 컴포넌트의 스크립트 파일은 컴포넌트를 사용할 때 불러와진다.

## React.Suspense

하지만 위와 같이 lazy로만 묶어주는 것외에 다른 작업이 필요하다.
Suspense로 묶어줘야한다.

```js
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

스플리팅할 컴포넌트를 사용할 때 suspense로 묶어주고 로딩 때 보여줄 fallback 속성값도 입력해줘야한다. 그렇지 않으면 해당 컴포넌트가 렌더링되지 않는다.

## Usage

여러 상황에서 컴포넌트에 대한 스크립트 파일을 불러올 수 있지만 주로 페이지별 컴포넌트 스크릡트를 스플리팅하는 경우가 많다.

따라서 보통 페이지별 라우팅이 되는 최상단 컴포넌트인 App.js에서 스플리팅 로직이 이루어진다.
예시 코드는 다음과 같다.

**App.js**

```js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

- [리액트 공식문서(code-spliting)](https://reactjs.org/docs/code-splitting.html)
