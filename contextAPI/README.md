# ๐ Context API

> ์ปดํฌ๋ํธ๊ฐ ์ค์ฒฉ๋์์ ๊ฒฝ์ฐ ๊ธฐ์กด๊ณผ ๊ฐ์ด props๋ฅผ ํตํด ์ํ ๋ฐ์ดํฐ๋ฅผ ์ ๋ฌํ  ๋์ ์ฌ๋ฌ๋ฒ ๊ฑฐ์ณ์ ์ ๋ฌํ  ํ์์์ด ์ ์ญ์ ์ผ๋ก ์ํ ๋ฐ์ดํฐ๋ฅผ ์ฌ์ฉํ๊ฒ ํด์ฃผ๋ API์ด๋ค.

๊ธฐ์กด๊ณผ ๊ฐ์ ๊ฒฝ์ฐ์๋ ์ปดํฌ๋ํธ๊ฐ ์ฌ๋ฌ๊ฐ ์ค์ฒฉ๋์์ ๊ฒฝ์ฐ ์ต์์ ์ปดํฌ๋ํธ์์ ์ํ๋ฅผ ์๋ ฅํ๋ค.
ํด๋น state๋ props๋ฅผ ์ด์ฉํ์ฌ ์ฐ๊ณ ์ ํ๋ ์ปดํฌ๋ํธ๊น์ง ์ ๋ฌํด์ค๋ค.

ํ์ง๋ง ์ปดํฌ๋ํธ ์ค์ฒฉ์ด ๋ง๊ณ  ๋ค๋ฃจ์ด์ผํ  ์ํ ๋ฐ์ดํฐ๊ฐ ๋ง๋ค๋ฉด,
์ด๋ ์ ์ง๋ณด์๊ฐ ํ๋ค ๊ฒ์ด๋ค.
์ด๋ฌํ ์ ์ ๋ณด์ํด์ฃผ๋ ๊ฒ์ด Context API์ด๋ค.

Context API๋ props๋ฅผ ํตํด ์ ๋ฌํ  ํ์์์ด ์ ์ญ์ ์ผ๋ก ์ํ ๋ฐ์ดํฐ๋ฅผ ๊ด๋ฆฌํด์ค์ ์๋ค.
๋๋ฌธ์ ์ฐ๋ฆฌ๊ฐ ๊ณ ๋ฏผํ๋ ์ ์ง๋ณด์์ ๋จ์ ์ ํด๊ฒฐํด์ค ์ ์๋ค.

## ๐ง When? Why?

**Context API๋ฅผ ์ ์ฌ์ฉํ ๊น?**

> ์์ ์ปดํฌ๋ํธ์์ ์ค์ฒฉ๋์ด์๋ ์ฌ๋ฌ ํ์์ปดํฌ๋ํธ prop์ผ๋ก ๋ฐ์ดํฐ๋ฅผ ์ ๋ฌํด์ฃผ์ด์ผํ  ๋ ์ฌ์ฉํด์ค๋ค.

์ฌ๋ฌ ์ปดํฌ๋ํธ๊ฐ ์ค์ฒฉ๋์๋ ํ๋ก์ ํธ๋ฅผ ์๊ฐํด๋ณด์.

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

App > Layout > Navbar > List ์ปดํฌ๋ํธ ์์ผ๋ก color๋ผ๋ state๊ฐ prop์ ํตํด ์ ๋ฌ๋๊ณ  ์๋ค.

List ์ปดํฌ๋ํธ์์ color๋ผ๋ ๊ฐ์ ์ฌ์ฉํ๊ธฐ ์ํด ๋ฒ๊ฑฐ๋กญ๊ฒ ์ ๋ฌ๋๊ณ  ์๋ ๊ฒ์ด๋ค.

์ค์  ํ๋ก์ ํธ๋ color ๊ฐ์ ์ ๋ ๊ฒ ์ฌ์ฉํ์ง ์์๋ ๋๊ฒ ์ง๋ง ๋ง์ฝ ์ต์๋จ ์ปดํฌ๋ํธ์์ ๊ณต์ ํด์ค์ผํ๋ state๊ฐ์ด ์ฌ๋ฌ๊ฐ์ด๊ณ  ๋ ๊ทธ state๋ค์ ์ฌ๋ฌ ์ค์ฒฉ๋ ์ปดํฌ๋ํธ์ prop drilling ํด์ค์ผํ๋ค๋ฉด ์ด๋ ์๋นํ ๋ฒ๊ฑฐ๋ก์ด ์์์ผ ๊ฒ์ด๋ค.

์ด๋ฌํ ์ํฉ์์ ํ์ํ ๊ฒ์ด **Context API**์ด๋ค.

