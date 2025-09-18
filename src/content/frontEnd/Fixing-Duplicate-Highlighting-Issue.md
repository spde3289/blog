---
title: Element previously highlighted
tags: [frontEnd]
date: "2025.02.01"
---
이번에 블로그를 Next.js로 마이그레이션 하면서 코드 하이라이팅에 문제가 생겼습니다.

## 문제 해결
코드 하이라이팅이 중복으로 적용돼 에러 메세지가 출력됬고 코드가 변경될 때 마다 이전의 하이라이팅을 제거하고 다시 하이라이팅을 적용해주어야 합니다.

하지만 저는 `react-highlight`를 이용해 간단하게 해결 했습니다.

`react-highlight`는 React 방식으로 래핑한 라이브러리로 리셋하고 다시 하이라이팅하는 처리를 하지 않아도 됩니다.

## 기능 추가
문제를 해결한 김에 코드블록에 복사할 수 있는 버튼을 추가하고 싶어졌고 이렇게 애니메이션 까지 적용해 
기능을 개선 했습니다.
```js
useEffect(() => {
  const codeBlocks = document.querySelectorAll("pre");
  codeBlocks.forEach((block) => {
    if (block.querySelector(".copy-button")) return;

    const button = document.createElement("button");
    button.innerHTML = CopySvg;
    button.className = "copy-button"; // CSS 클래스 이름 추가

    // 복사 이벤트 핸들러
    button.addEventListener("click", () => {
      const code = block.querySelector("code")?.textContent || "";
      navigator.clipboard.writeText(code).then(() => {
        button.innerHTML = CheckSvg;
        button.classList.add("check-button"); // check-button 클래스 추가
        button.classList.remove("copy-button");

        // 2초 후에 check-button 클래스를 제거
        setTimeout(() => {
          button.innerHTML = CopySvg;
          button.classList.remove("check-button");
          button.classList.add("copy-button");
        }, 2000);
      });
    });

    block.style.position = "relative";
    block.appendChild(button);
  });
}, [contentHtml]);
```