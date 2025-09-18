---
title: 무한 스크롤 구현하기 (Intersection observer API)
tags: [frontEnd]
date: "2023.05.01"
---
팀프로젝트를 진행하면서 무한스크롤을 이용해서 게시글들을 보여주기로 했다. 페이지네이션이 아닌 무한 스크롤을 선택한 이유는 모바일 환경 지원이 이유이기도 하다. 무한 스크롤을 만들어 본 적이 없어 어떻게 만들어야 하나 찾아보던 중 세 가지 방법으로 만들 수 있다고 했다. 첫번째는 스크롤 이벤트 헨들러를 이용한 방법이고 두번째는 Debounce 와 Throttle를 이용한 방법 마지막으로 Intersection Observer API를 이용하는 방법이다. 각각의 방법마다 장단점이 존재하지만 나는 Intersection Observer API를 이용해 구현하는 방법을 선택했다. 그 이유와 사용방법에 대해 기술하려 한다.

## Intersection Observer API이란? 

Intersection Observer API는 뷰표트와 요소의 교차를 관찰하는 API이다. 이 API를 이용하면 요소가 뷰포트에 들어오거나 나가나는등 이벤트를 감지하고 처리할 수 있게된다. 또한 이 기능은 비동기적으로 실행되어 스크롤 이벤트에서 발생하는 성능 저하 같은 문제없이 사용 할 수 있다.

## 사용방법 

```javascript

  let options = {
    root: null, // 뷰포트 설정 
    rootMargin: '0px', // root가 가진 마진을 나타낸다.
    threshold: 1.0 // 
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { // 요소가 관측이 되면 실행된다.
        // 실행할 코드
      }
    });
  };

  // 인스턴트 생성
  let observer = new IntersectionObserver(callback, options);
  // 타겟 요소 관찰 시작
  observer.observe(target.current);
  

```
new IntersectionObserver()를 이용해 인스턴스를 생성해준다. callback은 관찰 대상이 보이면 실행되는 함수이다. options은 관찰이 시작되는 상황에 대해 설정할 수 있다. observer.observe()은 관찰 대상을 시작한다는 말이다. 대상 element가 관찰이 되면 위에 있는 callback. 함수가 실행된다. callback은 (entries, observer)를 인수로 가지게 된다. entriess 는 IntersectionObserverEntry의 배열인데 이 배열은 읽기 전영으로 다음과 같은 속성을 가지고 있다.

- boundingClientRect: 관찰 대상의 사각형 정보를 나타낸다.
- intersectionRatio: 관찰 대상의 교차한 영역 정보를 나타낸다.
- intersectionRect: 관찰 대상 요소와 뷰포트의 교차 영역 정보를 나타내는 정보이다.
- isIntersecting: 관찰 대상 요소가 뷰포트와 교차하는지 여부를 나타내는 부울 값이다.
- rootBounds: 뷰포트의 경계 사각형 정보를 나타내는 DOMRectReadOnly 객체이다.
- target: 관찰 대상 요소에 대한 참조이다. 이를 통해 어떤 요소가 이벤트를 발생시키는지 알 수 있다.
IntersectionObserver 가 가지고 있는 메소드로는 다음이 있다.

- IntersectionObserver.observe() : 타켓에 대한 관찰을 시작한다.
- IntersectionObserver.unobserve() : 타겟에 대한 관찰을 중지한다.
- IntersectionObserver.disconnect() : 타겟 요소들에 대한 모든 관찰을 중지한다.
- IntersectionObserver.takeRecords() : 관찰된 모든 대상에 대한 개체 배열을 반환한다 .
Intersection Observer API를 잘 이용하면 무한스크롤 뿐만이 아니라 컨텐츠나 이미지의 레이즈 로딩, 스크롤마다 변하는 애니메이션 수행등 다양한 방법으로 활용이 가능하다.

[https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) 

[https://velog.io/@elrion018/%EC%8B%A4%EB%AC%B4%EC%97%90%EC%84%9C-%EB%8A%90%EB%82%80-%EC%A0%90%EC%9D%84-%EA%B3%81%EB%93%A4%EC%9D%B8-Intersection-Observer-API-%EC%A0%95%EB%A6%AC](https://velog.io/@elrion018/%EC%8B%A4%EB%AC%B4%EC%97%90%EC%84%9C-%EB%8A%90%EB%82%80-%EC%A0%90%EC%9D%84-%EA%B3%81%EB%93%A4%EC%9D%B8-Intersection-Observer-API-%EC%A0%95%EB%A6%AC) 
