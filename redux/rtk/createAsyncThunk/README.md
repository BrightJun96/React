# createAsyncThunk

```js
createAsyncThunk(type, payloaderCreator, options);
```

createAsyncThunk는 첫번째 인자로 액션타입(문자열)을 할당하고 두번째 인자로 promise를 반환해야하는 콜백함수를 할당한다.

#### type

비동기 요청 상태에 따른 추가적인 action type을 만들어내는데에 사용된다.

`users/requestStatus`라는 action type을 할당하면 3가지 액션타입을 만들어주며  
createAsyncThunk로 만든 **thunk함수**는 3가지 타입에 대한 **3가지 액션 생성함수를 사용**할 수 있다.

- pending : `users/requestStatus/pending`
- fullfilled : `users/requestStatus/fullfilled`
- rejected : `users/requestStatus/rejected`

이 때 **type명은 겹칠 수 있기 때문에 createSlice의 name과 다르게 하는 것이 좋다.**  
예를 들어 createSlice의 name이 users라고 하였을 때 createAsyncThunk의 type은 users/requestStatus로 해주는 식으로 말이다.

#### payloaderCreator

payloaderCreator 콜백함수는 비동기 로직을 포함하는 promise를 반환해야한다.  
에러 로직 코드를 작성하고 싶다면 catch문을 사용하거나 resolved된 promise에서 thunkAPI.rejectWithValue에 의해 반환된 RejectWithValue로 에러를 캐치할 수 있다.

`payloaderCreator(arg,thunkAPI)`
payloaderCreator 함수는 두가지 인자를 할당할 수 있다.

- arg : createAsyncThunk로 만든 **thunk함수의 첫번째 인자로 전달**된다.

```js
const thunk = createAsyncThunk로("users/status",async(Id,thunkAPI)=>{},options)
...
dispatch(thunk(Id))
```

- thunkAPI : **thunk 함수로 전달**되는 여러가지 프로퍼티 및 메서드를 가지고 있는 **객체**이다.
  - thunkAPI.dispatch : store의 dispatch 메서드를 사용함으로써 thunk안에서 추가적인 액션을 디스패치할 수 있다.
  - thunkAPI.getState : store의 state값을 참조할 수 있다.
  - thunkAPI.rejectWithValue(value) : reject된 value값(에러값)을 캐치 수 있다.
  - thunkAPI.fulfillWithValue(value, meta) : fufilled된 value값을 캐치할 수 있다.

#### options

추가적인 기능을 사용할 수 있는 객체이다.

```js
const thunk = createAsyncThunk로("users/status",async(Id,thunkAPI)=>{},options)
...
dispatch(thunk(Id))
```

- options.condition() : boolean | Promise<boolean>
- options.dispatchConditionRejection
- options.idGenerator(arg) : string
- options.serializeError(error: unknown) => any
- options.getPendingMeta({ arg, requestId }, { getState, extra }): any

#### createAsyncThunk의 반환값

createAsyncThunk는 redux thunk 액션 생성 함수를 반환한다.  
thunk함수는 pending,fulfilled,rejected 액션을 생성 3가지 액션생성함수를 사용할 수 있게 해준다.

- thunk.pending : `users/fetchByIdStatus/pending`액션을 디스패치하는 액션 생성 함수
- thunk.fulfilled : `users/fetchByIdStatus/fulfilled`액션을 디스패치하는 액션 생성 함수
- thunk.rejected : `users/fetchByIdStatus/rejected`액션을 디스패치하는 액션 생성 함수

그리고 extarReducers에 각 상태에 따른 코드를 작성하면 thunk 함수를 사용할 때 request status에 따라 알아서 해당 액션생성함수가 실행된다.

```js
const thunk = createAsyncThunk로(
  "users/status",
  async (Id, thunkAPI) => {},
  options
);

...
{
 extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
}
```

위 예시로 설명하자면 만약 thunk함수가 성공하면 알아서 fulfilled 액션생성함수가 실행되는 것이고 rejected되면 알아서 rejected 액션생성함수가 실행되는 것이다.

thunk함수가 dispatch되면 다음과 같이 작동한다.

1. pending action이 dispatch된다.
2. payloadCreator 함수가 호출되며 promise가 결과값을 기다린다.
3. 프로미스가 settle됬을 때,  
   fullfilled되면 fullfilled 액션 생성 함수가 디스패치되고 rejected되면 rejected 액션 생성함수가 디스패치된다.

```js
const updateUser = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue }) => {
    const { id, ...fields } = userData;
    try {
      const response = await userAPI.updateById(id, fields);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
```

## Usage

1. createAsyncThunk로 thunk 함수를 만들어준다.

2. createSlice의 extraReducers코드를 작성한다.  
   extarReducers 메서드는 builder라는 인자를 할당하여 각 request status case맞는 리듀서를 작성해준다.  
   이 때 비동기 데이터값을 상태값으로 설정할 때에 `(state,action)`의 action.payload값으로 조회하여 받을 수 있다.

3. 에러값은 `rejectWithValue(err.response.data)`로 설정하여 `rejected 리듀서(state,action)`의 **action.payload**로 설정하거나
   `rejected 리듀서(state,action)`에서 **action.error**값으로 참조할 수 있다.

## error handling

createAsyncThunk는 항상 resolved된 promise를 반환한다.  
즉 , fullfilled이던 rejected이던 항상 then메서드안에서 request status값을 캐치할 수 있다.

```js
const onClick = () => {
  dispatch(fetchUserById(userId)).then(() => {
    // do additional work
  });
};
```

## redux-thunk by hand

createAsyncThunk를 사용하지 않고 기존처럼 redux-thunk 함수를 만들어쓰고 싶다면 slice내에서 만들어서 사용하면 된다.  
RTK를 설치하지않고 사용할 때는 index.tsx에서 redux-thunk 미들웨어를 apply하여 사용하지만  
RTK를 사용하면 RTK내부적으로 redux-thunk를 적용해주기 때문에 따로 index.tsx에서 thunk를 적용해줄 필요가 없다.

> Redux ToolKit의 `configureStore`함수는 자동적으로 thunk를 적용해준다.

## Reference

- https://redux-toolkit.js.org/api/createAsyncThunk
