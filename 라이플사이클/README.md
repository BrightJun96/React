# ⭐️ Life Cycle Method

> - **생명주기 메서드**란 컴포넌트가 화면에서** 나타낼부터 없어질 때까지의 생명주기**를 표현한 메서드들이다.

- **클래스 컴포넌트에서만 사용**할 수 있으며 함수형 컴포넌트에서는 이와 비슷하게 구현할 수 있는 ***Hook***이 존재한다.

## 📏 용도

컴포넌트가 **마운트(처음 렌더링될 때)될 때, 업데이트될 때(props 및 state 등이 바뀌는 경우)** 등의 주기에서 어떠한 동작을 할 수 있도록 해준다.

즉, **특정 시점에 해당 메서드를 사용하여 원하는 기능을 구현**할 수 있다.

---

## ⚙️ 기능

- Mount : 컴포넌트가 **화면에 나타냈을 때**
- Update : 컴포넌트가 **업데이트** 됬을 때
- Unmount : 컴포넌트가 **사라질 때**

> 컴포넌트가 업데이트 될 경우

- **props **값이 변경될 때
- **state **값이 변경될 때
- **부모 컴포넌트가 리렌더링**될 때

---

### 🔛 Mount

#### ✏️ constructor()

`constructor(props)`

- **state 설정과 메서드 바인딩**을 하는 곳이다.
- 메서드를 바인딩하거나 state를 초기화하는 작업이 없다면, 해당 React 컴포넌트에는 생성자를 구현하지 않아도 된다.
- **마운트되기전에 호출**된다.
- **super(props)를 호출**해야한다.
  그렇지 않으면 props를 사용할 수 없다.
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
