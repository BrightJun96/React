# useRef

```js
const refContainer = useRef(initialValue);
```

useRef는 ref 객체를 반환하며 .current 프로퍼티는 useRef인자인 initialValue로 초기화된다.  
반환된 ref객체는 컴포넌트의 모든 라이프사이클동안 존재한다.

initialValue에 보통 null을 넣어주는 이유는?

### 사용법

1. useRef를 이용하여 ref객체를 생성해준다.

```js
const myRef = React.useRef(null);
```

위 예제에서 `myRef.current = null`로 초기화된다.

2. 지정하고픈 요소에 ref객체를 props로 전달해준다.
   이 때 props 이름은 ref이다.

```js
const myRef = React.useRef(null);
...
<h1 ref ={myRef}></h1>
```

3. ref 객체 즉 ref로 지정한 요소(위 예제로는 h1)의 속성을 변경하고 싶다면 current 프로퍼티로 접근하면 된다.
   이 때 주의할 것은 지정한 요소에 접근할 때 요소가 렌더링된 이후에(componentDidMount) 접근해야하기 때문에 useEffect안에서 사용해줘야한다.

```js

const myRef = React.useRef(null);

React.useEffect(()=>{
    myRef.current.textContent = "Hello, useRef!"
},[])

...
<h1 ref ={myRef}></h1>

```

### with TypeScript

useRef의 제너릭 타입으로 ref로 지정할 요소 타입을 할당해주면 된다.

```ts
const btn = React.useRef<HTMLButtonElement>(null)
...
      <button ref={btn} disabled={!miner}>
        Register
      </button>
```
