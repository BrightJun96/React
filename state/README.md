# ๐ State

> **state**๋ ์ปดํฌ๋ํธ๋ด์์ **์ด๋ ํ ๊ฐ์ ๋์ ์ผ๋ก ๊ฐฑ์ **ํด์ฃผ๊ธฐ ์ํ์ฌ ์ฌ์ฉํ๋ค.
> ์ฆ, **state๋ ๋์ ์ผ๋ก ๊ฐฑ์ ๋๋ ๊ฐ**์ด๋ค.

- ์์ ๋ณด์๋ฏ์ด **[props](https://velog.io/@kcj_dev96/props-state)**๋ ์ปดํฌ๋ํธ ๋ด๋ถ์์ ๊ฐ์ ๋ณ๊ฒฝํ  ์ ์๋ค.
  ๋ฐ๋ผ์ **props ๊ฐ์ ๋ณ๊ฒฝํด์ฃผ๊ธฐ ์ํ ๋ฐฉ๋ฒ์ผ๋ก state**๊ฐ ์๋ค.

- ๊ผญ props ๋ฟ๋ง ์๋๋ผ ์ปดํฌ๋ํธ์์๋ **๋์ ์ผ๋ก ๊ฐฑ์ ํ๊ณ  ์ถ์ ๊ฐ์ด ์๋ค๋ฉด state๋ฅผ ์ฌ์ฉํ๋ฉด ๋๋ค.**

## state์ ํน์ง

1. state๋ฅผ ์๋ฐ์ดํธํ๊ธฐ ์ํด์๋ **setState๋ฅผ ์ฌ์ฉ**ํด์ผํ๋ค.
   setState๋ฅผ ์ฌ์ฉํ์ง ์๊ณ  state๋ฅผ ์ง์ ์ ์ผ๋ก ์๋ฐ์ดํธํ๋ฉด ์๋ฐ์ดํธ๊ฐ ๋ฐ์๋์ง ์๋๋ค.

2. setState๋ **๋น๋๊ธฐ์ ์ผ๋ก ๋์**ํ๋ค.

   ์ฆ, setState๋ฅผ ์คํํ๋ค์ ์ฆ์ state์ ๋ณ๊ฒฝํ์ง์๊ณ  ์ผ๋ถ ์์์ด ์๋ฃ๋ ๋ค์ state๊ฐ ์๋ฐ์ดํธ๋  ์๋ ์๋ค๋ ๊ฒ์ด๋ค.

```js
import React, { useState } from "react";

const Test = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <h1>{value}</h1>
      <button
        onClick={() => {
          setValue((prev) => prev + 1);
          console.log(value);
        }}
      >
        Change
      </button>
    </div>
  );
};

export default Test;
```

์ ์์ ์์ ๋ฒํผ์ ๋๋ ์ ๋ ์ฝ์์ ์ฐํ ๊ฐ์ ๋ฌด์์ผ๊น?  
1๋ก ๊ธฐ๋ํ๊ณ  ์๊ฒ ์ง๋ง ํด๋น ๊ฐ์ 0์ด๋ค.

๊ทธ๋ฆฌ๊ณ  ๋ค์ ๋ฒํผ์ ๋๋ฅด๋ฉด ์ฝ์์ 1๋ก ์ฐํ๋ค.  
์ด๋ setState๊ฐ ๋น๋๊ธฐ์ ์ผ๋ก ์๋ํ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

setState๊ฐ ๋น๋๊ธฐ์ ์ผ๋ก ์๋ํ๋ ๊ฒ์ ๋ฆฌ๋ ๋๋ง์ด ๋น์ผ ์ฐ์ฐ์ ํ๋ ๋์์ด๊ธฐ ๋๋ฌธ์ด๋ผ๊ณ  ํ๋ค.  
๋๋ฌธ์ ์ฌ๋ฌ setState๊ฐ ํ๋์ ๋ก์ง์ ์๋ค๊ณ  ํ  ๋ ์ผ๊ด์ ์ผ๋ก ์๋ฐ์ดํธ(batch)ํ์ฌ ๋ฆฌ๋ ๋๋ง์์ผ์ฃผ๊ธฐ์ํด ๋น๋๊ธฐ์ ์ผ๋ก ์๋ํ๊ฒ ํ๋ ๊ฒ์ด๋ผ๊ณ  ํ๋ค.

3. state๊ฐ์ **๋ถ๋ณ์ฑ์ ์ ์ง**ํ๋ฉฐ ์๋ฐ์ดํธ๋์ผํ๋ค.
   ์ต์ ํํ๋๋ฐ ์ฉ์ดํ๊ธฐ ๋๋ฌธ์ด๋ค.

shouldComponentUpdate๋ React.memo๋ฑ์ ์ฌ์ฉํ์ฌ ์ด์  ์ํ๊ฐ๊ณผ ๋น๊ตํ์ ๋ ๋ณํ๊ฐ ์์ผ๋ฉด ํด๋น ์ปดํฌ๋ํธ๋ฅผ ๋ฆฌ๋ ๋๋งํ์ง ์๊ฒ ํ  ์ ์๋ค.

state๊ฐ ๋ถ๋ณ์ฑ์ด ์ ์งํ์ง์๊ณ  ์ด์ ๊ฐ์ ๋ณ๊ฒฝ์ํจ๋ค๋ฉด ์ด์  state์ ๋ณ๊ฒฝ๋๋ state๊ฐ ๊ฐ์์ง๊ธฐ ๋๋ฌธ์ ์ ๊ฐ์ ์ต์ ํ ์์์ ํ์ง ๋ชปํ๋ค.

๋ํ react๋ virtual DOM์ ํตํด ๋ณ๊ฒฝ๋๋ DOM๋ง ํจ์จ์ ์ผ๋ก ์๋ฐ์ดํธํด์ฃผ๋๋ฐ ์ด์ ์ํ๊ฐ๋ ๋ฐ๋๋ ์ํ๊ฐ๊ณผ ๊ฐ๊ฒ ๋ง๋ค๋ฉด DOM์ด ์๋ฐ์ดํธ๋์ง ๋ชปํ๊ฒ ๋๋ค.

๋ง๋ถํ ๋ฆฌ์กํธ๋ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ ์ฆ, side effect๋ฅผ ๋ง๋ค์ง ์๋ ๊ฒ์ ์ถ๊ตฌํ๊ณ  ์๊ธฐ ๋๋ฌธ์ ํจ์๋ด๋ถ์์ ์ธ๋ถ๊ฐ์ ๋ณ๊ฒฝํ๋ ๊ฒ์ ์ง์ํ๋ค.

4. ์ฌ๋ฌ setState๊ฐ ์์ ๋ ๋ฆฌ์กํธ๋ ๊ฐ setState๋ง๋ค ๋ฆฌ๋ ๋๋งํ์ง์๊ณ  ์ผ๊ด์ ์ผ๋ก ์๋ฐ์ดํธ์์ผ ๋ฆฌ๋ ๋๋งํด์ค๋ค.

## Why State?

๋ฆฌ์กํธ์์๋ ์ ๋ฐ์ดํฐ ๊ฐ์ ๋ณ๊ฒฝํ  ๋ state๋ฅผ ์ฌ์ฉํด์ผํ๋ ๊ฒ์ผ๊น?

๋ฆฌ์กํธ์์ ์ด๋ ํ ๊ฐ์ ์๋ฐ์ดํธํ  ๋ state๋ฅผ ํ์ฉํ๋ค.  
setState๋ฅผ ํ์ฉํ์ฌ state๊ฐ์ ์๋ฐ์ดํธํ์ฌ ๋ฐ์ํ๋ค.

ํ์ง๋ง ์ ๋ฐ์ดํฐ๊ฐ์ ๋ณ๊ฒฝ์ํฌ ๋ ๊ผญ setState๋ฅผ ์ฌ์ฉํด์ผํ๋ ๊ฒ์ผ๊น?  
๊ทธ๋ฅ ๋ณ์๋ก ์ ์ธํ๊ณ  ์ฌ์ฉํ๋ฉด ์๋๋ ๊ฒ์ธ๊ฐ?

```js
mport React from "react";
import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");

let counter = 0;

const handleClick = () => {
  counter++;
  console.log("counter", counter);
  renderContent();
};

const renderContent = () => {
  const content = (
    <div>
      <button onClick={handleClick}>Increment counter</button>
      <div>Counter value is {counter}</div>
    </div>
  );

  ReactDOM.render(content, rootElement);
};

renderContent();


```

์ ์์ ์ฒ๋ผ ๋ณ์๋ก ์ ์ธํ์ฌ ์ฌ์ฉํ  ์๋ ์์ง๋ง ๋ค์ ๋ก์ง์ด ๋ณต์กํด๋ณด์ธ๋ค.  
ํ์ง๋ง setState๋ฅผ ์ฌ์ฉํ๋ฉด ์์ ๊ฐ์ด ๋ณต์กํ ๋ก์ง์ ์ฌ์ฉํ์ง์๊ณ  ์๋ฐ์ดํธ๋ ๊ฐ์ ๋ฐ์ํด์ค ์ ์๋ค.

์ฆ, ๊ฐ์ ์๋ฐ์ดํธํ  ๋ state๋ฅผ ์ฌ์ฉํ๋ ์ด์ ๋ ํธ๋ฆฌํ๊ฒ ๊ฐ์ ์๋ฐ์ดํธํ๊ธฐ ์ํด์์ด๋ค.

## why ๋ถ๋ณ์ฑ ์ ์ง

์์์๋ ์ธ๊ธํ๋ฏ์ด ๋ฆฌ์กํธ์์๋ ์๋ฐ์ดํธ๋ ๊ฐ์ ๋ฐ์ํ  ๋ ๋ถ๋ณ์ฑ์ ์ ์งํด์ผํ๋ค.

๋ถ๋ณ์ฑ์ ์งํจ๋ค๋ ๊ฒ์ ๊ธฐ์กด state๊ฐ์ ๋ณ๊ฒฝํ๋ ๊ฒ์ด ์๋ ์๋ก์ด ๊ฐ์ ํ ๋นํ๋ ๊ฒ์ด๋ค.  
๋ถ๋ณ์ฑ์ด ์ง์ผ์ง์ง ์๊ณ  ๊ธฐ์กด state๊ฐ์ ๊ฑด๋๋ ค ๋ณ๊ฒฝํ๊ฒ ๋๋ฉด ๋ฆฌ์กํธ์์ ๊ฐ์ด ๋ฐ๋๋ ๊ฒ์ด ๊ฐ์ง๋์ง๋ชปํด์ ๋ณ๊ฒฝ๋ ๊ฐ์ ๋ฐ์ํ์ง๋ชปํ๋ค.

```js
import React, { useState } from "react";

const Test = () => {
  const [value, setValue] = useState([1, 2, 3]);

  let number = [1, 2];

  console.log("render");
  return (
    <div>
      <h1>{value}</h1>
      <button
        onClick={() => {
          number.push(3);
        }}
      >
        Change
      </button>
    </div>
  );
};

export default Test;
```

```js
import React, { useState } from "react";

const Test = () => {
  const [value, setValue] = useState([1, 2, 3]);

  return (
    <div>
      <h1>{value}</h1>
      <button
        onClick={() => {
          value.push(4);
          console.log(value);
        }}
      >
        Change
      </button>
    </div>
  );
};

export default Test;
```

์ ์์ ์์ ๋ฒํผ์ ๋๋ฅด๋ฉด number๊ฐ์ด [1,2,3]์ผ๋ก ๋ฐ๋์ด h1์ ์๋ฐ์ดํธ๋๊ธธ ๊ธฐ๋ํ์ง๋ง ์๋ฐ์ดํธ๋ ๊ฐ์ ๋ฐ์๋์ง์๋๋ค.  
useState์ state๊ฐ์ ์ถ์ถํ์ฌ setState๋ฅผ ์ฌ์ฉํ์ง์๊ณ  state๊ฐ์ ๋ณ๊ฒฝํ์ฌ๋ ๊ฐ์ด ๋ฐ์์ด ์๋๋ค.

๋ฆฌ์กํธ๋ ๊ฐ์ ๋ณ๊ฒฝ์ ๋ฐ์ํ  ๋ ์ฐธ์กฐ๊ฐ(์๋ก์ด ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๋ฅผ ๊ฐ์ง ๊ฐ)์ ๋น๊ตํ์ฌ ๋ฐ์ํ๊ธฐ ๋๋ฌธ์ ๊ธฐ์กด๊ฐ์ ๋ณ๊ฒฝํ๋ฉด ์๋ก ๋ง๋ค์ด์ง ์ฐธ์กฐ๊ฐ์ด ์๊ธฐ ๋๋ฌธ์  
์๋ฐ์ดํธ๋ ๊ฐ์ ๋ฐ์ํ์ง ๋ชปํ๋ค.

๋ฆฌ์กํธ๋ ์ํ๊ฐ์ ์๋ฐ์ดํธํ  ๋ ์ฐธ์กฐ๊ฐ์ ๋ํ ์์ ๋น๊ต๋ฅผ ํ๋ค.  
์ฆ, ์ํ๊ฐ์ด ๊ฐ์ฒด๋ผํ  ๋ ์์ ์์ฑ๊น์ง ์ผ์ผํ ๋น๊ต๋ฅผ ํ์ง์๊ณ  ์ฐธ์กฐ๊ฐ๋ง ๋น๊ตํ์ฌ ์ํ ๋ณํ๋ฅผ ๊ฐ์งํ๋ค๋ ๋ป์ด๋ค.  
๊ทธ๋ ๊ธฐ ๋๋ฌธ์ ์ํ๊ฐ์ ์๋ฐ์ดํธํ  ๋ ๊ฐ์ฒด์ ๋ํ ์๋ก์ด ์ฐธ์กฐ๊ฐ์ ํ ๋นํ์ฌ ์๋ฐ์ดํธํ๋ ๊ฒ์ด๋ค.

## ๐งฉ state in Class Component

```js
import React, { Component } from "react";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }
  render() {
    const { number } = this.state;
    return (
      <div>
        <span>{number}</span>
        <button
          onClick={() => {
            this.setState({ number: number + 1 });
          }}
        >
          Increase
        </button>
      </div>
    );
  }
}

export default ClassComponent;
```

![](https://images.velog.io/images/kcj_dev96/post/c09ecccb-2a01-469d-8f5a-e01d45489117/ButtonIncrease.png)

- ํด๋์คํ ์ปดํฌ๋ํธ์์ state๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์๋ **constructor ์์ฑ์๋ฅผ ์ฌ์ฉ**ํ  ์ ์๋ค.

- ๋ฐ๋ผ์ constructor()๋ฉ์๋ ๋ด์์** state๊ฐ์ ๊ฐ์ฒด ํ์์ผ๋ก ์ค์ **ํด์ฃผ๋ฉด ๋๋ค.

- state ๊ฐ์ ๊ฐฑ์ ํ๊ณ ์ ํ  ๋์๋ ์ฌ๋ฌ๊ฐ์ง ๋ฐฉ๋ฒ์ด ์๊ฒ ์ง๋ง ์์๋ก๋
  **๋ฆฌ์กํธ ์์(button)์ ์ด๋ฒคํธ ํธ๋ค๋ฌ๋ฅผ ๋ฐ์ธ๋ฉํ์ฌ setState() ๋ฉ์๋์ ์ธ์๋ก ๊ฐ์ฒด๋ฅผ ์๋ ฅํ์ฌ ๊ฐ์ ๋ณ๊ฒฝํด์ฃผ๋ฉด** ๋๋ค.

- _**์ฐธ๊ณ ๋ก setState๋ render()๋ฉ์๋ ๋ด์์ ์ฌ์ฉํด์ผํ๋ค.**_

> - React.Component๋ฅผ ์์ํ ์ปดํฌ๋ํธ๋ **props๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํ์ฌ super๋ก props๋ฅผ ์ ๋ฌ๋ฐ๋๋ค.**
>   (_**super class์ ์ธ์๋ฅผ ์ ๋ฌ๋ฐ๊ธฐ ์ํด์๋ sub class๋ super()๋ฉ์๋์ ์ธ์๋ก ๋ฐ์์ค์ผํจ.**_)

- _ํ์ง๋ง constructor()๋ฉ์๋๋ฅผ ์๋ตํ์ฌ๋ **React.Component๋ก๋ถํฐ props๋ฅผ ์๋ฌต์ ์ผ๋ก ์์๋ฐ์ props๋ฅผ ์ฌ์ฉ**ํ  ์ ์๋ค._

ํด๋์คํ ์ปดํฌ๋ํธ์์ ์๋ณด๋ค **ํธํ๊ฒ state๊ฐ์ ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ**์ ๋ค์๊ณผ ๊ฐ๋ค.

```js
import React, { Component } from "react";

class ClassComponent extends Component {
  state = {
    number: 0,
  };
  render() {
    const { number } = this.state;
    return (
      <div>
        <span>{number}</span>
        <button
          onClick={() => {
            this.setState({ number: number + 1 });
          }}
        >
          Increase
        </button>
      </div>
    );
  }
}

export default ClassComponent;
```

**constructor() ๋ฉ์๋๋ฅผ ์๋ตํ์ฌ ํธ๋ฆฌํ๊ฒ state๋ฅผ ์ ์ํ  ์ ์๋ค.**

---

## ๐งฉ state in Function Component

> ํจ์ํ ์ปดํฌ๋ํธ์์๋ **ํ**์ ์ฌ์ฉํ์ฌ state๋ฅผ ๊ด๋ฆฌํ๋ค.

```js
import React, { useState } from "react";

const FunctionComponent = () => {
  const chooseColor = ["red", "orange", "yellow", "green", "blue", "purple"];
  const [color, setColor] = useState("black");
  function colorChange() {
    const ran = Math.floor(Math.random() * 6);
    setColor(chooseColor[ran]);
  }
  return (
    <>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: color,
        }}
      ></div>
      <button onClick={colorChange}>Change</button>
    </>
  );
};

export default FunctionComponent;
```

<br/>

### ๐ useState

- useState๋ผ๋ ํ์ ์ฌ์ฉํ์ฌ state๋ฅผ ๊ด๋ฆฌํ๋ค.
- useState๋ React์ ๋ฉ์๋ ์ค ํ๋์ด๋ค.

```js
import { useState } from "react";
```

- useState()๋ ๋ ๊ฐ์ ์์๋ฅผ ๊ฐ๋ ๋ฐฐ์ด์ ๋ฐํํ๋ค
  > useState() => [์ง์ ๊ฐ , ์ง์ ๊ฐ์ ๋ณ๊ฒฝํด์ฃผ๋ ํจ์]
- ์ผ๋ฐ์ ์ผ๋ก ๋ฐฐ์ด ๊ตฌ์กฐ๋ถํด๋ฅผ ํ์ฌ ์ฌ์ฉํ๋ค.

```js
const [color, setColor] = useState("black");
```

> color : ์ง์ ๊ฐ
> setColor : color๋ฅผ ๋ณ๊ฒฝํด์ฃผ๋ ํจ์

์ด์ฒ๋ผ ํจ์ํ ์ปดํฌ๋ํธ์์๋ **useState๋ฅผ ์ฌ์ฉํ์ฌ ํด๋์คํ ์ปดํฌ๋ํธ๋ณด๋ค ๊ฐํธํ๊ฒ state๋ฅผ ๊ด๋ฆฌ**ํ  ์ ์๋ค๋ ์ฅ์ ์ด ์๋ค.

---

## ๐ change props using state

- props๋ ์์ฒ๋ผ ์ปดํฌ๋ํธ๋ด์์ ๊ฐ์ ๋ณ๊ฒฝํ ๋์๋ ์ธ ์ ์์ง๋ง
  **๋ถ๋ชจ ์ปดํฌ๋ํธ์ state ๊ฐ์ ์์์ปดํฌ๋ํธ์ props๋ก ์ ๋ฌ๋ฐ์ ์ฌ์ฉ**ํ  ์๋ ์๊ณ  ์ด๊ฒ์ด ์ผ๋ฐ์ ์ผ๋ก state์ props๋ฅผ ๊ฐ์ด ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ์ด๋ค.

**ParentComponent.js**

```js
import React, { Component } from "react";
import ChildComponent from "./ChildComponent";
class ParentComponent extends Component {
  state = {
    number: 0,
  };
  render() {
    const { number } = this.state;
    const changeNumber = () => {
      this.setState({ number: number + 1 });
    };
    return (
      <div>
        <ChildComponent id={number} changeNumber={changeNumber} />
      </div>
    );
  }
}

export default ParentComponent;
```

**ChildCoponent.js**

```js
import React from "react";

const ChildComponent = ({ id, changeNumber }) => {
  return (
    <div>
      <span>{id}</span>
      <button onClick={changeNumber}>Increase</button>
    </div>
  );
};

export default ChildComponent;
```

- **๋ถ๋ชจ ์ปดํฌ๋ํธ์์ state๊ฐ(number)๊ณผ ๊ฐฑ์  ํจ์(changeNumber)๋ฅผ ์์ ์ปดํฌ๋ํธ์ props๋ก ์ ๋ฌ**ํด์ฃผ์ด ์์์ปดํฌ๋ํธ์ props๊ฐ์ ๋ณ๊ฒฝํ  ์ ์๋ค.

- ์ด์ฒ๋ผ props ๊ฐ์ ๋ณ๊ฒฝํ๊ณ ์ ํ๋ฉด **๋ถ๋ชจ ์ปดํฌ๋ํธ์์ state๊ฐ์ ์ ์ํ์ฌ ์์ ์ปดํฌ๋ํธ์ ์ ๋ฌ**ํ๋ฉด ๋๋ค.

์ด๊ฒ์ด ๋ฆฌ์กํธ ์ปดํฌ๋ํธ ์ฌ์ฉ์ ์ผ๋ฐ์ ์ธ ๋ฉ์ปค๋์ฆ์ด๋ค.
๐๐

## Reference

- https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
- [state๊ฐ ๋ถ๋ณ์ฑ์ด ์ ์ง๋์ผํ๋ ์ด์ ](https://hsp0418.tistory.com/171)
- [setState๋ ๋น๋๊ธฐ์ ์ผ๋ก ์๋ํ๋ค?](https://betterprogramming.pub/why-dont-react-state-updates-reflect-immediately-9041c4377385#:~:text=Key%20Takeaways,to%20access%20updated%20state%20values.)
