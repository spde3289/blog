---
title: display Grid를 배워보자
tags: [css]
date: "2023.02.11"
---
gird는 행과 열이 있는 레이아웃 시스템을 제공한다. 1차원 레이아웃을 지원하는 flex와 다르게 좀 더 복잡한 레이아웃을 위해 grid를 사용할 수 있다.

## Grid Properties 

gird는 flex와 같이 Container와 Item이라는 두가지 개념으로 구분되어 있는데 Container는 Item을 감싸는 부모 요소이며 그 안에 Item을 배치 할 수 있다.

## Grid Container Properties 

Container를 위한 속성은 아래와 같다.

| 속성 | 의미 | 예시 |
| --- | --- | --- |
| display | 그리드 컨테이너(Container)를 정의 | display : grid |
| grid-template-rows | 명시적 행(Track)의 크기를 정의 | grid-template-rows: 20px 20px ... grid-template-rows: repeat(3, 20px) |
| grid-template-columns | 명시적 열(Track)의 크기를 정의 | grid-template-rows: 20px 20px ... grid-template-rows: repeat(3, 20px) |
| grid-template-areas | 영역(Area) 이름을 참조해 템플릿 생성 | grid-template: grid-template-rows / grid-template-columns grid-template: grid-template-areas  grid-template-areas: "header header header" "main main aside" "footer footer footer" |
| grid-template | grid-template-rows, columns, areas의 단축 속성 | grid-template: "header header header" 80px "main main aside" 350px "footer footer footer" 130px / 2fr 100px 1fr; |
| row-gap(grid-row-gap) | 행과 행 사이의 간격(Line)을 정의 | row-gap: 100px (크기) |
| column-gap(grid-column-gap) | 열과 열 사이의 간격(Line)을 정의 | column-gap: 100px (크기) |
| gap(grid-gap) | 행과 행, 열과 열 사이의 간격을 정의 | gap: grid-row-gap grid-column-gap |
| grid-auto-rows | 암시적인 행(Track)의 크기를 정의 | grid-auto-rows: 100px |
| grid-auto-columns | 암시적인 열(Track)의 크기를 정의 | grid-auto-columns: 100px |
| grid-auto-flow | 자동 배치 알고리즘 방식을 정의 | grid-auto-flow: row  또는  row dense  또는  dense grid-auto-flow: column  또는  column dense |
| grid | grid-template-xxx과 grid-auto-xxx의 단축 속성 | grid: grid-template grid: grid-template-rows / grid-auto-flow grid-auto-columns  grid: grid-auto-flow grid-auto-rows / grid-template-columns |
| align-content | 그리드 콘텐츠(Grid Contents)를 수직(열 축) 정렬 | align-content: align-content |
| justify-content | 그리드 콘텐츠를 수평(행 축) 정렬 | justify-content: justify-content |
| place-content | align-content와 justify-content의 단축 속성 | place-content: align-content justify-content |
| align-items | 그리드 아이템(Items)들을 수직(열 축) 정렬 | align-items: align-items |
| justify-items | 그리드 아이템들을 수평(행 축) 정렬 | justify-items: justify-items |
| place-items | align-items와 justify-items의 단축 속성 | place-items: align-items justify-items |
## Grid Item Properties 

Item을 위한 속성들은 아래와 같다.

| 속성 | 의미 | 예시 |
| --- | --- | --- |
| grid-row-start | 그리드 아이템의 행 시작 위치 지정 | grid-row-start: 1 |
| grid-row-end | 그리드 아이템의 행 끝 위치 지정 | grid-row-end: 3 |
| grid-column-start | 그리드 아이템의 열 시작 위치 지정 | grid-column-start: 2 |
| grid-column-end | 그리드 아이템의 열 끝 위치 지정 | grid-column-end: 3 |
| grid-row | grid-row-xxx의 단축 속성(행 시작/끝 위치) | grid-row: grid-row-start / grid-row-end |
| grid-column | grid-column-xxx의 단축 속성(열 시작/끝 위치) | grid-column: grid-column-start / grid-column-end |
| grid-area | 영역(Area) 이름을 설정하거나, grid-row와 grid-column의 단축 속성 | grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end |
| align-self | 단일 그리드 아이템을 수직(열 축) 정렬 | .item:nth-child(1)  .item:nth-child(2)  .item:nth-child(3)  .item:nth-child(4)  |
| justify-self | 단일 그리드 아이템을 수평(행 축) 정렬 | .item:nth-child(1)  .item:nth-child(2)  .item:nth-child(3)  .item:nth-child(4)  |
| place-self | align-self와 justify-self의 단축 속성 | place-self: align-self justify-self |
| order | 그리드 아이템의 배치 순서를 지정 | .item:nth-child(1)  .item:nth-child(3)  .item:nth-child(5)  |
| z-index | 그리드 아이템의 쌓이는 순서를 지정 | .item:nth-child(2)  grid-area: 1 / 2 / 3 / 3; z-index: 1;   |
[https://www.w3schools.com/css/css_grid.asp](https://www.w3schools.com/css/css_grid.asp) 

[https://studiomeal.com/archives/533](https://studiomeal.com/archives/533) 

[https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout) 
