# 리덕스

리덕스는 리액트 상태관리 라이브러리이다.  
 다양하고 전역적인 상태값들을 관리해주기 위하여 사용된다.

## 왜 리덕스를 사용할까?

### 전역 상태값 관리

단순히 다양한 상태만을 관리해주기 위해서라면 각 컴포넌트내에서 useState나 useReducer를 사용하여 관리해주면 된다.  
하지만 다양할 뿐만 아니라 상태값을 여러 컴포넌트내에서 공통적으로 사용해야할 상황이 빈번하다.

리액트 자체가 state라는 데이터 중심으로 화면을 보여준다.  
이 state는 각 컴포넌트에서 한 번만 쓰이는 것이 아닌 여러 컴포넌트를 넘어서 다른 페이지에서도 사용된다.  
하지만 다른 컴포넌트에 state를 전달하기 위해서 props로 전달해야한다.

이 때 컴포넌트의 중첩도가 높다면 props drilling이라는 이슈가 발생한다.  
props drilling이란 어떤 데이터값을 다른 컴포넌트로 넘겨주기 위해 실제로 해당 데이터를 사용하지않은 컴포넌트에도 props로 전달하여야하는 이슈이다.
즉, 컴포넌트의 중첩도가 높다면 사용하지도 않은 컴포넌트들에 귀찮게 계속 state값을 전달해줘야한다.

이러한 이슈를 해결하기 위해 redux라는 라이브러리를 사용할 수 있다.  
리덕스는 어떠한 상태값을 store라는 곳에 저장하고 이 상태값을 사용하고 싶은 컴포넌트에서 불러와 사용할 수 있다.  
즉 , 상태값을 사용하기 위해 컴포넌트끼리 불필요하게 전달할 필요가 없어졌다는 것이다.  
또한 상태값을 조회할 뿐만 아니라 dispatch라는 함수를 통해 전역 상태값을 변경해줄 수 있다.

이렇게 전역적으로 상태값을 사용할 수 있는 특징이 리덕스 사용 이유 중 가장 크다고 생각한다.

### redux와 context API

그렇다면 단지 전역적으로 상태값을 사용하기 위해서라면 리액트 자체의 Context API를 사용하면 되지 않을까?  
 context API를 보통 사용할 때, 어떠한 context를 생성하고 해당 context의 값을 useState나 useReducer의 state값에 저장하여  
 해당 상태값을 사용할 컴포넌트에서 조회하여 사용한다.

context API만으로도 전역적인 상태값을 사용하기가 충분하다고 느껴진다.  
하지만 프로젝트가 규모가 크고 관리해야할 전역전인 상태값이 다양하고 많아진다면 나는 리덕스가 더 사용하기 좋다고 생각이 들었다.

**상태관리 로직분리**

리덕스는 상태관리 로직을 따로 분리할 수 있는 슬라이스가 있어 상태관리 로직과 UI로직을 구분해줄 수 있다.  
 하지만 context API의 경우에는 전역전인 컨텍스트만 제공할 뿐 컨텍스트안에서 상태관리 로직을 구현하진 않는다.  
 때문에 상태관리로직이 복잡해지는 경우 컴포넌트가 여러 가지 로직이 뒤섞이는 것보다 분리해주는 것이 더 좋다 생각되어 리덕스를 사용한다.

**리덕스 데브툴과 상태 변화 추적**

리덕스 데브툴은 리덕스 상태값을 쉽게 추적하는데 도움을 주는 도구이다.  
이는 사용자의 어떤 인터렉션이 발생했을 때 어떠한 액션이 디스패치되고 어떠한 상태값이 변화가 되었는지 추적하기 쉽게 해준다.  
하지만 context API는 리액트 데브툴로 사옹해야해서 여러 상태값이 뒤섞여 전역 상태값을 분리해 관찰하기 힘들다.

리덕스는 이처럼 상태 변화 추적에 용이하다.  
어떠한 인터렉션이 발생했을 때 어떤 액션이 발생하고 어떤 상태값이 바뀌는지 추적할 수 있으니 말이다.

즉, 리덕스는 상태값에 대한 변화를 명시적으로 보여준다고 생각한다.

**미들웨어**

미들웨어는 어떤 액션이 디스패치되어 스토어로 보내기전에 추가적인 작업을 할 수 있게 해주는 함수이다.  
주로 비동기 로직을 구현하는데 많이 사용되며 어떠한 액션이 디스패치되기전에 추가적인 로직을 구현하게 할 수 있게 해준다.  
이러한 비동기 로직을 context API를 쓰면서 구현하려면 컴포넌트단에서 상태값에 대한 비동기 로직을 구현해야한다.

이런 디테일적인 기능이 있는 것이 리덕스의 또 하나의 장점이라고 할 수 있다.  
다만 미들웨어도 redux-thunk나 redux-saga와 같은 추가적인 라이브러리를 설치해야하고 나름 러닝커브가 있다는 단점도 있다.

**그래서 context? redux?**

개인적으로는 전역적으로 관리해야할 상태값이 복잡하고 다양하다면 리덕스를 사용하는 것이 좋고  
 관리해야할 전역 상태값이 복잡하지 않다면 context API를 사용하는 것이 더 좋다고 생각한다.

- https://dev.to/ruppysuppy/redux-vs-context-api-when-to-use-them-4k3p

## 동작원리

