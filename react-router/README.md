# react-router

> 주소에 따라 그에 맞는 컴포넌트를 로딩시간을 단축하여 보여줄 수 있는 리액트 라우팅 라이브러리이다.

- 라우팅 : 다른 주소에 다른 화면을 보여 주는 것

기존에는 HTML문서나 템플릿 엔진을 사용하여 경로에 맞는 문서를 할당해주었다.
새로운 경로에 들어갈 때마다 서버에서 HTML와 데이터들을 불러와야했다.

이는 많은 사용자가 몰리게 되면 서버의 과부하를 일으킬 수 있고 인터렉션이 많은 웹이라면 상태유지 어려움 및 로딩의 시간이 걸릴 수 있다는 단점이 있다.

이러한 단점을 보완하기위해 리액트 라이브러리는 뷰 렌더링을 브라우저가 담당하여 경로에 따른 컴포넌트를 필요할때마다 불러와 보여준다.

이러한 방법은 경로이동을 하여도 끊김없이 화면전환을 할 수 있어 로딩시간을 줄일 수 있다는 강점이 있다.

하지만 모든 뷰를 자바스크립트 파일 , 즉 컴포넌트로 불러와야한다는 점에서 자바스크립트 파일이 매우 커진다는 단점이 있다.

이는 페이지 로딩시 사용자가 실제로 방문하지않은 스크립트파일도 불러와질 수 있게 된다.

이러한 단점은 추후 코드스플리팅이라는 방법을 이용하여 로딩속도를 개선할 수 있다.

정리하자면 react router는 라우팅을 보다 간편하게 구현해줄수 있는 리액트 라이브러리이다.

## ✏️ 사용법

react router라이브러리를 사용하기 위해서는 리액트 프로젝트에서 해당 라이브러리를 react와 별개로 설치해줘야한다.

`npm i react-router-dom`

> react router 라이브러리는 크게 2가지 라이브러리가 있다.

- react router : react router의 핵심 기능을 담고 있는 라이브러리이다. 라우팅, 핵심 컴포넌트, 훅 등을 사용할 수 있다.
- react router dom: react router 기능을 모두 사용할 수 있으며 추가로 DOM API기능이 있다.(BroswerRouter, HasgRouter , Link)

## 🗃️ 태그의 종류 및 역할

react router 라이브러리에는 여러역할을 하는 태그가 있다.
각 태그가 어떤 역할을 하는지 알아보겠다.

### BrowserRouter

- BrowserRouter는 **최상단 컴포넌트**에 감싸줘야하는 태그이다.
  <br/>

- 웹 브라우저에서 react router 구현할 환경 컨텍스트를 제공한다.
- **History API**를 이용하여 서버에 요청없이 **경로이동을 하게 해주고 현재 주소와 관련된 정보를 저장**해준다.
  이는 **새로고침없이 페이지이동**을 하게 해주며, **현재 주소와 관련된 정보를 props로 쉽게 조회하거나 사용**하게 해준다.

> History API
> 서버에게 요청없이 페이지전환 및 뒤로가기를 가능하게 해주는 Web API

**index.js**

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

### Route

- 해당 경로(path)에 맞는 컴포넌트 및 element를 렌더링해주는 역할을 하는 태그

`<Route path ="/about" element = {<About/>}/>`
`<Route path ="/contact" element = {<Contact/>}/>`

- 경로에 맞는 주소를 입력해주면 element attribute에 할당한 컴포넌트가 렌더링된다.

- 본 주소가 http://localhost:3000이라 하였을 때 http://localhost:3000/about로 이동한다면 About컴포넌트를 보여준다.

### Routes

- **react router version 6**부터는 Route를 사용하기 위해서는 Routes로 감싸줘야한다.
  (이전 version에서는 감싸줄 필요가 없었음.)

- **Route들을 담아놓는 태그**이다.

```js
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

- Routes는 경로에 따라 **그에 맞는 컴포넌트만 렌더링**하게 해준다.
  즉, about경로에 들어가면 Home컴포넌트는 보이지 않는 것이다.
  (exact attribute도 version6부터 legacy됨.)

### Link

> Link태그는 history API로 기반으로 감싸진 a태그와 같다.

- Link는 사용자가 클릭함으로써 해당 경로에 따른 페이지로 이동할 수 있도록 하게 하는 태그이다.
  (a태그와 유사)

- 페이지 전환 방지 기능이 내장되어있다.

> a태그와 Link태그의 차이점
> a 태그는 페이지가 전환되는 과정에서 페이지를 새로 불러오기 때문에 기존에 렌더링되었던 것들이 다 날라가게 된다.
> 하지만 Link태그는 History API를 이용하여 서버에게 요청하지않고 브라우저 내에서 해결해 페이지의 주소만 변경해주는 장점을 가지고 있다.
> 따라서 a태그가 아닌 Link태그를 쓰는 것이 더 적절하다.

- 예시 : `<Link to="/about">About</Link> // about페이지로 이동`

