# 🔍 컴포넌트

> 컴포넌트는 하나 이상의 리액트 요소 집합을 반환하는 함수이다.

## 👓 특징

- **컴포넌트는 재사용성이 높아 UI구성에 효율적이다.**
  이는 많고 복잡하게 이루어진 리액트 요소들을 재사용하여 **가독성있고 편리하게** 코드를 작성할 수 있게 해준다.

(복잡하게 리액트 요소들이 구성되있다면 _**기능별로 컴포넌트를 구분하는 것을 권장한다.**_)

- 같은 컴포넌트여도 상태를 달리 하고 싶다면** props로 데이터를 받아 상태를 변경**하면 된다.
- 컴포넌트는 루트 컴포넌트부터 **재귀적으로 렌더링**된다.
- ***라이프 사이클 메서드 API***를 가지고 있어 컴포넌트가 화면에서 나타날 때, 사라질 때, 변화가 일어날 때 주어진 작업들을 처리할 수 있다.

- 컴포넌트는 ***클래스형 컴포넌트***와 ***함수형 컴포넌트***가 있다.
  코드 작성의 편리함,라이프 사이클 메서드의 축약,가독성 등의 장점으로 인하여 요즘은 대부분 ***함수형 컴포넌트***를 사용한다.

- 클래스형 컴포넌트의 **라이프사이클 API**와 기본적인 개념을 알고 가야 함수형 컴포넌트를 이해하기 용이하다.
  또한 클래스 컴포넌트는 **라이플사이클 API**를 사용하면 함수형 컴포넌트보다 세부적인 구현이 가능하다.

라이플사이클 API는 추후에 따로 다뤄보기로 하고 **클래스형 컴포넌트와 함수형 컴포넌트에 대해 간략히 알아보자.**

## 👀 Class Component

```js
import React, { Component } from "react";

class App extends Component {
  render() {
    return <div></div>;
  }
}
```

Class Coponent의 생김새는 이러하다.
React.Coponent를 상속받아 해당 기능들을 사용할 수 있다.

javascript에서 class는 인스턴스를 반환해준다.

```js
class Person {
  constructor(height, weight) {
    this.height = height;
    this.weight = weight;
  }
  introduce() {
    console.log("Hello, I'm Person");
  }
}

const me = new Person(184, 75);
```

이러한 식으로 class는 new 연산자와 함께 **인스턴스를 반환**해주는데
**Class Component는 리액트 DOM요소들을 반환한다.**

이는 리액트 내부에서 new 연산자를 쓰지 않아도 DOM요소들을 반환하도록 설계가 되있다고 한다.

어떻게 설계가 되있는지 궁금하지만 해당 내용은 추후에 더 살펴봐야겠다.

### render()

```js
import React, { Component } from "react";

class App extends Component {
  render() {
    return <div></div>;
  }
}
```

Class Component에서 가장 중요한 메서드는 **render메서드**이다.
**render()**는 **리액트 요소들을 반환하여 렌더링하게 해주는 역할**을 한다.

## 🎤 정리

### 컴포넌트란 무엇인가?
