# React.memo

## 😨 불필요한 렌더링

리액트 프로젝트를 만들면서 여러 컴포넌트를 다루게 된다.
컴포넌트는 여러 가지 상황에 따라 리렌더링이 발생할 수 있는데 이는 가끔 불필요한 리렌더링을 발생시키는 경우가 있다.

**리렌더링이 발생하는 경우는 언제인가?**

> 리렌더링이 발생하는 경우는 크게 3가지 경우가 있다.

1. props가 변경되는 경우
2. state가 변경되는 경우
3. 부모 컴포넌트가 리렌더링되는 경우

컴포넌트의 props가 변경되면 해당 컴포넌트가 리렌더링되고
state가 변경되면 해당 컴포넌트가 리렌더링되고
부모 컴포넌트가 변경되면 자식 컴포넌트에 변경사항이 없더하더라도 자식컴포넌트도 리렌더링된다.

컴포넌트 자신의 props와 state가 변경되면 리렌더링되는 필요한 부분이지만 부모컴포넌트가 리렌더링된다해서 변경이 없는 자식컴포넌트가 리렌더링이 되는 것은 웹 성능을 느리게 할 수 있다.

다음 예시를 보자.

**Parent.js**

```js
import React, { useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [number, setNumber] = useState(0);
  console.log("Parent render");
  return (
    <div>
      <h1>Parent</h1>
      <h2>Parent Number : {number}</h2>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        Increase
      </button>
      <Child />
      <Child />
      <Child />
    </div>
  );
};

export default Parent;
```

**Child.js**

```js
import React from "react";

const Child = ({ number }) => {
  console.log("Child render");
  return (
    <div>
      <h2>Child</h2>
    </div>
  );
};

export default Child;
```

**App.js**

```js
import React from "react";
import Parent from "./Parent";

const App = () => {
  return (
    <div>
      <Parent />
    </div>
  );
};

export default App;
```

Parent컴포넌트안에는 3개의 Child컴포넌트가 있다.
이 때 버튼을 누름으로써 number라는 state값을 변경할 때 parent의 state값이 바뀌면 Parent 컴포넌트를 리렌더링된다.

하지만 중요한 것은 값이 변경되지 않는 Child도 리렌더링되고 있다는점이다.

![](https://images.velog.io/images/kcj_dev96/post/292363c1-5c12-40e6-8cd9-55d8e6930371/1.png)

![](https://images.velog.io/images/kcj_dev96/post/b0fff501-b92f-4c32-819b-f17f8f5f02a8/2.png)

![](https://images.velog.io/images/kcj_dev96/post/4245b556-fc4e-44e1-a126-d66b757cd22b/3.png)

이런식으로 부모컴포넌트의 state값이 바뀔 때마다 자식컴포넌트로 리렌더링이 되고 있다.

지금 자식컴포넌트가 3개여서 별것이 아니지만 실제 프로젝트에서는 복잡한 컴포넌트 계층을 이루고 있다.

이 때 부모컴포넌트에서 자식컴포넌트와 상관없는 작은 부분이 바뀐다고 했을 때 그것때문에 자식컴포넌트가 전부 리렌더링이 된다하는 것은 엄청난 낭비이다.

때문에 이러한 과도한 리렌더링을 방지하기 위하여 함수형 컴포넌트에서는 React.memo라는 고차컴포넌트(Higher-Order Component)를 제시하고 있다.

## 💊 React.memo

React.memo는 고차컴포넌트(Higher-Order Component)로서 같은 결과를 렌더링해낸다면 React.memo를 호출하여 결과를 메모이징하도록 래핑하여 경우에 따라서 성능 향상을 시킬수가 있다.

- 이는 클래스 컴포넌트의 생명주기 메서드 중 하나인 shouldComponentUpdate의 동작과 비슷하다.
  해당 컴포넌트의 props와 state를 참조하여 변경사항이 없다면 컴포넌트를 업데이트해주지 않는다.
  클래스 컴포넌트를 최적화할 때 사용하는 메서드이며 React.memo 동작원리도 이와 유사하다 생각하면 되고 간편화되었다고 생각하면 된다.

따라서 불필요한 리렌더링을 방지하기 위해서는 React.memo로 해당 컴포넌트를 감싸주면 된다.

위의 예시를 React.memo로 감싸주자.

Child.js

```
import React from "react";

const Child = ({ number }) => {
  console.log("Child render");
  return (
    <div>
      <h2>Child</h2>
      <h3>Child Number : {number}</h3>
    </div>
  );
};

export default React.memo(Child);

```

다음과 같이 컴포넌트를 React.memo로 감싸주면 Parent 컴포넌트의 state가 변경되어도 Child 컴포넌트가 리렌더링되지 않는다.

![](https://images.velog.io/images/kcj_dev96/post/7cce35ca-1ba6-4154-b279-e8004a2664f3/4.png)

![](https://images.velog.io/images/kcj_dev96/post/f18bbc28-9a8e-4ac5-921d-3bd5fc29bd11/5.png)

![](https://images.velog.io/images/kcj_dev96/post/cc5f029c-9fef-4324-9c7a-6ddd8a63b7d7/6.png)

Parent의 state가 바뀌어도 Parent 컴포넌트만 리렌더링되는 것을 확인할 수 있다.

## 👋 정리

부모컴포넌트의 변화에 따라 변화가 없는 자식컴포넌트의 불필요한 리렌더링을 방지하기 위한 방법으로 React.memo라는 방법을 알아보았다.

하지만 컴포넌트의 중첩이 많지 않다면 굳이 이러한 방법을 써주지 않아도 될 것이다.

그렇지만 대부분의 리액트 프로젝트에서 엄청난 컴포넌트의 중첩을 할 수 밖에 없기 때문에 성능향상을 위해서 불필요한 리렌더링을 방지할 수 있는 방법을 꼭 알아놔야한다.

참조 : [ 리액트 공식문서](https://ko.reactjs.org/docs/react-api.html#reactmemo)