์ ์ค๋ช์์ ๋ดค๋ ๊ฒ๊ณผ ๊ฐ์ด Context API๋ก ์ปดํฌ๋ํธ ์ ์ญ์์ ๊ณต์ ํ  ์ ์๋ context๋ฅผ ๋ง๋ค์ด prop drillingํ  ํ์์์ด ์ง๊ด์ ์ผ๋ก ์ํ๊ฐ ๋ฑ์ ์ฌ์ฉํ  ์ ์๋ค.

## ๐งพ Context API

### React.createContext

`const Context = React.createContext(defaultValue)`

context ๊ฐ์ฒด๋ฅผ ๋ง๋ค์ด์ค๋ค.

context๋ฅผ ์ฌ์ฉํ๊ณ  ์๋ ์ปดํฌ๋ํธ๋ค์ ๋ ๋๋งํ  ๋ ์๋จ์ ์๋ Provider ์ปดํฌ๋ํธ๋ถํฐ ๊ฐ์ ์ฝ๋๋ค.

default ๋งค๊ฐ๋ณ์๋ ํธ๋ฆฌ ์์์ ์ ์ ํ Provider๋ฅผ ์ฐพ์ง ๋ชปํ์ ๋๋ง ์ฐ์ด๋ ๊ฐ์ด๋ค.

(default ๊ฐ์ด ์ค์ ๋์ด์์ง์๋ค๋ฉด ์๋จ์ ์๋ Provider value๊ฐ์ context์ ๊ฐ์ผ๋ก ์ฌ์ฉํ๋ค.)

Provider๋ฅผ ํตํด undefined์ ๊ฐ์ผ๋ก ๋ณด๋ธ๋ค๊ณ  ํด๋ ์ฌ์ฉํ๊ณ  ์๋ ์ปดํฌ๋ํธ๋ค์ด undefined๋ฅผ ์ฝ์ง ์๋๋ค.

### Context.Provider

`<Context.Provider value={anything}>`

Provider์ context๋ฅผ ์ฌ์ฉํ๊ณ  ์๋ ์ปดํฌ๋ํธ๋ค์๊ฒ context์ ๋ณํ๋ฅผ ์๋ฆฌ๋ ์ญํ ์ ํ๋ค.

Provider ์ปดํฌ๋ํธ๋ value prop์ ๋ฐ์์ ์ด ๊ฐ์ ํ์์ ์๋ ์ปดํฌ๋ํธ์๊ฒ ์ ๋ฌํ๋ค

Provider ํ์์ ๋ ๋ค๋ฅธ Provider๋ฅผ ๋ฐฐ์นํ๋ ๊ฒ๋ ๊ฐ๋ฅํ๋ฉฐ, ์ด ๊ฒฝ์ฐ ํ์ Provider์ ๊ฐ์ด ์ฐ์ ์๋๋ค.

Provider ํ์์์ context๋ฅผ ์ฌ์ฉํ๋ ๋ชจ๋  ์ปดํฌ๋ํธ๋ Provider์ value prop๊ฐ ๋ฐ๋ ๋๋ง๋ค ๋ค์ ๋ ๋๋ง ๋๋ค.

### Context.Consumer

```js
<MyContext.Consumer>
 {value => /* context ๊ฐ์ ์ด์ฉํ ๋ ๋๋ง */}
</MyContext.Consumer>
```

Provider์ ๋ฌ๋ฆฌ context์ ๊ฐ์ ๋ณ๊ฒฝํ์ง ์๊ณ  ์ฌ์ฉํ  ์ ์๋ ์ปดํฌ๋ํธ์ด๋ค.

์ด ์ปดํฌ๋ํธ๋ฅผ ์ฌ์ฉํ๋ฉด ํจ์ ์ปดํฌ๋ํธ์์์ context๋ฅผ ๊ตฌ๋ํ  ์ ์๋ค.

Context.Consumer์ ์์์ ํจ์์ฌ์ผํ๋ค. ์ด ํจ์๋ context์ ํ์ฌ๊ฐ์ ๋ฐ๊ณ  React ๋ธ๋๋ฅผ ๋ฐํํ๋ค.

์ด ํจ์๊ฐ ๋ฐ๋ value ๋งค๊ฐ๋ณ์ ๊ฐ์ ํด๋น context์ Provider ์ค ์์ ํธ๋ฆฌ์์ ๊ฐ์ฅ ๊ฐ๊น์ด Provider์ value prop๊ณผ ๋์ผํ๋ค.

์์์ Provider๊ฐ ์๋ค๋ฉด value ๋งค๊ฐ๋ณ์ ๊ฐ์ createContext()์ ๋ณด๋๋ defaultValue์ ๋์ผํ๋ค.

### Context.displayName

Context ๊ฐ์ฒด๋ displayName ๋ฌธ์์ด ์์ฑ์ ์ค์ ํ  ์ ์๋ค. React ๊ฐ๋ฐ์ ๋๊ตฌ๋ ์ด ๋ฌธ์์ด์ ์ฌ์ฉํด์ context๋ฅผ ์ด๋ป๊ฒ ๋ณด์ฌ์ค ์ง ๊ฒฐ์ ํ๋ค.