dispatch라는 함수가 액션이라는 객체를 인자로 받아 store로 보내주면 store에서 보내준 액션과 관련된 상태값(state)을 리듀서 로직대로 처리해준다.

미들웨어는 주로 비동기 로직을 구현할 때 사용하는데 액션이 디스패치로 스토어로 보내지는 중간에서 비동기 처리를 하도록 해준다.

따로 미들웨어를 만들어 비동기 처리를 해주는 이유는 redux slice내에서 state관련 비동기 로직을 처리할 수 없기 때문이다.

## KeyWord

### 액션(action)

```js
{
	type: "TOGGLE_VALUE"
},
  {
  type: "ADD_TODO"
   ,payload : "firstTODO"
  }
```

- 상태에 어떤 변화가 필요하면 액션이 발생

- 하나의 **객체**로 표현

- 액션 객체는 **type 필드**를 반드시 가지고 있어야함.

- 또한 **payload라는 필드**를 가질 수 있으며 이는 추가적인 정보를 전달하여 state를 업데이트하는데에 사용된다.

- 액션 이름은 문자열 형태로, 주로 대문자로 작성하며 액션 이름은 고유해야 한다.

### 액션 생성 함수(action creater)

- 액션 생성 함수는 액션 객체를 만들어 주는 함수

```js
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}
```

어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있다.

이러한 일을 방지하기 위해 이를 함수로 만들어서 관리한다.
**액션이 필요할 때마다 함수를 실행**한다.

### 리듀서 (reducer)

```js
const initialState = {
  counter: 1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}
```

- **state값을 변경**해주는 함수

- 액션을 만들어서 발생시키면 리듀서가** _현재 상태와 전달받은 액션 객체_**를 파라미터로 받아옴.
  두 값을 참고하여 새로운 상태를 만들어서 반환해줌.

- 리듀서는 **순수함수**여야한다.

- 리듀서에서 상태값을 변경할 때 기존 react에서 상태값을 다룰때처럼 불변성을 유지해야한다.

- 리듀서안에서 상태값을 변경할 때에 **비동기 로직, 임의의 값 계산, 부수효과 발생시키면 안된다.**

> - 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다. function reducer(state,action)

- 파라미터 외의 값에는 의존하면 안된다.
- 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 한다.

예를 들어 리듀서 함수 내부에서 랜덤 값을 만들거나, Date 함수를 사용하여 현재 시간을 가져오거나,
네트워크 요청을 한다면, 파라미터가 같아도 다른 결과를 만들어 낼 수 있기 때문에 사용하면 안된다.

이러한 작업은 리듀서 함수 바깥에서 처리해주어야 한다.

액션을 만드는 과정에서 처리해도 되고, 리덕스 미들웨어에서 처리해도 된다.
주로 네트워크 요청과 같은 비동기 작업은 미들웨어를 통해 관리한다.

### 스토어(store)

- 프로젝트에 리덕스를 적용하기 위해 스토어를 만든다.

- 한 개의 프로젝트에는 단 하나의 스토어만 가질 수 있다.

- 스토어 안에는 현재 애플리케이션 모든 상태값과 리듀서가 들어가 있으며,
  그 외에도 몇 가지 중요한 내장 함수를 지닌다.

### 디스패치 (dispatch)

- 스토어 내장 함수 중 하나

- 액션을 발생시키는 것 dispatch(action)

- 액션 객체를 파라미터로 넣어서 호출

- 이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 준다.

### 구독(subscribe)

- 스토어 내장 함수 중 하나

- subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해주면,
  이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출된다.

## Redux without React

리액트없이 vanilla javascript만을 사용하여 redux를 사용해보자.

- tech : parcel

* npm init -y
* npm i parcel
* npm i redux

**서버 실행**

parcel index.html

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div class="toggle"></div>
    <hr />
    <h1>0</h1>
    <button id="increase">+1</button>
    <button id="decrease">-1</button>

    <script src="./index.js"></script>
  </body>
</html>
```

**index.css**

```css
.toggle {
  width: 100px;
  height: 100px;
  border: 2px solid black;
  box-sizing: border-box;
  border-radius: 64px;
}

.toggle.active {
  background-color: aquamarine;
}
```

**index.js**

```js
// 스토어를 만드는 모듈
import { createStore } from "redux";

// DOM
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// action name
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE ";
const DECREASE = "DECREASE";

// action creator
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// initial value
const initialState = {
  toggle: false,
  counter: 0,
};

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };

    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };

    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };

    default:
      return state;
  }
}

// create store
const store = createStore(reducer);

// render function
const render = () => {
  const state = store.getState(); // 현재 상태 불러오기
  console.log("render");
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }

  counter.innerText = state.counter;
};

//subscribe
store.subscribe(render); // 스토어의 상태가 바뀔 때마다 render함수 호출

// dispatch
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
```

## Summary

- redux는 상태값을 전역적으로 사용할 수 있고 여러 상태값을 체계적으로 관리할 수 있다.

- 리덕스는 단방향 데이터의 흐름을 가지고 있다.(react의 특성)

- state값은 불변성을 유지해야한다.

- reducer는 부수효과 및 비동기 로직을 가지고 있으면 안된다.

## Reference

- 리액트를 다루는 기술/리덕스 라이브러리 이해하기(16장)
- https://redux.js.org/tutorials/essentials/part-1-overview-concepts#when-should-i-use-redux
