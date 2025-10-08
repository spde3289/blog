---
title: JavaScript의 reducer와 sort 직접 구현하며 배운 것들
tags: [javaScript]
date: "2024.11.09"
---
최근 캐릭터 리스트 정렬 기능과 결정석 판매 금액을 구현하며 
Array.prototype.reduce()와 Array.prototype.sort()를 활용했던  
경험을 바탕으로 
이 메서드들의 작동 원리를 깊이 이해하기 위해 직접 구현해보았습니다. 

## reduce() 직접 구현하기
`reduce()` 함수의 특징으로는 다음이 있습니다.
- 초기값이 제공되지 않으면 첫 번째 요소를 초기 값으로 사용합니다.
- 콜백 함수는 누적값(accumulator), 현재값(currentValue), 인덱스(index), 원본 배열(array)을 
인자로 받고 있습니다.
- 원본 배열을 변형하지 않습니다.

```js
function myReduce(arr, callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : arr[0]; // 초기 값이 없을 시 배열의 첫번째 요소 사용
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  
  return accumulator;
}

// 사용 예시
const sum = myReduce([1, 2, 3], (acc, cur) => acc + cur, 0);
console.log(sum); // 6
```

### 결정석 계산 로직
```ts
const addPrice = (numbers: number[]): number => {
  return numbers.reduce((sum, current) => sum + current, 0)
}
```

## sort() 직접 구현하기
`sort()` 함수의 특징으로는 다음이 있습니다.
- 비교 함수가 제공되지 않으면 유니코드 순으로 정렬합니다.
- 비교 함수 반환 값이 음수면 a를 b 앞으로, 양수면 뒤로, 0이면 순서를 유지합니다.
- 원본 배열을 직접 변형하는 특징이 있습니다.
```js
 function mySort(arr, compareFn) { 
  // arr 매개 변수를 사용해 원본 배열을 변형
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const comparison = compareFn 
        ? compareFn(arr[j], arr[j + 1])
        : String(arr[j]) > String(arr[j + 1]) ? 1 : -1; // 비교 함수가 없을 때 문자열로 변환 후 정렬
      
      if (comparison > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 사용 예시
const characters = [{level: 45}, {level: 23}, {level: 78}];
const sorted = mySort(characters, (a, b) => a.level - b.level);
console.log(sorted); // 레벨 오름차순 정렬
```

### 캐릭터 정렬 로직
```ts
arr.sort((a, b) => {
  if (a.character_level === b.character_level) {
    return b.final_stat[42].stat_value - a.final_stat[42].stat_value // 전투력 내림차순 정렬
  }
  return b.character_level - a.character_level // 동일 전투력시 레벨  내림차순 정렬
}),
```

## 마치며
사용하던 메서드를 직접 구현하며 `reduce`와 `sort`이외에도 `map`, `forEach`같은 메서드의 공식 문서를 보며 명확한 기능과 사용 방법을 알게 되었고 이런 경험을 통해 단순한 기능 구현뿐 아니라 언어 자체에 대한 이해가 중요하다는 점을 다시 한번 알게 되었습니다.