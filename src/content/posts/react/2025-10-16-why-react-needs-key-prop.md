---
title: React에서 리스트 렌더링할 때 key가 필요한 이유
tags: ["React", "Rendering", "Reconciliation"]
date: "2025.10.16"
---

React로 리스트 UI를 만들 때 `map()`을 많이 쓴다. 문제는 `key`를 빼면 경고가 뜨고, 대충 아무 값이나 넣으면 또 다른 문제가 생긴다는 점이다.

이 글에서는 `key`가 왜 필요한지, 특히 `index`를 `key`로 쓰면 왜 위험한지까지 정리한다.

## 리스트 렌더링과 key 경고

배열을 `map()`으로 JSX로 바꾸면 반복 렌더링이 된다.

```jsx
const posts = [
  { id: 1, title: "react의 모든 것" },
  { id: 2, title: "HTML의 모든 것" },
  { id: 3, title: "CSS의 모든 것" },
  { id: 4, title: "JavaScript의 모든 것" },
  { id: 5, title: "next.js의 모든 것" },
];

export default function PostList() {
  return (
    <>
      {posts.map((post) => (
        <div>제목: {post.title}</div>
      ))}
    </>
  );
}
```

이 상태로 렌더링하면 콘솔에 이런 경고가 뜬다.

> Warning: Each child in a list should have a unique "key" prop.

## key가 필요한 이유

React는 상태가 바뀔 때마다 “이전 렌더 결과”와 “다음 렌더 결과”를 비교해서 필요한 변경만 반영한다.

리스트는 항목이 여러 개라서, 비교 과정에서 이런 질문이 생긴다.

* 이 항목은 **그대로**인가?
* **추가/삭제**된 건가?
* 아니면 **같은 항목이 위치만 이동**한 건가?

이걸 안정적으로 판단하려면 항목마다 “이 항목은 누구냐”를 알려주는 식별자가 필요하다.

책 더미에 이름표가 없으면 순서 바꾸거나 몇 권을 빼고 넣을 때 정리하기 어려운 것처럼, React도 `key` 없이는 항목을 제대로 매칭하기 힘들어진다.

## index를 key로 쓰면 왜 위험할까

`key`를 안 주면 React는 내부적으로 index 기반으로 매칭하려고 한다.

근데 리스트 중간에 **삽입/삭제/정렬**이 일어나면 index가 밀린다. 이때 React가 “같은 항목”이라고 착각하기 쉬워진다.

문제가 커지는 지점은 두 가지다.

* 불필요한 DOM 변경이 늘어남 (재사용할 수 있는 것도 새로 만듦)
* 컴포넌트의 state가 “항목”이 아니라 “자리(index)”에 붙어버려서 의도와 다른 결과가 나올 수 있음

그래서 정렬/필터/검색처럼 리스트가 자주 변하는 화면에서는 `index key`가 특히 위험하다.

## 예시: 순서 변경에서 key가 하는 일

아래는 버튼을 눌러 리스트 순서를 뒤집는 예시다. 핵심은 `key`를 **고유하고 안정적인 값(id)** 으로 준다는 거다.

```jsx
import { useState } from "react";

function PostItem({ title }) {
  return <li>{title}</li>;
}

export default function PostList() {
  const [posts, setPosts] = useState([
    { id: 1, title: "react의 모든 것" },
    { id: 2, title: "HTML의 모든 것" },
    { id: 3, title: "CSS의 모든 것" },
  ]);

  const shuffle = () => {
    setPosts([
      { id: 3, title: "CSS의 모든 것" },
      { id: 2, title: "HTML의 모든 것" },
      { id: 1, title: "react의 모든 것" },
    ]);
  };

  return (
    <div>
      <button onClick={shuffle}>순서 바꾸기</button>
      <ul>
        {posts.map((p) => (
          <PostItem key={p.id} title={p.title} />
        ))}
      </ul>
    </div>
  );
}
```

`key={p.id}` 덕분에 React는 “같은 항목이 위치만 이동했다”로 판단할 수 있고, 재사용 가능한 건 재사용한다.

반대로 `key={index}`면 “자리에 붙어있는 컴포넌트”처럼 취급되기 쉬워서, 순서가 바뀌는 순간부터 매칭이 틀어질 수 있다.

## React DevTools에서 하이라이트가 똑같이 보였던 이유

![DevTools](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2025-10-16-why-react-needs-key-prop/animation.gif)

DevTools의 “Highlight updates when components render”는 **렌더 단계에서 함수가 다시 호출되는지**를 보여준다.

`key`는 렌더 호출 자체를 줄이는 장치가 아니다. `key`가 하는 일은 “비교 과정에서 무엇을 같은 것으로 볼지”를 결정해서, 결과적으로 커밋 단계에서 DOM 변경을 줄일 수 있게 돕는 쪽에 가깝다.

그래서 `key`가 있어도 하이라이트가 뜰 수 있다. 그건 “렌더가 다시 돌았다”는 의미고, “DOM을 다 갈아엎었다”는 의미는 아니다.

## 정리

* `map()`으로 리스트 렌더링을 만들 때는 각 항목에 **고유하고 안정적인 `key`** 를 준다.
* `key`는 React가 리스트 항목의 **추가/삭제/이동**을 제대로 판단하기 위한 식별자다.
* `index key`는 리스트가 변하는 순간(삽입/삭제/정렬) 문제를 만들기 쉬워서 지양한다.
* DevTools의 하이라이트는 “렌더 단계” 기준이라, `key`가 있어도 렌더 하이라이트가 뜰 수 있다.

## 참고 자료

* React 공식 문서: 리스트 렌더링 [https://ko.react.dev/learn/rendering-lists](https://ko.react.dev/learn/rendering-lists)
* React 레거시 문서: Reconciliation [https://legacy.reactjs.org/docs/reconciliation.html](https://legacy.reactjs.org/docs/reconciliation.html)
