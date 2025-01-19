---
title: 데이터 시각화 차트 라이브러리 사용하기
tags: [FroentEnd]
date: "2024.05.25"
---
라이브 채팅을 배포한 후 이를 관리하기 위한 백오피스를 만들고 있는중 운영중인 다양한 서비스의 시각화 데이터를 얻고 싶어 차트 라이브러리에 대해 알아보았습니다. 대표적인 차트 라이브러리로는 Chart.js, D3.js, Recharts등이 있지만 전 React와 호환성이 좋은 Recharts라이브러리를 사용하기로 했습니다.

## Recharts 

Recharts는 복잡한 설정 없이 React 컴포넌트로서 쉽게 차트를 만들 수 있고 React의 상태 관리와 잘 알맞는 다는 장점이 있습니다. 또한 공식 문서의 친절한 가이드와 예제코드를 보며 동작 시켜볼 수 있습니다.

## Recharts 설치 및 사용법 

 npm이나 yarn을 이용해 설치해줍니다.

```javascript
npm install recharts

yarn add recharts

```
Recharts는 Examples에서 다양한 차트를 선택해 예제 코드를 수정하며 사용해볼 수 있습니다.

![백엔드 이미지](/img/frontEnd/ReChartNPM/rechartsExamples.png)
아래의 코드는 SimpleLineChart를 임의로 커스텀한 코드입니다. Line 컴포넌트를 이용해 별도의 선을 추가했고 CartesianGrid 컴포넌트를 제거해 배경에 보이는 표시선을 제거 했습니다. 컴포넌트가 아주 직관적이여서 학습하는데 어렵지 않고 API가이드를 보면 컴포넌트의 여러 속성이 친절하게 설명되어 있습니다.

```javascript
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '1일차',
    "경기도": 4000,
    "강원도": 2400,
    "충청도": 1700,
  },
  {
    name: '2일차',
    "경기도": 3000,
    "강원도": 1398,
    "충청도": 2210,
  },
  {
    name: '3일차',
    "경기도": 3000,
    "강원도": 498,
    "충청도": 2210,
  },
  {
    name: '4일차',
    "경기도": 300,
    "강원도": 1398,
    "충청도": 2310,
  },
];

const Example = () => {

    return (
      <ResponsiveContainer "100%" height="100%">
        <LineChart
          width={200}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="경기도" stroke="#82ca9d" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="강원도" stroke="#8884d8"  />
          <Line type="monotone" dataKey="충청도" stroke="#454545"  />
        </LineChart>
      </ResponsiveContainer>
    );
  
}

export default Example

```
![백엔드 이미지](/img/frontEnd/ReChartNPM/simpleLineChart.png)
아래의 사진처럼 차트위에 마우스를 호버했을때 보여지는 툴팁이나 다른 스타일도 사용자가 원하는대로 커스텀 할 수 있고 API가이드를 보면 아주 친철하게 설명되어 있어 커스텀을 하는데 있어 어려움이 적었습니다.

![백엔드 이미지](/img/frontEnd/ReChartNPM/simpleTooltipContent.png)
![백엔드 이미지](/img/frontEnd/ReChartNPM/tooltipAPI.png)
 

![백엔드 이미지](/img/frontEnd/ReChartNPM/barchart.png)