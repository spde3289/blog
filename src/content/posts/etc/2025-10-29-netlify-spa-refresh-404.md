---
title: Netlify 배포에서 새로고침 시 404(Page not found) 해결
series: sprint-bootcamp
tags: ["Netlify", "배포", "React", "SPA", "Redirects"]
date: "2025.10.29"
---

스프린트 미션을 React로 마이그레이션한 뒤, 코드 리뷰를 받으려고 Netlify로 배포했다.  
배포는 문제없이 끝났는데, 라우팅된 페이지에서 새로고침을 하면 `Page not found`가 뜨면서 `net::ERR_ABORTED 404`가 발생했다.

![Page not found](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2025-10-29-netlify-spa-refresh-404/404image.png)

## 원인

React는 SPA라서 실제로는 `index.html` 하나로 시작하고, 페이지 이동은 React Router가 클라이언트에서 처리한다.

그래서 `/items` 같은 경로로 “이동”하는 건 문제가 없는데, 새로고침을 누르는 순간 브라우저는 서버에 `/items` 리소스를 직접 요청한다.  
Netlify는 정적 파일을 서빙하는 구조라서 `/items`에 해당하는 파일이 없으면 404를 반환한다.

## 해결 방법

Netlify 쪽에서 “어떤 경로로 들어와도 SPA는 결국 index.html로 처리한다”는 규칙을 추가하면 된다.

[Netlify 공식 문서](https://docs.netlify.com/manage/routing/redirects/overview/)에서 방법을 두 가지로 안내한다.

- `_redirects` 파일 사용
- `netlify.toml` 설정 파일 사용

나는 설정이 단순한 `_redirects`를 선택했다.

### 1) `public/_redirects` 파일 추가

프로젝트 `public` 폴더에 `_redirects` 파일을 만들고 아래 한 줄을 넣었다.

![redirects 설정](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2025-10-29-netlify-spa-refresh-404/image.png)


```txt
/* /index.html 200
```

의미는 단순하다.

* 어떤 경로로 요청이 와도(`/*`)
* `index.html`을 내려주고(`/index.html`)
* 상태 코드는 200으로 처리한다(200)

### (대안) `netlify.toml`로 설정하는 방법

설정 파일로 관리하고 싶으면 저장소 루트에 `netlify.toml`을 두고 아래처럼 작성하면 된다.

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 결과

배포 후, 라우팅된 페이지에서 새로고침을 해도 정상적으로 페이지가 유지된다.

![동작 확인](https://cdn.jsdelivr.net/gh/spde3289/blog-assets@main/content/post/2025-10-29-netlify-spa-refresh-404/test.gif)

예전에 GitHub Pages로 배포할 때도 비슷한 문제를 겪은 적이 있다.
그때 “SPA 라우팅 + 새로고침 = 서버가 해당 경로 파일을 찾는다”는 구조를 이해해둔 덕분에 이번에는 빠르게 원인을 좁히고 해결했다.