### HashRouter

- HashRouter은 몇몇 이유로 url을 서버로 전송하려하지 않을 때 사용한다.
  이는 서버에 온전히 모든 것을 전담하지 않게 할 때 사용한다.

- HashRouter는 주소에 #을 붙임으로써 현재 주소와 관련된 정보를 저장하게 해준다.
  그리고 해당 url은 서버로 보내지지않는다.

### Router

> Router은 BrowserRouter,HashRouter,NativeRouter,StaticRouter 등 모든 router component들이 공유하는 low-level interface이다.

사용 용도에 맞게 위와 같은 high-level routers들이 만들어졌기 때문에 router을 직접적으로 쓸 일은 거의 없다.

때문에 자신의 환경에 따라 맞는 high-level router를 사용하면 된다.

### NavLink

특별한 Link태그라고 생각하면 된다.
NavLink를 사용할 수 있는 경우는 여러 경우가 있지만 대표적인 예로 Navigation Menu에서 카테고리가 선택됬을 때에 표시되게 하는 기능을 쉽게 구현할 수 있다.

```js
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? { color: "red" } : null)}
      >
        Home
      </NavLink>
      |
      <NavLink
        to="about"
        style={({ isActive }) => (isActive ? { color: "red" } : null)}
      >
        About
      </NavLink>
      |
      <NavLink
        to="contact"
        style={({ isActive }) => (isActive ? { color: "red" } : null)}
      >
        Contact
      </NavLink>
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
```

