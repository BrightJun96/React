# useMemo

useMemo는 useCallback과 비슷하다.  
useCallback은 Memoized function을 반환하지만
useMemo는 Memoized value를 반환해준다.

먼저 다음 예제를 살펴보자.

```js
import React, { useState } from "react";

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = expensiveCalculation(count);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

export default App;
```

버튼을 누를 때마다 Todo를 추가해주는 UI와 버튼을 누를 때마다 숫자를 1씩 증가시켜주는 UI가 있다.

이 때 숫자를 증가시켜주는 UI의 버튼을 누르면 10억번이나 계산을 하는expensiveCalculation 함수가 호출된다.

하지만 위 App 컴포넌트는 todos라는 state가 변경되도 리렌더링이 되기 때문에 Todo UI Button을 클릭하여도 expensiveCalculation 함수가 호출이 된다.

이는 성능에 안 좋은 영향을 미치는 요소이기 때문에 최적화가 필요하다.
이 때 필요한 훅이 useMemo이다.

위 예제에 useMemo를 적용해보자.

```js
import React, { useState, useMemo } from "react";

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);
  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

export default App;
```

위와 같이 적용해준다며 todo UI 버튼이 클릭되어도 expensiveCalculation이 호출되지 않는다.

**useMemo의 형태**
`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
useCallback과 비슷하게 첫번째 인자에는 콜백함수를 할당해주고 두번째인자에는 dependency배열을 할당해준다.

dependency값이 바뀌지 않으면 computeExpensiveValue는 호출되지 않는다.

useMemo는 useCallback과 비슷하나 차이점은 다음과 같다.
useCallback는 **콜백함수인 함수를 memoizing하는 것**이고
useMemo은 **콜백함수의 반환값**을 기억하는 것이다.

때문에 이를 사용할 때 헷갈리지 않도록 주의깊게 살펴보고 사용할 필요가 있다.

useMemo 또한 비싼 연산이 아니라면 사용할 필요가 없다는 것을 기억해두자.
