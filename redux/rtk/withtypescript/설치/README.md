# RTK 설치

## Template

react + typescript + redux 템플릿 상태로 사용하고 싶을 때 설치방법

```
# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript

```

## Add RTK

기존 프로젝트에 추가로 도입할 경우

- `npm install @reduxjs/toolkit`
  RTK는 타입이 내장되어 있기 때문에 별도로 `npm install @types/@reduxjs/toolkit`를 설치해주지 않아도 된다.

- `npm install react-redux`
