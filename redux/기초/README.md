# 📝 리덕스 개념 알아보기

## 리덕스

- 리액트 상태 관리 라이브러리

- 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜서 관리

- 전역 상태를 관리할 때 효과적

- Context API보다 상태를 더욱 체계적으로 관리(프로젝트가 클 경우에 리덕스를 사용하는 편이 더 좋다.)

- 미들웨어 기능을 제공하여 비동기 작업을 효율적으로 관리

- state값을 객체에 여러가지 값을 담고 reducer에서 switch문으로 여러가지 상황에 객체의 각기 다른 state값을 변경시킬 수 있기 때문에 여러 state값을 관리하기 좋다.

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
