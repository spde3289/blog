---
title: 비동기 작업 동시 요청
tags: [frontEnd]
date: "2024.10.05"
---
오늘은 비동기 작업을 테스트하다 생긴 경험에 대해 적어보려고 합니다.

## 주요 내용
- 데이터 요청시 모든 데이터를 받아옵니다.
- 받은 데이터 중 필요한 데이터만 필터링합니다.
- 필터링된 데이터의 세부 정보에 대한 요청을 한번에 보내고 모든 요청이 완료된 후 한번에 응답을 받습니다.

이 내용이 제가 초기에 생각한 동작입니다. 하지만 제가 구현한 기능을 보면 

- 데이터 요청시 모든 데이터를 받아옵니다.
- 받은 데이터 중 필요한 데이터만 필터링합니다.
- 필터링된 데이터의 세부 정보에 대한 요청을 각각 보내고 따로따로 완료된 응답을 받습니다.

비동기에 대한 이해가 부족해 생긴 문제라 생각해 동기와 비동기에 대해 다시 한번 정리해보려 합니다.

## 동기와 비동기의 차이
### 동기
코드가 순차적으로 실행되며 한 작업이 끝나야 다음 작업이 수행됩니다.  
일반적인 JavaScript 코드 실행 방법 입니다.
```javascript
console.log("1"); // 1
console.log("2"); // 2
console.log("3"); // 3
console.log("4"); // 4
// 출력 순서: 1 → 2 → 3 → 4
```
### 비동기
작업을 병렬로 처리하며 결과를 기다리지 않고 다음 작업을 수행합니다.  
setTimeout, API 호출, 파일 읽기 작업 등이 해당됩니다.
```javascript
console.log("햄버거 주문"); // 1

setTimeout(() => {
  console.log("햄버거 완성!"); // 3 (3초 후)
}, 3000);

console.log("콜라 주문"); // 2
console.log("콜라 완성!"); // 3
```
비동기로 API호출을 할 땐 `.then()` `.catch()` 문을 사용하거나 `async/await`를 사용해 요청
할 수 있습니다.

## 내 코드 살펴보기 
**초기 코드**
```javascript
const responses = await array.map(async (data) => {
  const response = await Get(
    "/example",
    { params: { data } }
  );
  return response; 
})

await Promise.all(responses)
```
`map`은 단순히 배열의 각 요소를 순회하며 비동기 함수가 반환된 배열을 반환할 뿐 이를 처리하지는 않습니다.  
결과적으로 `Promise` 객체 배열을 반환하게 됩니다. 또 `map` 내부에 불필요한 `await`를 사용해 코드가 중복적으로 
처리되는 문제가 있었습니다. 

**개선된 점**

```javascript
const responses = await Promise.all(array.map((data) => {
  return Get(
    "/example",
    { params: { data } }
  );
}))
```
`Promise.all`을 이용해 모든 비동기 요청을 병렬로 처리해 전체 작업이 완료될 때까지 기다립니다.  
기존 코드에서 중첩된 async/await를 제거해 작업을 단순화하고 가독성을 높였습니다.

## 결론
이 경험을 통해 비동기 작업에 대한 이해와 `Promise.all`의 활용 방법을 배우게 되었고 자바스크립트에서 제공하는 
메서드의 사용방법을 명확하게 알게 되었습니다.