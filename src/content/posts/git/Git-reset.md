---
title: Git Reset 정리 soft, mixed, hard
tags: [git]
date: "2025.09.12"
---
Git을 공부하다 보면 커밋을 취소하거나 되돌려야 하는 상황이 자주 생긴다. 이때 자주 쓰이는 명령어가 `git reset`이다. 
그런데 reset은 옵션에 따라 동작이 달라지기 때문에 헷갈리기 쉽다. 그래서 이번에 한 번 정리해 보았다.

## soft 옵션

- **동작**: 커밋만 취소하고 변경 사항은 그대로 유지된다.
- **Staging Area**: 그대로 남아 있음
- **Working Tree**: 그대로 남아 있음

즉, 방금 한 커밋을 취소하고 수정한 내역을 그대로 둔 채 다시 커밋할 수 있다.

보통 이전 커밋에 내용을 합쳐서 다시 커밋하고 싶을 때 사용한다.



## mixed 옵션

- **동작**: 커밋과 Staging Area는 초기화된다.
- **Staging Area**: 초기화됨
- **Working Tree**: 그대로 남아 있음

즉, 커밋은 취소되지만 수정된 파일 자체는 남아 있기 때문에 다시 고쳐서 커밋할 수 있다.

별도의 옵션을 주지 않고 `git reset`만 입력했을 때 기본적으로 mixed 모드로 동작한다.



## hard 옵션

- **동작**: 커밋, Staging Area, Working Tree 모두 초기화된다.
- **Staging Area**: 초기화됨
- **Working Tree**: 초기화됨

즉, 해당 시점 이후의 변경 내역이 모두 사라진다. 되돌릴 수 없기 때문에 신중히 사용해야 한다.



## reflog로 복구하기

만약 실수로 hard reset을 해서 모든 변경 사항이 사라졌다면 `git reflog`로 복구할 수 있다.

`reflog`는 HEAD의 이동 기록을 보여주기 때문에 reset 이전 상태의 커밋을 찾아 다시 체크아웃하거나 되돌릴 수 있다.



## 정리

- **soft** → 커밋만 취소 (Staging, Working Tree는 유지)
- **mixed** → 커밋 + Staging 취소 (Working Tree는 유지)
- **hard** → 커밋 + Staging + Working Tree 모두 취소



이번 정리를 통해 `git reset`이 머릿속에서 조금 더 명확해졌다. 앞으로는 상황에 맞는 옵션을 신중하게 선택해서 사용해야겠다.