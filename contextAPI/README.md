# 🔍 Context API

> 컴포넌트가 중첩되있을 경우 기존과 같이 props를 통해 상태 데이터를 전달할 때에 여러번 거쳐서 전달할 필요없이 전역적으로 상태 데이터를 사용하게 해주는 API이다.

기존과 같은 경우에는 컴포넌트가 여러개 중첩되있을 경우 최상위 컴포넌트에서 상태를 입력한다.
해당 state는 props를 이용하여 쓰고자 하는 컴포넌트까지 전달해준다.

하지만 컴포넌트 중첩이 많고 다루어야할 상태 데이터가 많다면,
이는 유지보수가 힘들 것이다.
이러한 점을 보완해주는 것이 Context API이다.

Context API는 props를 통해 전달할 필요없이 전역적으로 상태 데이터를 관리해줄수 있다.
때문에 우리가 고민하던 유지보수의 단점을 해결해줄 수 있다.

## 🧐 When? Why?

**Context API를 왜 사용할까?**

> 상위 컴포넌트에서 중첩되어있는 여러 하위컴포넌트 prop으로 데이터를 전달해주어야할 때 사용해준다.

여러 컴포넌트가 중첩되있는 프로젝트를 생각해보자.

```js
import React, { useState } from "react";
import LayOut from "./LayOut";

const App = () => {
  const [color, setColor] = useState("black");
  return (
    <div>
      <LayOut color={color} />
    </div>
  );
};

export default App;

import React from "react";
import Navbar from "./Navbar";
const LayOut = ({ color }) => {
  return (
    <div>
      <Navbar color={color} />
    </div>
  );
};

export default LayOut;


import React from "react";
import List from "./List";

const Navbar = ({ color }) => {
  return (
    <div>
      <List color={color} />
    </div>
  );
};

export default Navbar;

import React from "react";

const List = ({ color }) => {
  return (
    <div>
      <h1 style={{ color: color }}>List </h1>
    </div>
  );
};

export default List;
```

App > Layout > Navbar > List 컴포넌트 순으로 color라는 state가 prop을 통해 전달되고 있다.

List 컴포넌트에서 color라는 값을 사용하기 위해 번거롭게 전달되고 있는 것이다.

실제 프로젝트는 color 값을 저렇게 사용하지 않아도 되겠지만 만약 최상단 컴포넌트에서 공유해줘야하는 state값이 여러개이고 또 그 state들을 여러 중첩된 컴포넌트에 prop drilling 해줘야한다면 이는 상당히 번거로운 작업일 것이다.

이러한 상황에서 필요한 것이 **Context API**이다.

위 설명에서 봤던 것과 같이 Context API로 컴포넌트 전역에서 공유할 수 있는 context를 만들어 prop drilling할 필요없이 직관적으로 상태값 등을 사용할 수 있다.

## 🧾 Context API

### React.createContext

`const Context = React.createContext(defaultValue)`

context 객체를 만들어준다.

context를 사용하고 있는 컴포넌트들을 렌더링할 때 상단에 있는 Provider 컴포넌트부터 값을 읽는다.

default 매개변수는 트리 안에서 적절한 Provider를 찾지 못했을 때만 쓰이는 값이다.

(default 값이 설정되어있지않다면 상단에 있는 Provider value값을 context의 값으로 사용한다.)

Provider를 통해 undefined을 값으로 보낸다고 해도 사용하고 있는 컴포넌트들이 undefined를 읽지 않는다.

### Context.Provider

`<Context.Provider value={anything}>`

Provider은 context를 사용하고 있는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.

Provider 컴포넌트는 value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달한다

Provider 하위에 또 다른 Provider를 배치하는 것도 가능하며, 이 경우 하위 Provider의 값이 우선시된다.

Provider 하위에서 context를 사용하는 모든 컴포넌트는 Provider의 value prop가 바뀔 때마다 다시 렌더링 된다.

### Context.Consumer

```js
<MyContext.Consumer>
 {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

Provider와 달리 context의 값을 변경하지 않고 사용할 수 있는 컴포넌트이다.

이 컴포넌트를 사용하면 함수 컴포넌트안에서 context를 구독할 수 있다.

Context.Consumer의 자식은 함수여야한다. 이 함수는 context의 현재값을 받고 React 노드를 반환한다.

이 함수가 받는 value 매개변수 값은 해당 context의 Provider 중 상위 트리에서 가장 가까운 Provider의 value prop과 동일하다.

상위에 Provider가 없다면 value 매개변수 값은 createContext()에 보냈던 defaultValue와 동일하다.

### Context.displayName

Context 객체는 displayName 문자열 속성을 설정할 수 있다. React 개발자 도구는 이 문자열을 사용해서 context를 어떻게 보여줄 지 결정한다.

예를 들어, 아래 컴포넌트는 개발자 도구에 MyDisplayName로 표시된다.

```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

### useContext Hook

함수형 컴포넌트에서 useContext Hook을 사용하면 Consumer보다 편리하고 가독성있게 코드를 구현할 수 있다.

`const value = useContext(MyContext);`

**Consumer 사용**

```js
import React from "react";
import MyContext from "../context/MyContext";

const Colorbox = () => {
  return (
    <MyContext.Consumer>
      {({ color }) => (
        <div
          style={{ width: "100px", height: "100px", backgroundColor: color }}
        ></div>
      )}
    </MyContext.Consumer>
  );
};
export default Colorbox;
```

**useContext 사용**

