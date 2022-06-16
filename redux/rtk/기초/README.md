# Redux Tool Kit(RTK)

RTK은 redux 공식문서에 추천하는 기능이다.

RTK는 redux의 핵심적인 부분과 redux app을 만들 때에 필수적인 요소를 담고 있다.

또한 redux를 사용하는데에 더 쉽고 실수를 방지하도록 사용할 수 있게 해준다.

store 설정 , reducer , immutable state logic , 여러가지 state 관리를 더 쉽게 할 수 있게 해준다.

먼저 RTK를 설치해준다.
**RTK install**
`npm install @reduxjs/toolkit`

**NOTE : CRA로 프로젝트를 구성하였음.**
RTK기반으로 CRA를 구성하기 위해 일일히 라이브러리를 설치할 필요없이 다음 명령어로 install하면 된다.
`npx create-react-app folder-name --template redux`

알아서 RTK와 react-redux 라이브러리가 설치된다.

## Create a Redux Store

다음으로 redux store를 만들어준다.

RTK로부터 configureStore란 API를 가져온다.

configureStore는 store를 생성해주는 API이다.

인자로 객체를 할당하고 reducer 프로퍼티를 설정해준 뒤 value값으로 객체를 선언해준다.

`src/app/store.js`

```js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: {} });

export default store;
```

configureStore API는 자동으로 redux devtools를 실행할 수 있게 해준다.

## Provide the Redux Store to React

다음으로 기존 redux와 같이 store를 가져와 Provider로 감싸준다.

`index.js`

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Create a Redux State Slice

`src/features/counter/counterSlice.js` 경로에 파일을 생성해준다.

**createSlice라는 API**를 가져온다.

action과 action function을 생성할 필요없이 해당 API안에서 state update logic을 구성할 수 있다.

createSlice()의 인자로 객체를 할당해준다.

객체에는 세가지 프로퍼티를 생성해준다.

- **name**
  action type을 생성하는데에 사용되며 입력한 문자열은 **액션 타입의 접두어**로 사용된다.(`(name)/(reducers의 method명)`)  
  예를 들어 `name : counter`라고 하였을 때 reducer의 메서드에 increase와 decrease가 있다하면 액션 타입은 자동으로  
  `counter/increase`, `counter/decrease`로 만들어진다.

  ``

  ```

  ```

- **initialState**  
  **초기 state**값을 입력해준다.  
  이 때 변수명은 **initialState**이어야한다.  
  그렇지 않으면 에러가 난다.

- **reducers**

여기서 reducers는 **액션 생성함수와 reducer의 역할을 동시**에 한다고 생각하면 될 것 같다.

다음 코드를 보자.

`src/features/counter/counterSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 셀렉터 함수
export const selectCount = (state) => state.count.value;

// 액션생성함수
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

//리듀서
const counterReducer = counterSlice.reducer;
export default counterReducer;
```

위 코드를 보았을 때, 액션과 액션 생성함수가 없다.
RTK는 Slice API가 액션과 액션 생성함수를 내부적으로 생성해준다.

액션이 생성되는 로직은 위 name("counter")와 reducers의 increment 필드가 합쳐져 "counter/increment"라는 액션이 내부적으로 생성되는 것이다.

**액션생성함수 가져오기**
dispatch하기 위하여 reducers에서 생성한 액션생섬함수를 export해준다.

여기서 액션생성함수를 가져오기 위해서는 Slice에 접근해야한다.
가져오는 방법은 Slice.actions(counterSlice.actions)이다.

구조분해로 위에서 선언한 액션생성함수를 가져온다.

**리듀서 가져오기**
또한 해당 reducer도 export해준다.

그러기 위해서 Slice.reducer(counterSlice.reducer)에 접근하면 된다.

**셀렉터함수 만들기**
`export const selectCount = state => state.count.value`
위 예제에서 셀럭터함수라는 것을 만들었다.
이는 해당 상태값을 사용하는 컴포넌트에서 useSelect에 편하게 사용하기 위해서 만들어준다.

