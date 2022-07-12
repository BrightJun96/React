const a = 1;
const b = 1;

const x = { name: "j" };
const y = { name: "j" };

const result = x === y; // 같은 속성을 객체라도 둘은 다른 참조값을 가지고 있다.

console.log(result);