์๋ฅผ ๋ค์ด, ์๋ ์ปดํฌ๋ํธ๋ ๊ฐ๋ฐ์ ๋๊ตฌ์ MyDisplayName๋ก ํ์๋๋ค.

```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

### useContext Hook

ํจ์ํ ์ปดํฌ๋ํธ์์ useContext Hook์ ์ฌ์ฉํ๋ฉด Consumer๋ณด๋ค ํธ๋ฆฌํ๊ณ  ๊ฐ๋์ฑ์๊ฒ ์ฝ๋๋ฅผ ๊ตฌํํ  ์ ์๋ค.

`const value = useContext(MyContext);`

**Consumer ์ฌ์ฉ**

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

**useContext ์ฌ์ฉ**

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

Consumer๋ฅผ ์ฌ์ฉํ  ๋๋ณด๋ค ์งง๊ณ  ๊ฐํธํ๊ฒ context๋ฅผ ์ฌ์ฉํ  ์ ์๋ ๊ฒ์ ๋ณผ ์ ์๋ค.

context ๊ฐ์ฒด(React.createContext์์ ๋ฐํ๋ ๊ฐ)๋ฅผ ๋ฐ์ ๊ทธ context์ ํ์ฌ ๊ฐ์ ๋ฐํํ๋ค.

context์ ํ์ฌ ๊ฐ์ ํธ๋ฆฌ ์์์ ์ด Hook์ ํธ์ถํ๋ ์ปดํฌ๋ํธ์ ๊ฐ์ฅ ๊ฐ๊น์ด์ ์๋ <MyContext.Provider>์ value prop์ ์ํด ๊ฒฐ์ ๋๋ค.

์ปดํฌ๋ํธ์์ ๊ฐ์ฅ ๊ฐ๊น์ด <MyContext.Provider>๊ฐ ๊ฐฑ์ ๋๋ฉด ์ด Hook์ ๊ทธ MyContext provider์๊ฒ ์ ๋ฌ๋ ๊ฐ์ฅ ์ต์ ์ context value๋ฅผ ์ฌ์ฉํ์ฌ ๋ ๋๋ฌ๋ฅผ ํธ๋ฆฌ๊ฑฐํ๋ค.

์์ ์ปดํฌ๋ํธ์์ React.memo ๋๋ shouldComponentUpdate๋ฅผ ์ฌ์ฉํ๋๋ผ๋ useContext๋ฅผ ์ฌ์ฉํ๊ณ  ์๋ ์ปดํฌ๋ํธ ์์ฒด์์๋ถํฐ ๋ค์ ๋ ๋๋ง๋๋ค.

- ์ฃผ์ : useContext์ ์ ๋ฌํ ์ธ์๋ context ๊ฐ์ฒด ๊ทธ ์์ฒด์ฌ์ผํ๋ค.

useContext๋ฅผ ํธ์ถํ ์ปดํฌ๋ํธ๋ context ๊ฐ์ด ๋ณ๊ฒฝ๋๋ฉด ํญ์ ๋ฆฌ๋ ๋๋ง ๋  ๊ฒ์ด๋ค.

์ปดํฌ๋ํธ๋ฅผ ๋ฆฌ๋ ๋๋ง ํ๋ ๊ฒ์ ๋น์ฉ์ด ๋ง์ด ๋ ๋ค๋ฉด, ๋ฉ๋ชจ์ด์ ์ด์์ ์ฌ์ฉํ์ฌ ์ต์ ํํ  ์ ์๋ค.

## Review

\*\*1. Provider์์ context value๊ฐ์ ๋ณ๊ฒฝํ๋ฉด context๋ฅผ ์ฌ์ฉํ๋ ํ์ Consumer๋ค์ ๋ฆฌ๋ ๋๋ง๋๋ค.

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

**Provider ๋ด๋ถ์ ์๋ Consumer**

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

๋ฒํผ์ ๋๋ฅด๋ฉด consumer์ธ colorbox๊ฐ ๋ฆฌ๋ ๋๋ง๋๋ค.

\*\*2. Provider ์ธ๋ถ์์ ์ฌ์ฉํ๋ Consumer component๋ Provider value๊ฐ์ด ๋ฐ๋์ด๋ ๋ฆฌ๋ ๋๋ง์ด ๋์ง ์๋๋ค.

**์ต์๋จ ์ปดํฌ๋ํธ App**

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

**Provider์ธ๋ถ์ Consumber component**

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

Provider ์ธ๋ถ Consumer Component๋ Provider์ value๊ฐ์ด ๋ฐ๋์ด๋ ๋ฆฌ๋ ๋๋ง๋์ง ์๋๋ค.

**3. Provider ๋ด๋ถ์ Provider๋ฅผ ์ฌ์ฉํ๋๊ฒฝ์ฐ์๋ ํ์ Provider๊ฐ ์ ์ฉ๋๋ค.**

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
