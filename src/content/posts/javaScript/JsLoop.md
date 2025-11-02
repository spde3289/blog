---
title: 자바스크립트 반복문
tags: [javaScript]
date: "2023.04.15"
---
## 반복문의 종류 

- for 문
- for...in 문
- for...of 문
- while 문
- do...while 문
## for 문 

for 문은 특정한 조건이 거짓이 될 때 까지 반복한다.

```javascript

  for([초기문]; [조건문]; [증감문]) {
    // 반복하여 실행할 코드
  };

  for(let i = 0; i <= 3; i++) {
    console.log(i); // 0부터 3까지 출력
  };


```
## for...in 문 

for...in 문은 객체의 속성을 열거할 때 유용하게 활용된다. 하지만 일반적인 배열에도 사용이 가능하다.

```javascript

  const object = { a: 1, b: 2, c: 3 };

  for (const property in object) {
    console.log(property); // 객체의 프로퍼티를 출력해준다
  }

  // a
  // b
  // c


```
## for...of 문 

for...of 문은 배열이나 이터러블(iterable) 객체의 각 요소들을 반복적으로 순회하는 데 사용된다.

```javascript

  const object = [
    {a: 1}, 
    {b: 2}, 
    {c: 3}
  ];

  for (const property of object) {
    console.log(property); // 객체의 프로퍼티를 출력해준다
  }

  // {a: 1}
  // {b: 2}
  // {c: 3}


```
## while 문 

while 문은 주어진 조건식이 참이 될 때 까지 반복한다.

```javascript

  while (조건식) {
    // 반복 실행할 코드
  }

  let i = 1;
  while (i <= 10) {
    console.log(i); // 1부터 10까지 출력
    i++;
  }


```
## do...while 문 

do...while 문은 우선 코드를 실행 한 후 조건식이 참이면 반복하여 실행한다.

```javascript

  do {
    // 반복 실행할 코드
  } while (조건식);

  let i = 1;
  do {
      console.log(i); // 1부터 10까지 출력
      i++;
  } while (i <= 10);


```
참고자료 : 

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Loops_and_iteration](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Loops_and_iteration) 
