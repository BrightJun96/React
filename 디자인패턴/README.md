# 디자인 패턴

효율적이고 구조적인 소프트웨어 및 코드, 프로젝트 등을 설계하기위해 역할 단위로 분류한 패턴이다.

여러관점에서 디자인패턴을 논할 수 있지만 프론트엔드 관점에서 프로젝트를 설계하기 위한 주요 디자인 패턴을 알아보겠다.  
디자인 패턴은 명확히 정해져있는 것이 아니라 보는 관점에 따라 차이가 있다.

프레임워크,라이브러리와 vanilla js로 구현 여부에 따라 패턴을 MVC/MVVM으로 구분할 수도 있고  
React,Vue,Angular,Svelte와 같은 프레임워크, 라이브러리안에서도 디자인 패턴을 구분할 수도 있다.

이는 모델,뷰,컨트롤러와 같은 역할을 어느 관점에서 보느냐에 따라 구분하는 것이다.

1. MVC 패턴
2. MVVM 패턴
3. flux 패턴

## MVC(Model-View-Controller)

MVC란 데이터(Model)와 View(UI)와 Controller(컨트롤러)로 구분하는 디자인 패턴이다.  
3가지 카테고리로 분류함으로써 체계적인 관리를 할 수 있게 해준다.

뷰는 유저에게 보여주는 화면(UI)이고 모델은 데이터이고 컨트롤러에 의해 업데이트되며 데이터를 이용하여 뷰를 보여준다.  
컨트롤러는 특정 이벤트나 동작에 의해 데이터를 업데이트에 뷰에 반영하는 역할을 한다.

View : HTML + CSS로 만들어지는 결과물
Model : 자바스크립트 객체 데이터 or API로 받아오는 데이터 or DB 데이터
Controller : Model를 변경하여 뷰에 반영하는 로직

각 역할에 따라 명시적으로 분류하여 체계적으로 관리할 수 있다는 장점이 있다.

리액트가 뷰에만 집중한 라이브러리라 해도 MVC패턴으로 설계하여 사용되기도 한다.  
예를 들어 리덕스를 사용할 때에 redux state값(Model)을 useSelector로 가져와 Container Component(Controller)로 로직을 구현하고 Presentational Component(View)에 반영하는 방식도 MVC패턴이라 할 수 있다.

그렇기 때문에 이러한 디자인 패턴은 프레임워크에서 정해진 패턴이 있을 수도 있지만 개발자가 설계할 수 있는 패턴이 될 수도 있다.

번외로 초창기 웹 서비스에서는 프론트엔드라는 개념이 없었는데 이 때는 MVC패턴의 역할을 분류할 때  
데이터베이스 => Model , HTML+CSS+Javascript(프론트엔드) => View , 백엔드 => Controller 라고 취급했다고 한다.

하지만 웹 서비스가 발전하면서 프론트엔드와 백엔드가 분류되며 프론트엔드관점에서  
세분화하여 MVC패턴을 적용하고 있다.

이처럼 여러 관점에 따라 디자인 패턴을 논할 수 있다.

### MVC 패턴의 동작순서

1. 사용자의 Action들은 **Controller**에 들어오게 된다.
2. Controller는 사용자의 Action를 확인하고, Model을 업데이트한다.(뷰를 직접적으로 업데이트하는 것이 아님.)
3. Controller는 Model을 나타내줄 View를 선택한다.
4. View는 Model을 이용하여 화면을 나타낸다.

주의할 점은 Controller가 Model를 변경시키는 것이지 View를 직접적으로 조작하지 않는다것에 유의하자.

## MVVM 패턴

View를 그리는 Model만 다루게 되었다는 의미로 ViewModel이라고 부르며 이 방식을 MVVM이라고 한다.  
바닐라 js나 제이쿼리와 비교해보았을 때 React,Vue, Angular ,Svelte 등은 MVVM 아키텍쳐를 가지고 있다고 볼 수 있다.

제이쿼리는 html을 설계하여 html요소 셀렉트해 컨트롤해 html에 반영하는 MVC 패턴을 사용했다.

그에 비해 React,Vue,Angular와 같은 프레임워크,라이브러리는 html을 View라고 보았을 때,
자바스크립트에서 DOM요소들을 만들어 주입(View Model)하기 때문에 뷰에 신경쓰지않고 자바스크립트를 활용하여 뷰모델을 통해 뷰를 관리할 수 있다.

### MVVM 패턴의 동작순서

1. 사용자의 Action들은 **View**를 통해 들어오게 된다.
2. View에 Action이 들어오면, Command 패턴으로 **View Model에 Action을 전달**한다.
3. View Model은 Model에게 데이터를 요청한다.
4. Model은 View Model에게 요청받은 데이터를 응답한다.
5. View Model은 응답 받은 데이터를 가공하여 저장한다.
6. View는 View Model과 Data Binding하여 화면을 나타낸다.

MVC와 달리 View과 View Model(MVC의 Controller 역할)이 상호작용한다는 점과 View와 Model이 의존성이 없다는 차이점이 있다.

## 많이 사용하는 자비스크립트 라이브러리,프레임워크들인 리액트, 뷰 , 앵귤러는 어떤 디자인 패턴을 적용하고 있다고 봐야할까?

### 리액트는 V(View)에 집중한 패턴

리액트 라이브러리는 모델과 컨트롤러를 구분하지않고 뷰인 컴포넌트단에서 해결하려한다.  
html DOM요소를 셀렉트하지않고 react.createElement로 요소를 만들어내면서 루트 엘리먼트에 주입하는 방식이다.  
이는 복잡하게 분류하지않고 뷰에만 신경쓰자는 관점에서 고안한 방법인 것 같다.

따라서 MVC처럼 역할에 따라 분류하고 싶다면 개발자의 취향에 따라 디렉터리를 분류하면 된다.  
예를 들어, 페이지부문은 page 디렉터리, 상태부문은 store 디렉터리, api는 api 디렉터리 등으로 말이다.

리액트는 컴포넌트 단에만 신경쓰면 되기 때문에 디자인 패턴은 개발자 취향대로 분류하면 된다.

리액트 공식홈페이지에서도 리액트를 설명할 때, "뷰에만 신경쓰고 데이터를 관리할 때에는 state로 관리하라"라고 적혀있다.  
state라는 상태가 변화됨에 따라 Virtual DOM을 리렌더링하여 뷰에 반영하는 시스템이라 MVC패턴처럼 구분하지않고 View에만 집중할 수 있다.

### 뷰는 MVVM패턴?

### 앵귤러는 MVC패턴?

## Reference

- https://developer.mozilla.org/en-US/docs/Glossary/MVC
- [각종 디자인 패턴(MVC/MVP/MVVM)](https://beomy.tistory.com/43)
- [프론트엔드에서 아키텍쳐란?](https://velog.io/@teo/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-MV-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94)