![](https://images.velog.io/images/kcj_dev96/post/d9cce4aa-22d6-4ceb-8d28-748d9214f35d/1.png)

![](https://images.velog.io/images/kcj_dev96/post/b2ea4843-1d17-4dea-bb5d-cc2b375e156c/2.png)

![](https://images.velog.io/images/kcj_dev96/post/9ea55180-3435-4ddf-b870-ab84ef3d0eaf/3.png)

1. style 속성에 함수를 할당해준다.
2. 함수의 인수로 {isActive}를 할당해준다.
   isActive는 boolean을 반환하는데 해당 링크가 선택되었을 때에는 true,
   선택되지않았을 때에는 false를 반환한다.
3. 각 카테고리가 선택되었을 때에 지정해놓은 style이 활성화된다.

#### customizing

NavLink마다 위와 같이 style속성을 입력해주기 번거롭다면 customizing한 컴포넌트를 만들어준다.

```js
import React from "react";
import { NavLink } from "react-router-dom";

const ColorNavLink = (path, LinkName) => {
  return (
    <NavLink
      to={path}
      style={({ isActive }) => (isActive ? { color: "red" } : null)}
    >
      {LinkName}
    </NavLink>
  );
};

export default ColorNavLink;
```

```js
import React from "react";
import { Route, Routes } from "react-router-dom";
import ColorNavLink from "./ColorNavLink";
import About from "./About";
import Contact from "./Contact";
const Home = () => {
  return (
    <div>
      <h1>React Router Test Zone</h1>
      {ColorNavLink("/", "Home")}|{ColorNavLink("about", "About")} |{ColorNavLink(
        "contact",
        "Contact"
      )}
      <h2>Welcome!</h2>
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Home;
```

- path와 LinkName을 인수로 할당하며 customizing하였다.
- 다만, NavLink가 활성화될 때마다 다른 style을 적용할 경우에는 커스터마이징하지않고 원하는 스타일을 입력해줘야한다.

## 🛠️ 기술 및 방법

### No Match Route

**App.js
**

```js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about/*" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
```

<hr/>

**정상경로**
![](https://images.velog.io/images/kcj_dev96/post/1593e90c-8e9a-4066-ad7d-ac02f0cdebbb/1.png)

<hr>

**없는경로**
![](https://images.velog.io/images/kcj_dev96/post/efca5a5d-2636-4865-af41-b477762b1df4/2.png)

<hr/>

없는 경로에 접속했을 때에 우리는 흰 화면을 볼 수 있다.
흰 화면이 아니라 없는 경로에 접속했다는 것을 알려주기 위해 No match Route를 구현해보자.

**App.js
**

```js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NoMatch from "./routes/NoMatch";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about/*" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
```

**NoMatch.js**

```js
import React from "react";

const NoMatch = () => {
  return (
    <div>
      <h1>Not Found Page</h1>
      <p>잘못된 경로로 들어오셨습니다!</p>
    </div>
  );
};

export default NoMatch;
```

<hr/>

**잘못된 경로**
![](https://images.velog.io/images/kcj_dev96/post/d5e06aa9-8a83-413c-bab3-cac62c515b04/3.png)

방법은 간단하다.
Route를 하나 만들어주고 path="/_" 라고 path prop을 설정해주면 된다.
"/_"의 의미는 나의 기본경로를 제외한 **나머지 하위 경로에 할당된 컴포넌트(NoMatch)를 보여주겠다는 의미**이다.

즉, 경로에서 "별"의 의미는 "해당경로의 모든 하위 경로" 이다.

NoMatch Route만 따로 구분해주면 모든 하위 경로에 NoMatch 컴포넌트가 보여질 것이다.

하지만 Routes라는 컴포넌트로 Route를 감싸주면 경로에 맞는 컴포넌트를 우선적으로 보여준다.

그렇기 때문에 /about이나 /contact 경로에 들어가면 NoMatch 컴포넌트보다 **경로가 일치하는 About컴포넌트나 Contact 컴포넌트가 우선적으로 보여지는 것**이다.

> reference
> This route will match any URL, but will have the weakest precedence so the router will only pick it if no other routes match.
> by [NoMatch Route](https://reactrouter.com/docs/en/v6/getting-started/overview#not-found-routes)

/\*의 의미 : 모든 경로에 기본적으로 할당한 컴포넌트를 보여주겠다.
별 => 해당 경로의 모든 하위 경로

- 경로에서의 "별"은 NoMatch Route를 구현할 때 뿐만 아니라 하위 경로에 항상 보여주고 싶은 컴포넌트를 할당할 때에도 쓰일 수 있다.

> 정리
> NoMatch Route 구현하는 법

1. Routes안에 NoMatch Route를 할당해준다.

- 이 때 Routes안에는 NoMatch Route뿐만 아닌 보여져야할 다른 Route들도 같이 넣어준다.

2. NoMatch Route의 경로는 path="/\*"로 설정해준다.

- 기본 경로의 모든 하위 경로에 NoMatch 컴포넌트를 보여주겠다.
  (설정한 경로를 제외하고는)

### Nested Routes

우리가 하위 경로에 들어가더라도 상위 경로의 컴포넌트가 항상 보이게 하고 싶을 때는 어떻게 해야할까?

방법은 다음과 같다.

> Route를 중첩해준다.(Nest Routes)

항상 보이게 하고 싶은 컴포넌트(상위 컴포넌트)의 Route로 나머지 children을 감싸주면 된다.

예를 들어서, 밑에 예제에서 하위경로에 가더라도 Home 컴포넌트는 항상 보이게 하고 싶은 상황이라고 하자.

```js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NoMatch from "./routes/NoMatch";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about/*" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
```

<hr/>

위 예제를 다음과 같이 변경해주면 된다.

```js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NoMatch from "./routes/NoMatch";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about/*" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
```

Home Route로 하위 경로에 있는 Route를 감싸주면 된다.

<hr/>

여기서 끝이 아니라 다음으로 Home 컴포넌트에 **Outlet이라는 컴포넌트를 할당**해줘야한다.

> Outlet
> This means the route will still render its children even without an explicit element prop, so you can nest route paths without nesting UI around the child route elements.
> 정확히 경로가 일치하지않아도 컴포넌트를 중첩함으로써 상위 컴포넌트를 보여줄 수 있게 하는 컴포넌트이다.
> 보여주고 싶은 부모 컴포넌트에 Outlet을 할당해주면 된다.

```js
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ColorNavLink from "./ColorNavLink";
import About from "./About";
import Contact from "./Contact";
const Home = () => {
  return (
    <div>
      <h1>React Router Test Zone</h1>
      {ColorNavLink("/", "Home")}|{ColorNavLink("about", "About")}|{ColorNavLink(
        "contact",
        "Contact"
      )}
      <h2>Welcome!</h2>
      <Outlet />
    </div>
  );
};

export default Home;
```

이러한 방법으로 하위경로에 들어간다하더라도 Home 컴포넌트(상위 컴포넌트)가 항상 보이게 할 수 있다.

**기본경로
**![](https://images.velog.io/images/kcj_dev96/post/583e7a98-ef77-49c2-ba78-9205fea65335/1.png)

**/about
**![](https://images.velog.io/images/kcj_dev96/post/6b615583-4897-4106-8155-a023aef596ca/2.png)

**/contact
**![](https://images.velog.io/images/kcj_dev96/post/6806d320-8300-4336-aee6-c5dd3c20f086/3.png)

> 정리
> Nest Routes 하는 방법

1. 보이게 하고 싶은 상위 컴포넌트로 하위 경로 컴포넌트를 감싸준다.
2. 상위컴포넌트에 Outlet 컴포넌트를 할당해준다.

**다른 방법으로는 경로에 "별"을 이용하는 방법이 있다.**
이도 Nest Routes를 하는 방법 중 하나이지만 공식문서에서는 첫번째 방법을 권장하고 있다.

아마 그 이유는 경로에 "별"을 쓰는 방법은 없는 경로에도 부모컴포넌트를 보여주기 때문이라고 생각한다.

"별"을 쓰면 부모경로를 기준으로 모든 하위 경로에 해당 부모컴포넌트를 보여주게 된다.

때문에 없는 경로에 들어가더라도 컴포넌트를 보여줄 수 있기 때문에 첫번째 방법을 더 선호한다고 생각한다.

### params

**url의 params란 무엇인가?**
url의 경로를 동적으로 조작하고 싶을 때 사용하는 기능이다.
정적으로 경로를 일일히 지정하여 라우팅해주는 것이 아니라 지정하지 않은 경로에 들어가도 라우팅되게 해준다.

**왜 사용하는가?**
어떠한 경로를 기준으로 하여 하위 경로마다 각각 다른 데이터들을 보여주고 싶을 때 사용할 수 있다.

이 때 데이터를 각각 라우팅해주는 것보다 params를 이용하여 동적으로 라우팅해주는 것이 가독성 및 유지보수에 편리함을 주기 때문이다.

다음 예제를 보자.

```js
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NoMatch from "./routes/NoMatch";
import User from "./routes/User";

const App = () => {
  const users = [
    { position: "user1", userId: 1, name: "mark" },
    { position: "user2", userId: 2, name: "cavin" },
    { position: "user3", userId: 3, name: "merry" },
  ];

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about" element={<About users={users} />}>
            {users.map((user) => {
              return (
                <Route
                  key={user.userId}
                  path={user.position}
                  element={<User />}
                />
              );
            })}
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
```

위 예제에서는 About페이지에서 array.prototype.map메서드를 사용하여 각 user를 라우팅해주고 있다.

하지만 params를 사용한다면 다음과 같이 표현할 수 있다.

```js
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import NoMatch from "./routes/NoMatch";
import User from "./routes/User";

const App = () => {
  const users = [
    { position: "user1", userId: 1, name: "mark" },
    { position: "user2", userId: 2, name: "cavin" },
    { position: "user3", userId: 3, name: "merry" },
  ];

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about" element={<About users={users} />}>
            <Route path=":usernumber" element={<User />} />
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
```

data를 기준으로 여러 Route를 맵핑하지않고 params로 동적으로 조작하여 한줄의 Route로만 구현할 수 있다.

**사용법**

위의 예제를 참고하여 사용법을 살펴보겠다.

```js
<div>
  <Routes>
    <Route path="/" element={<Home />}>
      <Route path="about" element={<About users={users} />}>
        <Route path=":usernumber" element={<User />} />
      </Route>
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="*" element={<NoMatch />} />
  </Routes>
</div>
```

about경로를 기준으로 usenumber라는 param을 할당해주었다.
이 때 about경로에서 어떤 경로로 이동하여도 User라는 컴포넌트를 보여주게 된다. (이것이 동적으로 url을 조작할 수 있다는 의미)

일치하지않은 url이 있다면 빈 화면이거나 NoMatch 화면이 나타나거나 해야하지만 params를 설정해준다면 할당한 컴포넌트가 나타난다.

이를 통해 여러 Route를 일일히 설정해주지 않아도 된다는 장점을 지니게 된다.

**url params 사용하기**
내가 동적으로 입력한 url param을 이용하고 싶다면 useParams라는 훅을 사용하면 된다.

```js
import { useParams } from "react-router-dom";

const params = useParams;
console.log(params);
```

![](https://images.velog.io/images/kcj_dev96/post/e8672f3d-6128-4584-a105-f79a2c911acf/4.png)

useParams 훅을 불러오면 내가 사용하고 있는 params를 모아둔 객체를 반환해준다.

아까 위에서 지정해준 usernumber라는 params와 들어간 경로에 대한 정보를 객체로 보여주고 있다.

`url params는 항상 문자열이기 때문에 가져와야할 params가 숫자라면 가져올 때 숫자화시켜서 가져와야한다. ex) parseInt()`

접속한 경로의 이름을 사용하고 싶다면 다음과 같이 사용할 수 있겠다.

```js
import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1>User Number : {params.usernumber}</h1>
    </div>
  );
};

export default User;
```

위와 같이 설정해준다면 param 경로에 대한 정보를 사용할 수 있다.

![](https://images.velog.io/images/kcj_dev96/post/a4275209-bfcd-4336-b644-c3a375838387/5.png)

<hr/>

![](https://images.velog.io/images/kcj_dev96/post/ec1968a7-5158-4e22-8d70-7c9f6b5f53e2/6.png)

user1경로에 접속하니 user1이라는 경로를 화면에 나타내고 user2 경로에 접속하니 user2라는 경로를 화면에 나타낸다.

이렇게 동적으로 많은 양이 Route를 지정하고 싶을 때에는 route params를 활용하면 좋다고 생각된다.

> 정리
> params를 사용하는 방법

1. Route path prop에 ":paramname"을 할당한다.
   `<Route path =":paramname" element ={<Component/>}/>`
2. paraname을 활용하고 싶다면 useParams훅을 사용하여 사용한다.
   `const params = useParams()`

### Index Routes

> Route컴포넌트의 prop값으로 index라는 값을 넣어주는 것이다.
> index의 역할은 부모 경로에 들어갔을 때 보여줄 element을 지정하는것이다.

여러가지 하위경로를 가지고 있는 부모경로가 있다고 하자.
이 때 부모경로에 들어갔을 때 보여지는 element가 있어야한다.

예를 들어, 하위 경로로 들어갔을 때 item들을 보여준다고 하였을 때 부모경로에 들어갔을 때 Select the Item!이라는 element를 보여주고 싶다고 하자.

이 때 해당 element는 상위 경로로 들어갔을 때 보여야하고 하위경로로 들어갔을 때에는 안보여야한다.

이럴 때 index prop을 사용하는 것이다.
부모 Route로 하위 Route를 Nest했을 경우 하위 Route 중 하나에 path를 입력해줄 필요없이 index prop만 할당해주고 element를 할당해준다.

**예시**

```js
<Route path ="/invoices" element = {<Invoices/>}>
  <Route index element = {<h1>Select the Invoice!</h1>}
  <Route path =":invoiceId" element = {<Invoice/>}/>
</Route>
```

위 예시에서 invoices라는 경로에 들어갔을 때 Invoices컴포넌트가 Outlet되며 보여질 것이며 하위 경로로 들어간다하여 Invoices 컴포넌트내용은 보여질 것이다.

하지만 부모경로에서는 보여지고 하위 경로로 들어갔을 때 사라질 element가 필요할 때 위와 같이 index prop을 활용해주면 되는 것이다.

그렇다면 처음 invoices라는 상위 경로에 들어갔을 때 Select the voice라는 문구가 보여지고 하위 경로로 이동하였을 때에는 해당 문구가 보이지 않게 될 것이다.

index prop을 활용하지 않더라도 따로 invoices Route안에 invoices Route를 만들어주는 방법도 있겠지만 이는 가독성을 해칠 수 있으며 좋은 방법은 아니다.

따라서, 상황에 따라 element를 보여지게 하거나 사라지게 하기 위해서 index prop을 사용하는 방법을 제시할 수 있겠다.

### useSearchParams

const [searchParams,setSearchParams] = useSearchParams()

useSearchParams는 현재 location에 대하여 url에 query string을 읽고 변경하는데 사용된다.

useSearchParams는 useState hook처럼 두개의 값을 담은 배열을 반환한다.

> searchParams : 현재 location의 search params
> setSearchParams : searchParams를 업데이트 해주는 함수

참조 :

- [a태그와 Link태그의 차이점](https://ostrowski.ninja/why-i-dont-use-react-router-link-component/)
- [react router 공식 문서](https://reactrouter.com/docs/en/v6)
