---
title: 정규화로 데이터 결합도 낮추기
series: maple-helper
tags: ["localStorage", "schema"]
date: "2025.12.10"
---

주보캐(배럭 캐릭터) 정보를 로컬스토리지에 저장해두고, 사용자가 매번 값을 다시 입력하지 않아도 자동으로 API 요청을 보내는 구조로 운영하고 있다.

문제는 보스 가격 같은 **보스 메타 데이터가 바뀌었을 때**다. 서버/정적 데이터는 최신인데, 로컬스토리지가 예전 값을 들고 있으면 사용자는 계속 과거의 가격을 보게 된다.

## 문제 : 높은 결합도의 데이터

### 기존 로컬스토리지 구조(요약)

- 캐릭터 정보
  - 캐릭터 id
  - 닉네임
  - 월드
  - 레벨
  - 스텟
- 보스 정보
  - 보스 이름
  - 파티원 수
  - 보스 난이도
    - 난이도
    - 클리어 가격
    - 클리어 여부
- 주보캐
  - 캐릭터 정보 + 보스 정보

```ts
// 로컬스토리지에 저장되는 데이터 예시
{
  "characterId": "CHAR_001",
  "bosses": [
    {
      "name": "루시드",
      "difficulty": "하드",
      "price": 66200000,
      "isCleared": true
    }
  ]
}
```

### 이 구조가 만든 문제

* 가격이 변경되었을 때 로컬스토리지 데이터도 최신 데이터로 변경하는 로직이 필요해진다.
  * 가격은 “상태”가 아니라 “보스 데이터”이다.
* 보스 가격/난이도 정보가 캐릭터마다 중복 저장된다.
  * 주보캐가 늘어날수록 같은 보스 메타가 N번 복제된다.

## 데이터 정규화로 결합도 낮추기

정규화를 목표로 개선 작업을 진행했다.

* 보스 가격이 바뀌면 **로컬스토리지를 안 건드려도** 계산 결과가 최신이어야 한다.
* 로컬스토리지에는 **식별자 + 사용자가 만든 상태**만 남겨야 한다.

### 보스 데이터 구조

```ts
// BOSSES는 보스 상수 데이터
export type BossId = (typeof BOSSES)[number]['bossId']

type BossDifficultyType = 
  | '이지'
  | '노멀'
  | '하드'
  | '카오스'
  | '익스트림'

export interface BossMaster {
  bossId: BossId;
  bossName: string;
  difficulties: { difficulty: BossDifficultyType; price: number }[];
}

export type BossMasters = BossMaster[];
```

### 로컬스토리지(주보캐) 구조: 식별자 + 상태만 저장

`price`, `bossName` 같은 “보스 메타”는 빼고 **bossId / 난이도 / 파티 인원 / 클리어 상태**만 저장한다.

```ts
export interface ClearedBossState {
  bossId: BossId;
  difficulty: BossDifficultyType | null;
  partySize: number;
}

export interface JuboCharacter {
  characterName: string;
  characterInfo: CharacterFullInfo;
  bosses: ClearedBossState[];
}

export type JuboCharacters = JuboCharacter[];
```

### 새 로컬스토리지 예시

```ts
{
  "characterName": "지훈",
  "characterInfo": "{캐릭터 정보 데이터}"
  "bosses": [
    {
      "bossId": "lucid",
      "difficulty": "hard",
      "partySize": 6,
    }
  ]
}
```

* 로컬스토리지의 `bossId/difficulty/partySize`를 읽고
* 최신 `BossMasters`에서 가격을 찾아 합쳐서 보여준다.

## 정리

기존 구조는 **보스 가격(도메인 데이터)**을 로컬스토리지에 함께 저장해서 보스 가격이 변동되었을 떄 최신 데이터로 갱신해주는 로직이 필요했다.

로컬스토리지에는 bossId / difficulty / partySize처럼 유저가 만든 상태만 저장하고, 가격/이름 같은 보스 메타는 BossMasters(상수/서버 데이터)에서 가져오도록 정규화했다.

그 결과 보스 가격이 변동돼도 로컬스토리지를 갱신하는 추가 로직 없이 최신 가격을 기준으로 계산/표시할 수 있고, 캐릭터마다 중복 저장되던 보스 메타도 줄었다.