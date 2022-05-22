# useCallback

useCallback을 보기전에 다음 예제를 살펴보자.

```js
function factory() {
  return (a, b) => a + b;
}
const sum1 = factory();
const sum2 = factory();
sum1(1, 2); // => 3
sum2(1, 2); // => 3
sum1 === sum2; // => false
sum1 === sum1; // => true
```

factory라는 함수가 만들어내는 sum1,sum2은 같은 함수로부터 반환된 함수이지만 비교를 해봤을 때 다른 함수로 판단되고 있다.

이는 자바스크립트 객체의 개념을 들여다봐야한다.

위 예제를 이해하기위해 알아야할 개념은 다음과 같다.

1. 함수는 일급객체이다.즉, 함수도 객체이다.
2. 두 객체를 생성했을 때, key,value값이 같아도 두 객체는 다른 객체이다.

```js
const obj1 = { x: 1, y: 2 };
const obj2 = { x: 1, y: 2 };

console.log(obj1 === obj2); //false
```

1번 사항을 설명하자면 javascript의 값들은 대부분 객체로 이루어져있다.
함수 또한 객체라고 알고 있으면 된다.

2번 사항은 위 예제를 보면 알 수 있듯이 두 개는 key,value값이 같은데도 비교를 해봤을 때 다른 객체라는 것을 볼 수 있다.

이는 내부적으로 어떠한 생성된 객체는 다른 객체와 다른 고유한 값이라는 것이다.

> 추가 설명 : 객체 리터럴은 평가될 때마다 객체를 생성한다. obj1과 obj2의 내용은 같지만 다른 메모리에 저장된 별개의 객체이다. 즉 ,obj1과 obj2의 참조 값은 전혀 다른 값이다.

따라서 처음에 본 예제를 다시 살펴보면 sum1()함수와 sum2()함수가 다르다는 것을 이해할 수 있다.

그렇다면 다음으로 React의 예제를 살펴보자.

```js
import React, { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");

  const changeValue = (e) => setValue(e.target.value);

  return (
    <div>
      <input value={value} onChange={changeValue} />
    </div>
  );
};

export default App;
```

위 예제에서 input이 onChange이벤트가 발생할 때마다 changeValue 함수가 새로 생성되고 있다.

onChange가 발생할 때마다 생성되는 changeValue는 같은 함수일까? 다른 함수일까?

내부적으로 다른 함수객체이다.

하지만 이벤트가 발생할 때마다 생성되는 함수는 같은 구조를 반환하는 함수이다.

때문에 처음 한번 생성한 함수를 계속 사용해도 된다는 이야기이다.

이럴 때 useCallback을 사용하면 되는 것이다.

**useCallback**

```js
import React, { useState, useCallback } from "react";

const App = () => {
  const [value, setValue] = useState("");

  const changeValue = useCallback((e) => setValue(e.target.value), []);

  return (
    <div>
      <input value={value} onChange={changeValue} />
    </div>
  );
};

export default App;
```

위와 같이 useCallback을 해당 함수에 사용해주면 onChange 이벤트가 발생할 때 한번 changeValue 함수가 생성되고 그 뒤로 changeValue를 새로 생성하지 않는다.

여기서 헷갈리지 않아야하는점이 함수가 새로 생성되지 않는다는 것이 함수가 작동하지 않는다는 것이 아니다. 단지 기존에 처음 만들었던 함수를 기억하여 계속 사용하는 것이다.

**useCallback의 형태**
`useCallback(callbackFuncition,[dependency])`

useCallback은 useEffect와 비슷한 형태이다.

첫번째 인자에는 실행하고자 하는 함수를 할당하고 두번째 인자인 dependency 배열에 할당하는 value의 변화가 일어날 때마다 callbackFunction을 생성해준다.

하지만 주의할 것은 모든 함수에 useCallback을 wrapping하는 것은 고려해봐야할 상황일 수 있다.

때로는 useCallback으로 wrapping한 함수를 정의하는 것이 렌더링될 때마다 불러지는 것이 비용이 더 클 수 있다.

리액트 공식문서에서도 렌더링할 때 재생성되는 값의 비용이 클 때 사용하라고 나와있다.

따라서 컴포넌트 구조가 복잡하지않고 element들이 복잡하지 않다면 useCallback 차라리 쓰지 않는 것이 나을 수 있다.

때문에 useCallback을 사용할 때 비용측면을 고려해보고 사용하도록 하자.
