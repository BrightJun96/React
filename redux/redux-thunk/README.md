# redux-thunk

**redux-thunk**는 **비동기 작업**을 처리할 때 가장 많이 사용하는 미들웨어이다.  
redux-thunk미들웨어는 객체가 아닌 **함수 형태의 액션을 디스패치**할 수 있게 해준다.

thunk는 특정 작업을 **나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것**을 의미한다.

```js
const addOne = (x) => x + 1;
function addOneThunk(x) {
  const thunk = () => addOne(x);
  return thunk;
}

const fn = addOneThunk(1);

setTimeout(() => {
  const value = fn();
  console.log(value);
}, 1000);
```

위 처럼 addOne이라는 함수를 바로 실행시키지않고 반환값으로 할당하여 나중에 실행시킬 수 있도록 한다.
redux-thunk는 이러한 로직으로 디스패치할 때 해당 함수를 바로 실행시키는 것이 아니라 리듀서로 보내기전에 실행시키게 할 수 있는 것이다.

redux-thunk를 사용하기 위해서는 thunk 함수를 만들어 디스패치하면 된다  
그러면 미들웨어가 그 함수를 전달받아 store의 dispatch와 getState를 파라미터로 넣어서 호출해준다.  
redux-thunk미들웨어를 스토어에 적용하면 내부적으로 thunk함수에 인자로 dispatch와 getState를 전달하도록 되어있다.

```js
const thunk = () => (dispatch, getState) => {
  // 현재 상태를 참조할 수 있고 새 액션을 디스패치할 수도 있다.
};

dispatch(thunk());
```

위 예시에서 thunk라는 함수를 dispatch하면 `(dispatch, getState) => {}`함수를 반환한다.  
그리고 그 다음 `(dispatch, getState) => {}`함수를 실행시킬 수 있기 때문에 비동기, 다른 액션 디스패치 등 여러가지 기능을 할 수 있는 것이다.

example

```js
const increaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(increase()), 1000);
};
```

## redux-thunk 함수 내부 로직

dispatch로는 액션 객체만을 보내야한다.  
그런데 thunk는 어떻게 함수를 dispatch로 보낼 수 있는 것일까?  
thunk함수 내부를 살펴보면 **dispatch로 액션 객체가 아닌 함수를 보낼 수 있는 이유**를 알 수 있다.

```js
const thunkMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // If the "action" is actually a function instead...
    if (typeof action === "function") {
      // then call the function and pass `dispatch` and `getState` as arguments
      return action(dispatch, getState);
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action);
  };
```

dispatch로 보낸 action이 function이라면 action을 호출하고 dispatch와 getState를 인자로 전달해주는 것을 확인할 수 있다.  
이러한 내부로직 때문에 dispatch로 함수를 보내줄 수 있는 것이다.

즉, redux-thunk 미들웨어를 store에 적용하면 dispatch를 할 때 함수를 보내면 해당 함수를 호출하여 로직을 실행하게 해주고  
액션 객체를 보내면 원래대로 dispatch하게 하는 것이다.

## 그냥 미들웨어 대신 thunk를 사용하는 이유는?

미들웨어를 개발자 스스로 만들어서 사용해도 된다.  
왜냐하면 thunk 미들웨어는 내부적으로 간단하기 때문이다.

하지만 rtk를 기본적으로 설치하면 thunk 미들웨어가 기본적으로 내장되어있기 때문에 thunk함수를 만들어 사용하면 된다.  
즉, 내장되어있으니 굳이 미들웨어를 만들어 적용할 필요가 없다는 것이다.

## 그래서 thunk를 사용하면 좋은 점은?

- 상태 관련 복잡한 로직을 thunk함수내에서 구성하여 컴포넌트에서는 간단히 thunk함수만 import하게 해준다.  
  이는 로직을 분리하여 컴포넌트단 로직과 상태관리 로직을 분리하여 유지보수를 쉽게 해준다.

- 또한 비동기 로직을 가능하게 해준다.

- 다양한 액션을 디스패치하도록 해준다.

- getState로 상태값을 조회하여 원하는 상태값 활용해 원하는 로직을 구현할 수 있게 해준다.
