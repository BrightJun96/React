# Life Cycle Method

- **생명주기 메서드**란 컴포넌트가 화면에서 나타날부터 없어질 때까지의 생명주기를 표현한 메서드들이다.

- **클래스 컴포넌트에서만 사용**할 수 있으며 함수형 컴포넌트에서는 이와 비슷하게 구현할 수 있는 **_Hook_**이 존재한다.

## 용도

컴포넌트가

- 마운트(처음 렌더링될 때)될 때
- 업데이트될 때(props 및 state 등이 바뀌는 경우)
- 사라질 때

  의 주기에서 어떠한 동작을 할 수 있도록 해준다.

즉, 컴포넌트가 처음 나타날때부터 없어질때까지의 과정을 메서드로 나타낸 것이며 **이러한 특정 시점에 해당 메서드를 사용하여 해당 주기에 원하는 기능을 구현**할 수 있다.

## 기능

- Mount : 컴포넌트가 **화면에 나타냈을 때**
- Update : 컴포넌트가 **업데이트** 됬을 때
- Unmount : 컴포넌트가 **사라질 때**

#### 컴포넌트가 리렌더링 되는 경우

- **props**값이 변경될 때
- **state**값이 변경될 때
- **부모 컴포넌트가 리렌더링**될 때

## class와 class component에서의 class 문법 적용

class 컴포넌트의 라이프 사이클을 알아보기전에 class 문법에 대해 간략하게 알아보자.

```js
class Person {}
```

자바스크립트의 프로토타입 기반 문법을 클래스 기반 문법처럼 사용할 수 있도록하는 문법이다.
클래스 기반 객체지향 프로그래밍을 제시하며 ES6문법이다.

생성자 함수와 비슷하게 프로토타입 기반 인스턴스를 생성한다.

### extends,super keyward

class를 extends,super 키워드로 다른 class에 상속할 수 있다.
extends라는 키워드를 사용하여 상속을 통해 기존 클래스를 확장할 수 있다.

서브클래스내에서 super를 호출하면 수퍼클래스(기존 클래스)의 constructor를 호출한다.
그리고 수퍼클래스의 constructor내에서 사용할 수 있는 속성들을 서브 클래스에 전달할 수 있다.

```js
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Sub extends Base {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}

const instance = new Sub(1, 2, 3);
// instance.a = 1; instance.b = 2; instance.c = 3
```

클래스 컴포넌트에서 constructor내에서 state와 props를 정의한다.
이러한 원리로 클래스 컴포넌트에서 super에 props를 할당하며 컴포넌트에 전달해 줄 수 있는 것이다.

```js
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
}
```

클래스형 컴포넌트에서 constructor를 작성할 때 반드시 super(props)를 호출해 주어야 한다.
이 함수가 호출되면 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출하게 해준다.

### class 몸체내에서 정의가능한 메서드

클래스 몸체에서 정의할 수 있는 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드 세가지가 있다.

- constructor는 인스턴스에 대한 프로퍼티를 지정해줄 수 있는 메서드이다.
- 프로토타입은 프로퍼티나 메서드를 상속할 수 하는 메서드이다.
- 정적 메서드는 class의 식별자에서만 바로 사용할 수 있는 메서드이다. 인스턴스에서는 사용할 수 없다.

**class**

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hello,${this.name}`);
  }

  // 정적 메서드
  static sayHello() {
    console.log("Hello, World!");
  }
}

const jev = new Person("jev");

// jev.name => 'jev'
// jev.sayHi() => 'Hello, jev'
// Person.sayHello() => Hello,World
```

**생성자 함수**

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Hello,${this.name}`);
};

Person.sayHello = function () {
  console.log("Hello, World!");
};
```

위 예시를 봤을 때 class가 더 명시적이라는 것을 확인할 수 있다.

인스턴스에 대한 속성을 정의하는 생성자를 constructor라고 명시적으로 키워드를 지정해준 부분과 정적 메서드를 static이라는 키워드를 사용한 부분에서 사용 역할을 명확히ㅣ 구분할 수 있다.