```js
import React, { useContext } from "react";
import MyContext from "../context/MyContext";

const Colorbox = () => {
  const context = useContext(MyContext);

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: context.color,
      }}
    ></div>
  );
};

export default Colorbox;
```

Consumer를 사용할 때보다 짧고 간편하게 context를 사용할 수 있는 것을 볼 수 있다.

context 객체(React.createContext에서 반환된 값)를 받아 그 context의 현재 값을 반환한다.

context의 현재 값은 트리 안에서 이 Hook을 호출하는 컴포넌트에 가장 가까이에 있는 <MyContext.Provider>의 value prop에 의해 결정된다.

컴포넌트에서 가장 가까운 <MyContext.Provider>가 갱신되면 이 Hook은 그 MyContext provider에게 전달된 가장 최신의 context value를 사용하여 렌더러를 트리거한다.

상위 컴포넌트에서 React.memo 또는 shouldComponentUpdate를 사용하더라도 useContext를 사용하고 있는 컴포넌트 자체에서부터 다시 렌더링된다.

- 주의 : useContext에 전달한 인자는 context 객체 그 자체여야한다.

useContext를 호출한 컴포넌트는 context 값이 변경되면 항상 리렌더링 될 것이다.

컴포넌트를 리렌더링 하는 것에 비용이 많이 든다면, 메모이제이션을 사용하여 최적화할 수 있다.

## Review

\*\*1. Provider에서 context value값을 변경하면 context를 사용하는 하위 Consumer들은 리렌더링된다.

**Provider**

```js
import React, { useState } from "react";
import MyContext from "../context/MyContext";
import Colorbox from "./Colorbox";
const ChangeBox = () => {
  const [color, setColor] = useState("red");

  console.log("changebox-render");
  function changeColor() {
    setColor("blue");
  }
  return (
    <MyContext.Provider value={{ color, setColor }}>
      <Colorbox />
      <button onClick={changeColor}>change - Color</button>
    </MyContext.Provider>
  );
};

export default ChangeBox;
```

**Provider 내부에 있는 Consumer**

```js
import React from "react";
import MyContext from "../context/MyContext";

const Colorbox = () => {
  console.log("colorbox-render");
  return (
    <MyContext.Consumer>
      {({ color }) => (
        <div
          style={{ width: "100px", height: "100px", backgroundColor: color }}
        ></div>
      )}
    </MyContext.Consumer>
  );
};
export default Colorbox;
```

**re-render**
![](https://images.velog.io/images/kcj_dev96/post/d5e55431-50c3-4eaf-a4f0-37141b73517c/context.png)

버튼을 누르면 consumer인 colorbox가 리렌더링된다.

\*\*2. Provider 외부에서 사용하는 Consumer component는 Provider value값이 바뀌어도 리렌더링이 되지 않는다.

**최상단 컴포넌트 App**

```js
import React from "react";
import ChangeBox from "./component/ChangeBox";

import FontColor from "./component/FontColor";

const App = () => {
  console.log("App-render");

  return (
    <div>
      <FontColor />
      <ChangeBox />
    </div>
  );
};

export default App;
```

**Provider**

```js
import React, { useState } from "react";
import MyContext from "../context/MyContext";
import Colorbox from "./Colorbox";
const ChangeBox = () => {
  const [color, setColor] = useState("red");

  console.log("changebox-render");
  function changeColor() {
    setColor("blue");
  }
  return (
    <MyContext.Provider value={{ color, setColor }}>
      <Colorbox />
      <button onClick={changeColor}>change - Color</button>
    </MyContext.Provider>
  );
};

export default ChangeBox;
```

**Provider외부의 Consumber component**

```js
import React, { useContext } from "react";
import MyContext from "../context/MyContext";

const FontColor = () => {
  console.log("font-render");
  const context = useContext(MyContext);
  return <h1 style={{ color: context.color }}>Font</h1>;
};

export default FontColor;
```

**re-rendering**
![](https://images.velog.io/images/kcj_dev96/post/ec2ef0c8-68d7-4f97-8215-5ff3d92407e7/context.png)

Provider 외부 Consumer Component는 Provider의 value값이 바뀌어도 리렌더링되지 않는다.

**3. Provider 내부에 Provider를 사용하는경우에는 하위 Provider가 적용된다.**

**Parent Provider**

```js
import React, { useState } from "react";
import MyContext from "../context/MyContext";
import ChangeBox from "./ChangeBox";

const ParentChangeBox = () => {
  const [value, setValue] = useState("pink");

  return (
    <MyContext.Provider value={value}>
      <ChangeBox />
    </MyContext.Provider>
  );
};

export default ParentChangeBox;
```

**Provider in Provider**

```js
import React, { useState } from "react";
import MyContext from "../context/MyContext";
import Colorbox from "./Colorbox";
const ChangeBox = () => {
  const [color, setColor] = useState("red");

  console.log("changebox-render");
  function changeColor() {
    setColor("blue");
  }
  return (
    <MyContext.Provider value={{ color, setColor }}>
      <Colorbox />
      <button onClick={changeColor}>change - Color</button>
    </MyContext.Provider>
  );
};

export default ChangeBox;
```

**Consumer**

```js
import React from "react";
import MyContext from "../context/MyContext";

const Colorbox = () => {
  console.log("colorbox-render");
  return (
    <MyContext.Consumer>
      {({ color }) => (
        <div
          style={{ width: "100px", height: "100px", backgroundColor: color }}
        ></div>
      )}
    </MyContext.Consumer>
  );
};
export default Colorbox;
```
