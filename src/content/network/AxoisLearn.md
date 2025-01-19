---
title: Axios를 배워보자
tags: [Front_end]
date: "2023.02.21"
---
## Axios란? 

Axios는 Promiss기반 HTTP 클라이언트이다. 간단하게 백엔드랑 통신을 쉽게 해주는 라이브러리이다. 특징으로는 HTTP요청과 응답을 JSON형태로 할 수 있다는 점이다.

## 사용방법 

axios로 백엔드와 통신을 할 때는 get(조회), post(등록및 전송), put(수정), delete(삭제) 이렇게 4가지의 HTTP 메서드를 이용하여 통신할 수 있다. 

```javascript

  //GET
  axios.get(url, [config])

  //POST
  axios.post(url[, data[, config]])

  //PUT
  axios.put(url[, data[, config]])
  
  //DELETE
  axios.delete(url[, config])


```
## 응답 데이터 

```javascript

  axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data); // data는 서버가 제공하는 응답이다.
    console.log(response.status);   // status는 HTTP 상태 코드이다.
    console.log(response.statusText); // statusText는 HTTP 상태 메시지이다.
    console.log(response.headers); // // headers 서버가 응답 한 헤더는 모든 헤더 이름이 소문자로 제공한다
    console.log(response.config); config는 요청을 위해 Axios가 제공하는 구성이다.
  });


```
## axios GET 

get 메서드를 사용하는 상황은 이러하다. 단순한 데이터(게시글 목록, 사용자 목록), 파라미터 데이터를 포함시키는 경우

```javascript

  // user에게 할당된 id 값과 함께 요청을 합니다.
  axios.get('/user?ID=12345')
    .then(function (response) {
      // 성공했을 때
    })
    .catch(function (error) {
      // 에러가 났을 때
    })
    .finally(function () {
      // 항상 실행되는 함수
    });
  
  // 위와는 같지만, 옵션을 주고자 할 때는 이렇게 요청을 합니다.
  axios.get('/user', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      // 성공했을 때
    })
    .catch(function (error) {
      // 에러가 났을 때
    })
    .finally(function () {
      // 항상 실행되는 함수
    });  

  // async/await 를 쓰고 싶다면 async 함수/메소드를 만듭니다. 
  async function getUser() {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


```
## axios POST 

새로운 리소스를 생성하여 서버에 제출할 때 사용된다. 회원가입, 게시글 작성 등의 작업에서 사용할 수 있다.

```javascript

  axios.post("url", {
    firstName: 'Fred',
    lastName: 'Flintstone'
    })
    .then(function (response) {
        // response  
    }).catch(function (error) {
        // 오류발생시 실행
    })


```
## axios DELETE 

서버에서 리소스를 삭제할 때 사용한다. 게시글 삭제, 사용자 삭제 등의 작업에서 사용할 수 있다

```javascript

  axios.delete('/user?ID=12345')
    .then(function (response) {
      // handle success
    })
    .catch(function (error) {
      // handle error
    })


```
## axios PUT 

서버에서 리소스를 업데이트 또는 교체할 떄 사용한다. 게시글 수정, 사용자 정보 업데이트 등의 작업에서 사용된다.

```javascript

  axios.put("url", {
      username: "",
      password: ""
    })
    .then(function (response) {
      // response  
    }).catch(function (error) {
      // 오류발생시 실행
    })


```
[https://axios-http.com/](https://axios-http.com/) 

[https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-%EC%84%A4%EC%B9%98-%EC%82%AC%EC%9A%A9](https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-%EC%84%A4%EC%B9%98-%EC%82%AC%EC%9A%A9) 