또한 클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.

### 클래스 필드

class 몸체 내부에서 선언하여 프로토타입이 아닌 인스턴스의 프로퍼티를 지정할 수 있는 필드이다.

```js

class Person(){

  type = 'person'

  sayHi = () => {
    console.log('Hello');
  }
}



const person1 = new Person()

person1.type // 'person'
```

클래스 필드 문법을 사용하여 클래스 컴포넌트내에서 state를 몸체 내부에서 선언하여 사용할 수 있다.

```js
class Counter extends Component {
  state = { number: 0, checked: false };

  render() {
    const { number, checked } = this.state;
  }
}
```

#### [this bind issue](https://reactjs.org/docs/faq-functions.html#how-do-i-bind-a-function-to-a-component-instance)

this는 호출부에 따라 결정되므로 정의한 핸들러가 html요소의 이벤트로 등록되는 과정에서 메서드와 this관계가 끊어진다.
이벤트가 발생할 때 핸들러가 실행되는 것이므로 this는 인스턴스를 가리킬 수 없는 것이다.
그래서 클래스 필드 문법을 활용하면 이벤트 핸들러를 참조할 때 render()에서 this를 undefined되지 않게 하기 위해 constructor에서 바인딩할 필요가 없어진다.

이 때 주의할 것은 핸들러를 정의할 때 **함수 선언문이 아닌 함수 표현식으로 함수를 생성해야한다**는 것을 명심해야한다.

**this bind**

