---
title: Flexbox 정리 `align-items` vs `align-content`
tags: [css]
date: "2025.09.09"
---
오늘 팀 미팅 시간에 align-items와 align-content의 차이에 대한 이야기가 나와서, 헷갈리지 않도록 따로 정리해 보았다.

## align-items

- 대상: 한 줄(line) 안의 아이템들

- 역할: 교차축(cross-axis, 보통 세로 방향)에서 아이템을 어떻게 정렬할지 결정

- 특징: 줄의 개수와 상관없이 아이템 개별 위치를 맞추는 속성

.container {
  display: flex;
  align-items: center; /* 모든 아이템을 세로 중앙에 정렬 */
}

한 줄 안에서 아이템들을 세로로 어떻게 배치할지 정하는 속성이다.

## align-content

- 대상: 여러 줄(line)

- 역할: 교차축에서 줄과 줄 사이 간격을 어떻게 분배할지 결정

- 전제 조건: 반드시 flex-wrap: wrap이 적용되어 있어야 함

- 특징: 한 줄만 있으면 효과가 없다

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between; /* 여러 줄을 위아래로 균등하게 분배 */
}
```

줄 자체를 어떻게 배치할지 정하는 속성이다.

## 정리
| 속성 | 적용 대상 | 전제 조건 | 하는 일 |
| --- | --- | --- | --- |
| `align-items` | 한 줄 안의 **아이템** | 줄 수와 무관 | 아이템 개별 정렬 |
| `align-content` | 여러 줄(line) 전체 | `flex-wrap` 필요 | 줄과 줄 사이 간격 조정 |

## 마치며
그동안 두 속성의 차이를 명확히 모르고 막연하게 사용했던 걸 다시 돌아보게 되었다. 앞으로는 상황에 맞게 align-items와 align-content를 구분해서 더 정확히 사용할 수 있을 것 같다.