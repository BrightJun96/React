## setState와 dispatch의 차이는 무엇일까?

setState는 이전 state와 바뀌는 state값이 같던 다르던 무조건 컴포넌트가 리렌더링된다.  
 dispatch는 이전 state와 바뀌는 state값이 같으면 리렌더링해주지않고 다르면 리렌더링해준다.

setState를 그냥 컴포넌트 내부에서 이벤트핸들러를 통하지않고 그냥 사용하면 무한 리렌더링이 발생한다.  
이유는 setState를 사용할 때 내부적으로 shouldComponentUpdate라는 메서드가 실행되는데 true를 반환하면 컴포넌트가 업데이트되고 false를 반환하면 컴포넌트가 업데이트되지 않는다.  
이는 shouldComponentUpdate 기본 반환값이 true로 되있기때문에 이전state값과 이후state값이 같아도 컴포넌트가 업데이트된다.
그래서 보통 처음 마운트될 때, 업데이트될 때 등의 상황이나 이벤트핸들러에 setState를 사용한다.

하지만 dispatch는 이벤트핸들러를 통하지않고 사용한다하여도 무한리렌더링을 하지않고 **useSelector를 사용하는 컴포넌트만 렌더링**해준다.  
이 때 dispatch 이전 state과 이후 state를 비교하여 같다면 리렌더링을 해주지않고 다르다면 리렌더링을 해준다.  
그렇기 때문에 외부에서 dispatch를 사용하여도 state가 같다면 리렌더링을 해주지않으니 무한리렌더링이 되지않는다.
즉, dispatch는 memoizing기능이 구현되어있어 state값이 바뀌지 않으면 리렌더링을 해주지 않는다.

### !!주의!!

이 때 주의할 것은 dispatch로 보낸 액션값이 같은 속성을 가진 객체를 dispatch한다면 이는 리렌더링을 한다는 것을 주의해야한다.

```js
dispatch({ type: "OBJ_TYPE" });
```

같은 속성을 가진 객체라도 객체는 다른 참조값을 가지고 있기 때문에 다른 값이다.  
때문에 이는 다른 값이므로 state는 바뀌는 객체가 같은 속성값을 가지고 있다하여도 변경된 값으로 인식하게 되어 리렌더링을 하게 된다.

- https://stackoverflow.com/questions/24718709/reactjs-does-render-get-called-any-time-setstate-is-called

- https://www.nielskrijger.com/posts/2021-02-16/use-reducer-and-use-context/#3.-switch-to-redux-(or-similar)

## 이벤트핸들러에서 setState를 사용할 때 무한리렌더링이 발생하지않는 이유는 무엇일까?

이벤트핸들러라하면 특정 버튼을 마우스로 클릭하거나 특정 키보드를 누를 때 실행되는 함수 등을 말하는 것인데 말 그대로 조건이 포함되어있다.  
마우스를 클릭하거나나 특정 키보드를 누를 때 이런식으로 말이다.
즉, 해당 이벤트 동작이 실행될 때만 setState가 실행되기때문에 무한리렌더링이 발생할 수 없다.

하지만 이벤트핸들러가 없거나 특별한 로직없이 컴포넌트 내부에서 그냥 setState를 사용하면 리렌더링이 되도 계속 setState가 실행되기때문에 무한 리렌더링이 발생하는 것이다.

## store.dispatch와 useDispatch가 반환하는 dispatch는 다른가?

아니다. 같다.