```js
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("Click happened");
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

**Class Properties (ES2022)**

```js
class Foo extends Component {
  handleClick = () => {
    console.log("Click happened");
  };
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

### private

class내부에서만 사용할 값은 변수앞에 #을 붙여 사용하면 된다.

```js
class Person {
  #name = "";

  constructor(name) {
    this.#name = name; // 참조가능
  }
}

const jev = new Person("jev");

jev.#name; // 참조 불가
```

## Mount

### constructor()

`constructor(props)`

- **state 설정과 메서드 바인딩**을 하는 곳이다.
- 메서드를 바인딩하거나 state를 초기화하는 작업이 없다면, 해당 React 컴포넌트에는 생성자를 구현하지 않아도 된다.
  클래스 필드 문법(ES2022)을 사용하면 constructor를 사용하지 않아도 된다.
- **마운트되기전에 호출**된다.
- **super(props)를 호출**하며 props를 전달하여 props를 사용한다.(클래스 몸체에서 바로 선언하면 사용할 수 있다.)
- constructor() 내부에서 **setState()를 호출하면 안된다.**

#### ✏️ getDerivedStateFromProps

`static getDerivedStateFromProps(props, state)`

- **props 값을 state에 쓰고 싶을 때** 사용한다.
  (이러한 경우는 잘 없다.)
- getDerivedStateFromProps는 **최초 마운트 시와 갱신 시 모두에서 render 메서드를 호출하기 직전에 호출**된다.

- props값을 state에 쓰는 이유는 뭘까?
  > 성능을 개선시키기위해서 쓰려한다.
  > state를 setState()로 업데이트하면 리렌더링이 된다.
  > (state가 변경되면 리렌더링됨.)
  > 때문에 props로 초기 state 값을 넣주고 props값에 따른 state변경에 의존하여 성능을 개선시키기위해 사용한다.
  >
  > > 하지만 이는 memoization으로 해결할 수 있다.

#### ✏️ render()

`render()`

- class component에서 **유일하게 존재해야하는 메서드**이다.
- JSX를 사용하여 **리액트 요소들을 렌더링**할 수 있다.
- render() 메서드는 **순수해야한다**.
  **state값을 변경하면 안되고 호출할 때마다 동일한 결과를 반환**해야한다.
  또한 **브라우저와 직접적으로 상호작용하지 않는다.**
  > **브라우저와 상호 작용이 필요한 작업**은 ComponentDidMount나 다른 생명주기 메서드에서 구현해야한다.
  > 리액트 요소들이 **렌더링된 이후에 요소들이 완성**되기 때문에 이후의 작업에서 요소들을 건드리는 작업을 해야한다.

#### ✏️ ComponentDidMount

`componentDidMount()`

- 컴포넌트가 **마운트된 직후에 해당 메서드가 호출**된다.
- **DOM 노드가 있어야 하는 초기화 작업**은 이 메서드에서 이루어지면 된다.
- **외부에서 데이터를 불러와야 한다면,** 네트워크 요청을 보내기 적절한 위치이다.(비동기 처리)

---

### ⏩ Update

#### ✏️ getDerivedStateFromProps

`static getDerivedStateFromProps(props, state)`

- **props 값을 state에 쓰고 싶을 때** 사용한다.
  (이러한 경우는 잘 없다.)
- getDerivedStateFromProps는 **최초 마운트 시와 갱신 시 모두에서 render 메서드를 호출하기 직전에 호출**된다.

#### ✏️ shouldComponentupdate

`shouldComponentUpdate(nextProps, nextState)`

- shouldComponentUpdate()는 **props 또는 state가 새로운 값으로 갱신되어서 렌더링이 발생하기 직전에 호출**된다.
- 이 메서드는 **초기 렌더링 또는 forceUpdate()가 사용될 때**에는 호출되지 않는다.

#### ✏️ render()

`render()`

- class component에서 유일하게 존재해야하는 메서드이다.
- JSX를 사용하여 리액트 요소들을 렌더링할 수 있다.
- render() 메서드는 순수해야한다.
  state값을 변경하면 안되고 호출할 때마다 동일한 결과를 반환해야한다.
  또한 브라우저와 직접적으로 상호작용하지 않는다.
  > **브라우저와 상호 작용이 필요한 작업**은 ComponentDidMount나 다른 생명주기 메서드에서 구현해야한다.
  > 리액트 요소들이 **렌더링된 이후에 요소들이 완성**되기 때문에 이후의 작업에서 요소들을 건드리는 작업을 해야한다.

#### ✏️ getSnapShotBeforeUpdate

` getSnapshotBeforeUpdate(prevProps, prevState)`

- getSnapshotBeforeUpdate()는 **가장 마지막으로 렌더링된 결과가 DOM 등에 반영되기 전에 호출**된다.
- 이 메서드를 사용하면 컴포넌트가 DOM으로부터 스크롤 위치 등과 같은 정보를 이후 **변경되기 전에** 얻을 수 있다.
- 이 생명주기 메서드가** 반환하는 값은 componentDidUpdate()에 인자로 전달**된다.

#### ✏️ componentDidUpdate

`componentDidUpdate(prevProps, prevState, snapshot)`

- 이 메서드는 **갱신이 일어난 직후에 호출**된다.
  최초렌더링에는 호출되지 않는다.
- 컴포넌트가 갱신되었을 때 **DOM을 조작하기 위해** 해당 메서드를 활용하면 좋다.
- setState()를 사용할 수 있지만, **추가적인 렌더링이 발생하여 성능 저하를 발생시킬 수 있고 무한 렌더링을 발생**시킬 수 있다.
  때문에 **조건문**으로 조건을 걸어 렌더링 해줘야한다.
  (state가 변경되면 리렌더링됨.)
- **snapshot : getSnapshotBeforeUpdate()의 반환값**

---

### ⏹ UnMount

#### ✏️ ComponentWillUnmount

`componentWillUnmount()`

- 컴포넌트가 **마운트 해제되어 제거되기 직전에 호출**된다.
- 이 메서드 내에서 **타이머 제거, 네트워크 요청 취소, componentDidMount() 내에서 생성된 데이터 불러오기 해제** 등 필요한 모든 정리 작업을 수행한다.

- 이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 **setState()를 호출하면 안된다. **
