# redux-thunk

**redux-thunk**는 **비동기 작업**을 처리할 때 가장 많이 사용하는 미들웨어이다.  
객체가 아닌 **함수 형태의 액션을 디스패치**할 수 있게 해준다.

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
redux-thunk는 이러한 로직으로 미들웨어에서 알아봤던 것처럼 디스패치할 때 해당 함수를 바로 실행시키는 것이 아닌 특정 시간뒤인 리듀서로 보내기전에 실행시키게 할 수 있는 것이다.

redux-thunk를 사용하기 위해서는 thunk 함수를 만들어 디스패치하면 된다  
그러면 미들웨어가 그 함수를 전달받아 store의 dispatch와 getState를 파라미터로 넣어서 호출해준다.

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
