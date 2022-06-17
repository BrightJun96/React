# 🔍 State

> **state**는 컴포넌트내에서 **어떠한 값을 동적으로 갱신**해주기 위하여 사용한다.
> 즉, **state는 동적으로 갱신되는 값**이다.

- 앞서 보았듯이 **[props](https://velog.io/@kcj_dev96/props-state)**는 컴포넌트 내부에서 값을 변경할 수 없다.
  따라서 **props 값을 변경해주기 위한 방법으로 state**가 있다.

- 꼭 props 뿐만 아니라 컴포넌트에서도 **동적으로 갱신하고 싶은 값이 있다면 state를 사용하면 된다.**

## state의 특징

1. state를 업데이트하기 위해서는 **setState를 사용**해야한다.
   setState를 사용하지 않고 state를 직접적으로 업데이트하면 업데이트가 반영되지 않는다.

2. setState는 **비동기적으로 동작**한다.

   즉, setState를 실행한뒤에 즉시 state을 변경하지않고 일부 작업이 완료된 뒤에 state가 업데이트될 수도 있다는 것이다.

```js
import React, { useState } from "react";

const Test = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <h1>{value}</h1>
      <button
        onClick={() => {
          setValue((prev) => prev + 1);
          console.log(value);
        }}
      >
        Change
      </button>
    </div>
  );
};

export default Test;
```

위 예제에서 버튼을 눌렀을 때 콘솔에 찍힌 값을 무엇일까?  
1로 기대하고 있겠지만 해당 값은 0이다.

그리고 다시 버튼을 누르면 콘솔에 1로 찍힌다.  
이는 setState가 비동기적으로 작동하는 것을 확인할 수 있다.

setState가 비동기적으로 작동하는 것은 리렌더링이 비싼 연산을 하는 동작이기 때문이라고 한다.  
때문에 여러 setState가 하나의 로직에 있다고 할 때 일괄적으로 업데이트(batch)하여 리렌더링시켜주기위해 비동기적으로 작동하게 하는 것이라고 한다.

3. state값은 **불변성을 유지**하며 업데이트되야한다.
   최적화하는데 용이하기 때문이다.

shouldComponentUpdate나 React.memo등을 사용하여 이전 상태값과 비교했을 때 변화가 없으면 해당 컴포넌트를 리렌더링하지 않게 할 수 있다.

state가 불변성이 유지하지않고 이전값을 변경시킨다면 이전 state와 변경되는 state가 같아지기 때문에 위 같은 최적화 작업을 하지 못한다.

또한 react는 virtual DOM을 통해 변경되는 DOM만 효율적으로 업데이트해주는데 이전상태값도 바뀌는 상태값과 같게 만들면 DOM이 업데이트되지 못하게 된다.

덧붙혀 리액트는 함수형 프로그래밍 즉, side effect를 만들지 않는 것을 추구하고 있기 때문에 함수내부에서 외부값을 변경하는 것을 지양한다.

4. 여러 setState가 있을 때 리액트는 각 setState마다 리렌더링하지않고 일괄적으로 업데이트시켜 리렌더링해준다.

## Why State?

리액트에서는 왜 데이터 값을 변경할 때 state를 사용해야하는 것일까?

리액트에서 어떠한 값을 업데이트할 때 state를 활용한다.  
setState를 활용하여 state값을 업데이트하여 반영한다.

하지만 왜 데이터값을 변경시킬 때 꼭 setState를 사용해야하는 것일까?  
그냥 변수로 선언하고 사용하면 안되는 것인가?

```js
mport React from "react";
import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");

let counter = 0;

const handleClick = () => {
  counter++;
  console.log("counter", counter);
  renderContent();
};

const renderContent = () => {
  const content = (
    <div>
      <button onClick={handleClick}>Increment counter</button>
      <div>Counter value is {counter}</div>
    </div>
  );

  ReactDOM.render(content, rootElement);
};

renderContent();


```

위 예제처럼 변수로 선언하여 사용할 수도 있지만 다소 로직이 복잡해보인다.  
하지만 setState를 사용하면 위와 같이 복잡한 로직을 사용하지않고 업데이트된 값을 반영해줄 수 있다.

즉, 값을 업데이트할 때 state를 사용하는 이유는 편리하게 값을 업데이트하기 위해서이다.

## why 불변성 유지

위에서도 언급했듯이 리액트에서는 업데이트된 값을 반영할 때 불변성을 유지해야한다.

불변성을 지킨다는 것은 기존 state값을 변경하는 것이 아닌 새로운 값을 할당하는 것이다.  
불변성이 지켜지지 않고 기존 state값을 건드려 변경하게 되면 리액트에서 값이 바뀌는 것이 감지되지못해서 변경된 값을 반영하지못한다.

```js
import React, { useState } from "react";

const Test = () => {
  const [value, setValue] = useState([1, 2, 3]);

  let number = [1, 2];

  console.log("render");
  return (
    <div>
      <h1>{value}</h1>
      <button
        onClick={() => {
          number.push(3);
        }}
      >
        Change
      </button>
    </div>
  );
};

export default Test;
```

```js
import React, { useState } from "react";

const Test = () => {
  const [value, setValue] = useState([1, 2, 3]);

  return (
    <div>
      <h1>{value}</h1>
      <button
        onClick={() => {
          value.push(4);
          console.log(value);
        }}
      >
        Change
      </button>
    </div>
  );
};

export default Test;
```

위 예제에서 버튼을 누르면 number값이 [1,2,3]으로 바뀌어 h1에 업데이트되길 기대하지만 업데이트된 값은 반영되지않는다.  
useState의 state값을 추출하여 setState를 사용하지않고 state값을 변경하여도 값이 반영이 안된다.

리액트는 값의 변경을 반영할 때 참조값(새로운 메모리 주소를 가진 값)을 비교하여 반영하기 때문에 기존값을 변경하면 새로 만들어진 참조값이 없기 때문에  
업데이트된 값을 반영하지 못한다.

리액트는 상태값을 업데이트할 때 참조값에 대한 얕은 비교를 한다.  
즉, 상태값이 객체라할 때 안의 속성까지 일일히 비교를 하지않고 참조값만 비교하여 상태 변화를 감지한다는 뜻이다.  
그렇기 때문에 상태값을 업데이트할 때 객체에 대한 새로운 참조값을 할당하여 업데이트하는 것이다.

## 🧩 state in Class Component

```js
import React, { Component } from "react";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }
  render() {
    const { number } = this.state;
    return (
      <div>
        <span>{number}</span>
        <button
          onClick={() => {
            this.setState({ number: number + 1 });
          }}
        >
          Increase
        </button>
      </div>
    );
  }
}

export default ClassComponent;
```

![](https://images.velog.io/images/kcj_dev96/post/c09ecccb-2a01-469d-8f5a-e01d45489117/ButtonIncrease.png)

- 클래스형 컴포넌트에서 state를 사용하기 위해서는 **constructor 생성자를 사용**할 수 있다.

- 따라서 constructor()메서드 내에서** state값을 객체 타입으로 설정**해주면 된다.

- state 값을 갱신하고자 할 때에는 여러가지 방법이 있겠지만 예시로는
  **리액트 요소(button)의 이벤트 핸들러를 바인딩하여 setState() 메서드의 인수로 객체를 입력하여 값을 변경해주면** 된다.

- _**참고로 setState는 render()메서드 내에서 사용해야한다.**_

> - React.Component를 상속한 컴포넌트는 **props를 사용하기 위하여 super로 props를 전달받는다.**
>   (_**super class의 인수를 전달받기 위해서는 sub class는 super()메서드의 인수로 받아줘야함.**_)

- _하지만 constructor()메서드를 생략하여도 **React.Component로부터 props를 암묵적으로 상속받아 props를 사용**할 수 있다._

클래스형 컴포넌트에서 위보다 **편하게 state값을 사용하는 방법**은 다음과 같다.

```js
import React, { Component } from "react";

class ClassComponent extends Component {
  state = {
    number: 0,
  };
  render() {
    const { number } = this.state;
    return (
      <div>
        <span>{number}</span>
        <button
          onClick={() => {
            this.setState({ number: number + 1 });
          }}
        >
          Increase
        </button>
      </div>
    );
  }
}

export default ClassComponent;
```

**constructor() 메서드를 생략하여 편리하게 state를 정의할 수 있다.**

---

## 🧩 state in Function Component

> 함수형 컴포넌트에서는 **훅**을 사용하여 state를 관리한다.

```js
import React, { useState } from "react";

const FunctionComponent = () => {
  const chooseColor = ["red", "orange", "yellow", "green", "blue", "purple"];
  const [color, setColor] = useState("black");
  function colorChange() {
    const ran = Math.floor(Math.random() * 6);
    setColor(chooseColor[ran]);
  }
  return (
    <>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: color,
        }}
      ></div>
      <button onClick={colorChange}>Change</button>
    </>
  );
};

export default FunctionComponent;
```

<br/>

### 👉 useState

- useState라는 훅을 사용하여 state를 관리한다.
- useState는 React의 메서드 중 하나이다.

```js
import { useState } from "react";
```

- useState()는 두 개의 요소를 갖는 배열을 반환한다
  > useState() => [지정값 , 지정값을 변경해주는 함수]
- 일반적으로 배열 구조분해를 하여 사용한다.

```js
const [color, setColor] = useState("black");
```

> color : 지정값
> setColor : color를 변경해주는 함수

이처럼 함수형 컴포넌트에서는 **useState를 사용하여 클래스형 컴포넌트보다 간편하게 state를 관리**할 수 있다는 장점이 있다.

---

## 🔑 change props using state

- props는 위처럼 컴포넌트내에서 값을 변경할때에도 쓸 수 있지만
  **부모 컴포넌트의 state 값을 자식컴포넌트의 props로 전달받아 사용**할 수도 있고 이것이 일반적으로 state와 props를 같이 사용하는 방법이다.

**ParentComponent.js**

```js
import React, { Component } from "react";
import ChildComponent from "./ChildComponent";
class ParentComponent extends Component {
  state = {
    number: 0,
  };
  render() {
    const { number } = this.state;
    const changeNumber = () => {
      this.setState({ number: number + 1 });
    };
    return (
      <div>
        <ChildComponent id={number} changeNumber={changeNumber} />
      </div>
    );
  }
}

export default ParentComponent;
```

**ChildCoponent.js**

```js
import React from "react";

const ChildComponent = ({ id, changeNumber }) => {
  return (
    <div>
      <span>{id}</span>
      <button onClick={changeNumber}>Increase</button>
    </div>
  );
};

export default ChildComponent;
```

- **부모 컴포넌트에서 state값(number)과 갱신 함수(changeNumber)를 자식 컴포넌트의 props로 전달**해주어 자식컴포넌트의 props값을 변경할 수 있다.

- 이처럼 props 값을 변경하고자 하면 **부모 컴포넌트에서 state값을 정의하여 자식 컴포넌트에 전달**하면 된다.

이것이 리액트 컴포넌트 사용의 일반적인 메커니즘이다.
👍👍

## Reference

- https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
- [state가 불변성이 유지되야하는 이유](https://hsp0418.tistory.com/171)
- [setState는 비동기적으로 작동한다?](https://betterprogramming.pub/why-dont-react-state-updates-reflect-immediately-9041c4377385#:~:text=Key%20Takeaways,to%20access%20updated%20state%20values.)
