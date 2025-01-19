---
title: Jsdoc주석에 대해서 알아보자
tags: [javascript]
date: "2023.02.26"
---
JSDoc 주석은 JavaScript 코드에 추가되는 문서화 주석이다. 이 주석은 함수, 변수, 객체의 설명, 타입정보 등을 제공할 수 있다. 

## JSDoc 주석 사용법 

```javascript

  /**
   * 가격과 개수 입력받아 출력하는 함수
   * @param {number} price 가격 입력란 입니다
   * @param {number} count 개수 입력란 입니다
   * @returns 가격과 개수를 곱한 값을 출력합니다.
   */
  const sum = (price, count) => {
    return price * count;
  };


```
![백엔드 이미지](/img/javascript/Jsdoc/example1.png)
이와 같이 함수를 호출 할 때 주석를 보여주게 된다.

## @deprecated 

해당태그를 사용하면 취소선을 그어준다

```javascript

  /**
   * 가격과 개수 입력받아 출력하는 함수
   * @param {number} price 가격 입력란 입니다
   * @param {number} count 개수 입력란 입니다
   * @returns 가격과 개수를 곱한 값을 출력합니다.
   */
  const sum = (price, count) => {
    return price * count;
  };


```
![백엔드 이미지](/img/javascript/Jsdoc/example2.png)
## @type 

해당태그를 사용하면 타입을 명시 할 수 있다.

```javascript

  /**
   * @type {string}
   */
  const name = '곽철용';


```
![백엔드 이미지](/img/javascript/Jsdoc/example3.png)
## @see 

해당태그를 리소스를 참조할 떄 사용할 수 있다.

```javascript

  /**
  * @see {@link https://example.com| 더 많은 정보}
  */
  const sum = ({price, count}) => {
    return price * count;
  };


```
![백엔드 이미지](/img/javascript/Jsdoc/example4.png)
이것 말고도 더 다양한 태그들이 있으니 JSDoc 참고 사이트를 확인해보도록 하자

## 참고 사이트 

[https://jsdoc.app/](https://jsdoc.app/) 
