---
title: Next 이미지 최적화
tags: [next]
date: "2024.03.23"
---
Next를 이용해 팀프로젝트를 진행하던 중 Next에서는 img태그 대신 Next에서 제공하는 Image컴포넌트를 사용하는걸 알게 되었다. Image컴포넌트가 제공하는 기능과 장점에 대해 알아보려한다.

## Next/Image 컴포넌트의 기능 

Image 컴포넌트가 제공하는 기능은 다음과 같다.

- 이미지 크기 최적화와 최신 이미지 포맷 지원
- CLS방지
- 이미지 블러 기능
- 이미지 리사이징
[https://nextjs.org/docs/app/building-your-application/optimizing/images](https://nextjs.org/docs/app/building-your-application/optimizing/images) 

이미지가 매우 많은 사이트에서 렌더링 초기에 모든 이미지를 다운받게 된다면. 렌더링이 매우 느려질 것 이다. 이때 딱 필요한 부분의 이미지만 렌더링 할 수 있다면. 적은 데이터만을 사용해 빠르게 화면을 렌더링 할 수 있는데 Next에선 이 기능을 제공해준다. img태그에서 loading="lazy" 속성 값을 추가하면 되는데 next의 Imgae 컴포넌트를 사용하면 자동으로 적용된다.

Next에선 로컬 이미지의 경우 import한 이미지 파일을 기준으로 자동으로 width와 height가 지정되고 자동으로 blur 효과가 제공된다.

하지만 원격 이미지일 경우 Next가 빌드 중에 파일에 접근 할 수 없으므로 width와 height를 지정해 주어야 하고 blurDataURL을 제공해 주어야 한다. blurDataUrl은 base64로 인코딩된 이미지여야 한다.

placeholder= "blur"기능을 사용하면 이미지가 로드되기 전에 이미지의 높이만큼 영역을 표시해 이미지가 로드된 후 레이아웃이 변경되는 부분을 방지 할 수 있어 CLS를 많이 개선할 수 있다.

또 next에선 이미지 캐싱 기능을 지원한다. 아래 CF-Cache-Status헤더가 MISS라면 캐시되어 있지 않은 상태이고 HIT상태라면 캐시되어 있는 상태라고 볼 수 있다.

![백엔드 이미지](/img/next/ImageTag/img2.png)
![백엔드 이미지](/img/next/ImageTag/img3.png)
![백엔드 이미지](/img/next/ImageTag/img1.png)
![백엔드 이미지](/img/next/ImageTag/img4.png)
위의 사진과 같이 이미지가 캐시된 후에는 더 빠르게 응답한걸 볼 수 있다. 하지만 모든 이미지를 캐싱하는건 아닌데 최적화가 필요 없는 SVG와 같은 vector이미지나 GIF같이 복잡한 애니메이션 이미지의 경우는 최적화가 진행되지 않는다.

jpg, png, webp, avif등등 여러 이미지 형식들이 있다. 폰트와 마찬가지로 형식에 따라 이미지의 용량이 달라지는데 webp와 avif의 경우 이미지 압축을 통해 다른 형식들에 비해 적은 용량을 가진다 특히 avif의 경우 동일한 품질 대비 최대 10배나 적은 용량을 가진다고 알려졌다. Next에선 이미지를 webp나 avif으로 변환 시켜줘 보다 빠르게 이미지를 로드 할 수 있다.

[https://nextjs.org/docs/pages/api-reference/components/image](https://nextjs.org/docs/pages/api-reference/components/image) 

## 마치며 

Next에서는 여러 최적화를 자체적으로 지원하고 있어서 사용하기 편리하다는 점이 장점인 것 같다. 실제 서비스에 적용시킨 다면 아주 큰 효과를 볼 수 있을 것 같다.