위와 같이 만들어준 selector 함수는
from
` const count = useSelector((state) => state.counter.value);`
to
` const count = useSelector(selectCount);`
이런식으로 편하게 활용할 수 있다.

**mutable or immutable**
위 액션 생성함수에서 state를 업데이트하는 것을 보면 불변성을 지키지 않으며 state를 업데이트하는 것을 볼 수 있다.
(state를 업데이트할 때는 불변성을 지켜야함.)

이는 createSlice API 내부적으로 immer의 기능을 가지고 있기 때문이다.(mutable하게 업데이트해줄 수 있는 기능)

## Add Slice Reducers to the Store

해당 slice를 store에 저장해준다.

`src/app/store.js`

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

const store = configureStore({ reducer: { counter: counterReducer } });

export default store;
```

reducer 프로퍼티에 value값으로 객체를 선언하여 reducer를 할당해준다.

## Use Redux State and Actions in React Components

다음으로 기존처럼 useSelector와 useDispatch를 가져와 state update를 해준다.

코드는 다음과 같다.

`src/Counter.js`

```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  selectCount,
} from "./features/counter/counterSlice";

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <span>{count}</span>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
      </div>
      <div>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
```

useSelector로 state값을 조회할 때 ,** `configureStore` reducer 필드에서 정의한 리듀서 이름으로 state값을 조회**하면 된다.

## Writing Async Logic with Thunks

기존에 비동기 로직을 실행하기 위해서 react에서 미들웨어를 적용하는 작업을 해줬어야 했다.

하지만 **RTK의 configureStore API가 내부적으로 thunk에 대한 미들웨어 셋업**을 해주기 때문에 따로 미들웨어를 적용할 필요없이 thunk함수를 선언하여 사용하면 된다.

Thunk without applying middleware

```js
const fetchUserById = (userId) => async (dispatch, getState) => {
  try {
    const user = await userAPI.fetchById(userId);
    dispatch(userLoaded(user));
  } catch (err) {}
};
```

- configureStore이 thunk 셋업을 해줌.
- thunk는 slice와 분리하여 작성

### createAsyncThunk

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authAPI from "../../lib/api/auth";

const initialState = {
  auth: "",
  authError: "",
};

export const register = createAsyncThunk(
  "auth/Login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authAPI.register({ username, password });
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);

      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authLoginSlice = createSlice({
  name: "authLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.authError = action.payload;
      });
  },
});
```

`createAsyncThunk(actionType,payloadCreator,options)`

_**각 인자의 역할**_

- 첫 번째 인자(actionType) | 액션 객체

- 두 번째 인자(payloadCreator) | 비동기 로직을 실행할 콜백함수

- 세 번재 인자(obtion object) | 추가할 옵션

createAsyncThunk는 thunk 함수를 간단하게 쓸 수 있는 API이다.
인자는 위 3가지 인자를 할당할 수 있으며 세번째 인자는 선택적 옵션이다.

두번째 인자 `payloadCreator(arg,thunkAPI)`는 비동기 로직을 실행할 함수로서 **첫번째 인자에는 보내고 싶은 데이터값을 할당**하면 되고** 두번째 인자 thunkAPI는 여러가지 기능을 할 수 있는 객체**이다.

특히 **에러값을 설정**하기 위해서는 `thunkAPI.rejectWithValue()`를 활용하면 된다.

`thunkAPI.rejectWithValue()`인자 안에 에러값을 할당하여 `extraReducer`에서 **해당 에러값을 상태값으로 사용**할 수도 있겠다.

_**createAsyncThunk가 반환하는 것은?**_

createAsyncThunk는 **thunk함수를 반환**한다.

```js
const registerThunk = createAsyncThunk(actionType, payloadCreator, options);
```

이 thunk함수를 dispatch하면 3가지 액션 생성 함수가 만들어진다.

이 3가지 액션 생성함수는 명시적으로 개발자가 실행하는 것이 아닌** thunk함수를 실행하면 내부적으로 과정을 거치면서 실행되는 액션 생성함수**들이다.

3가지 생성함수는 다음과 같다.

