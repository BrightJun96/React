# 🔍 props

> props는 properties를 줄인 표현으로 컴포넌트 속성을 설정할 때 사용하는 요소이다.
> props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있다.

## ✏️ 사용법

### ✒️ 함수형 컴포넌트

다음은 **함수형 컴포넌트에서의 props 사용법**이다.

**index.js**

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App name="react" />
  </React.StrictMode>,
  document.getElementById("root")
);
```

**App.js**

```js
import React from "react";

const App = (props) => {
  return <div>나는 지금을 {props.name}을 학습하는 중이다.</div>;
}; //나는 지금 리액트를 학습하는 중이다.

export default App;
```

이런 식으로 부모 컴포넌트(index.js에서 쓰는 App컴포넌트)에서 props(name)를 설정하여 해당 컴포넌트 내부(App.js)에서 사용할 수 있다.

### ✒️ 클래스형 컴포넌트

**클래스 컴포넌트에서의 props 사용법**은 다음과 같다.

**index.js**
![](https://images.velog.io/images/kcj_dev96/post/afc11cf1-20ca-4a04-b9e4-860b83351c03/index.png)

**ClassComponent.js**
![](https://images.velog.io/images/kcj_dev96/post/2a2e424f-7c5e-482a-b426-fb4c09487035/ClassComponent.png)

**render함수내에서 this.props로 조회하여 props값을 사용하면 된다.**

## 📌 defaultProps

> defaultProps는 props가 지정되있지않았을 때 지정해놓은 기본 props값 설정이다.

**index.js**

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

**App.js**

```js
import React from "react";

const App = (props) => {
  return <div>나는 지금 {props.name}을 학습하는 중이다.</div>;
}; //나는 지금 아무개를 학습하는 중이다.

App.defaultProps = {
  name: "아무개",
};

export default App;
```

## 📌 children

**children**은 props의 프로퍼티(**props.children**)로서 컴포넌트를 사용하는 **부모컴포넌트 태그 사이의 내용**을 보여준다.

**index.js**

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App>리액트</App>
  </React.StrictMode>,
  document.getElementById("root")
);
```

**App.js**

```js
import React from "react";

const App = (props) => {
  return <div>나는 지금 {props.children}를 학습하는 중이다.</div>;
}; //나는 지금 리액트를 학습하는 중이다.

export default App;
```

## 📌 propTypes

> propTypes : 컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때 사용한다.(데이터 타입 지정)

**propTypes 모듈**을 불러와 사용한다.

**index.js**

```js
import React from "react";
import PropTypes from "prop-types";
const App = ({ name }) => {
  return <div>나는 지금을 {name}을 학습하는 중이다.</div>;
};

App.defaultProps = {
  name: "아무개",
};

App.propTypes = {
  name: PropTypes.string,
};

export default App;
```

**App.js**

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App name="3"></App>
  </React.StrictMode>,
  document.getElementById("root")
);
```

**proptypes**는 변수의 **데이터 타입을 지정**해준다.
따라서 해당 props 변수에 지정한 타입외 다른 타입의 값을 입력하면 에러가 발생한다.

### ✒️ isRequired

> isRequired 프로퍼티는 props의 타입을 지정해주지 않았을 때 에러를 발생시킨다.

**App.js**

```js
import React from "react";
import PropTypes from "prop-types";
const App = ({ name }) => {
  return <div>나는 지금을 {name}을 학습하는 중이다.</div>;
};

App.propTypes = {
  name: PropTypes.string.isRequired,
};

export default App;
```

**index.js**

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById("root")
);
```

다음과 같이 App컴포넌트의 attribute로 name 값을 지정해주지 않으면 에러가 발생한다.

따라서 PropTypes는 데이터의 타입을 확실히 지정해주고 필수적으로 props 값을 입력해줘야하는 props 변수에 쓸 때 유용하겠다.

## 🚩 유의사항

모든 리액트 컴포넌트는 자신의 props를 다룰 때 반드시 순수함수처럼 동작해야한다.
즉, 컴포넌트는 함수나 클래스내에서 자신의 props를 수정하면 안된다.

### 🙄 순수함수란?

> **순수함수**는 함수형 프로그래밍에서 어떤 외부상태에 의존하지도 않고 변경하지도 않는, 즉 부수효과가 없는 함수이다.
> **비순수함수**는 외부 상태에 의존하거나 외부 상태를 변경하는, 즉 부수 효과가 있는 함수이다.

_**순수함수**_

```js
function sum(a, b) {
  return a + b;
}
```

_**비순수함수**_

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

순수함수는 **동일한 인수가 전달되면 언제나 동일한 값을 반환하는 함수**이다.
또한 **입력값을 바꾸려하지않고 항상 동일한 입력값을 적용**해줘야한다.

위 순수함수는 동일한 입력값에 동일한 반환값을 가지고 있지만,
위 비순수함수는 입력값을 바꾸려하고 있다.

컴포넌트에서도 순수함수처럼 props(입력값[인수])를 변경하려 하지 않아야한다.
즉, 부모컴포넌트에서 설정한 props 값을 자식컴포넌트에서 변경할 수 없다.

그렇다면 ***props값을 어떻게 동적으로 갱신하나***라는 의문이 들텐데 이러한 문제를 ***state로 해결***해준다.

외부에서 동적으로 값을 갱신해주는 ***state를 부모컴포넌트의 props값을 입력해주어 props를 동적으로 갱신***하는 것이다.

이는 추후에 state를 알아볼 때 자세히 알아보겠다.

하지만*** 순수함수처럼이지 완전한 순수함수는 아니라는 것***을 인식해야한다.
왜냐하면 컴포넌트는 외부의 값을 인수로 전달받아 쓰는 경우가 많다.

주로 state값을 전달받아 동적으로 props값을 갱신하는데 이 때
props는 state값을 변경하지 않고 있지만, 즉 내부에서 props 값을 변경하고 있지않지만 **외부의 상태에 의존**하고 있기 때문에 완전한 순수함수가 아니다.

때문에 컴포넌트는 **순수함수처럼 동작**하는 것이지 완전한 순수함수는 아니다.

### 🤔 WHY?

_**컴포넌트가 순수함수처럼 동작해야하는 이유는 props가 외부의 상태를 변경해서는 안되기 때문이다.**_
즉, 부수효과를 일으키면 안된다는 것이다.

만약 여러개의 컴포넌트가 부수효과를 일으킨다면 외부의 값을 추적하기 어려워지며 이는 유지보수의 어려움을 겪게 만든다.

_**때문에 컴포넌트는 순수함수처럼 부수효과가 없이,
props가 외부상태를 변경하지 않도록 해야한다.**_

## 📙 마무리...

이처럼 ***props는 어떠한 데이터를 전달받기 위하여 쓰는 매개체***이고 리액트에서 항상 쓰이는 것이며 반드시 알고 있어야하는 개념이다.

**props는 대부분 state와 연관지어서 쓰인다.**
다음 포스팅에는 state를 공부해보겠다.
👋👋