**1.registerThunk.pending
**
** 2.registerThunk.fulfilled
**
** 3.registerThunk.rejected
**

`registerThunk.pending`는 **registerThunk 함수가 실행되면 실행되는 액션 생성 함수이며 promise가 실행되는 것을 기다린다.**

이후 **promise가 resolved되면 registerThunk.fulfilled 함수가 실행**되며 `payloadCreator(arg)`의 `arg`인자가 `action.payload`로 전달된다.

만약 **promise가 rejected되면 registerThunk.rejected 함수가 실행되면서** `payloadCreater(arg,thunkAPI)`에서 조회하는 `thunkAPI.rejectWithValue(error)`의 에러값이 action.payload로 전달된다.

slice에서 **extraReducer에서 register의 액션생성함수에 따른 상태값을 설정**해줄 수도 있다.

`extarReducer`는 `payloadCreator`에서 설정된 값을 상태값을 설정하게 해주는 reducer이다.

**Slice**

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authAPI from "../../lib/api/auth";

const initialState = {
  auth: "",
  authError: "",
};

export const register = createAsyncThunk(
  "auth/Login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authAPI.register({ username, password });
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);

      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authLoginSlice = createSlice({
  name: "authLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.authError = action.payload;
      });
  },
});
```

_**createAsyncThunk의 이점?**_
createAsyncThunk는** 성공했을 때 액션 타입(success)과 실패했을 때 액션 타입을 따로 설정하지 않아서 편리**한다.

기존에 thunk를 사용하여 비동기 로직을 구성할 **때 프로미스가 성공했을 때 액션타입을 선언하여 액션타입을 디스패치하고 프로미스가 실패했을 때 액션타입을 선언하여 액션타입을 디스패치**하였다.

이는 코드가 장황하고 지루해질 수 있다.

하지만 crateAsyncThunk를 사용하면 내부적으로 **pending,fulfilled,rejected라는 액션생성함수를 생성해주기 때문에 번거로운 작업이 줄어들 수 있다.**

_**builder Callback**_
builder Callback은 **여러 액션 생성함수 케이스에 따른 상태 설정을 가능하게 해준다.**

## NOTE!

- state값을 모두 store안에 넣어 관리할 필요는 없다.
  전역적으로 쓰이지않고 **해당 컴포넌트안에서만 사용되는 상태값이라면 useState로 관리**해줘도 된다.

따라서 상태값을 어떻게 사용할지를 적절히 판단하여 store에 담을지 local component에서 선언하여 사용하질 정하면 된다.

### 리덕스에서 상태값을 mutable하게 관리하면 안되는 이유는?

- 상태값을 업데이트하지 못하게 할 수 있다.

- 상태값이 왜,어떻게 업데이트됬는지 파악하기 어렵다.

## Conclusion

기존 리덕스를 사용하는 것에 비해 RTK가 사용하기 더 편리한 것을 알 수 있었다.

action type과 action function을 따로 생성해줄 필요없다는 장점과 reducer와 action funtion을 같이 생성하면 된다는 장점, 그리고 하나의 slice에서 모든 로직을 생성할 수 있다는 것이 사용하기 편리한 것 같다.

또한 기존에 redux를 react와 함께 사용하기 위해서는

- redux
- redux-actions
- immer
- redux-devtools-extension
  같은 라이브러리들을 설치해줘야하는데 RTK는 위 기능을 탑재하고 있어 일일히 설치해줘야하는 번거로움도 줄어든다.

기본 사용법은 위와 같지만 middleware를 적용할 시에는 어떻게 적용해야할지는 더 공부해야봐야겠다.

**-이상-**

## Reference

- [https://redux.js.org/introduction/getting-started](https://redux.js.org/introduction/getting-started)
- [https://redux.js.org/tutorials/quick-start](https://redux.js.org/tutorials/quick-start)
- https://redux.js.org/tutorials/essentials/part-2-app-structure
- https://redux-toolkit.js.org/api/createAsyncThunk#promise-lifecycle-actions

- https://redux-toolkit.js.org/api/createReducer#builder-methods
