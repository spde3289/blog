---
title: tsx파일을 리드미파일로 바꾸기
tags: [frontEnd]
date: "2025.01.04"
---
오늘은 개발 블로그를 리뉴얼 하는 과정에서 tsx파일을 리드미파일로 변환했던 작업이 있어 이 경험을 공유하려고 합니다.

우선 저의 개발 블로그는 react기반의 프로젝트로 tsx 파일을 생성해 블로그 글을 작성하고 있었습니다.  
하지만 이 방법은 접근성이 너무 떨어지고 유지보수가 너무 힘들다는 단점이 있어 불편함을 많이 느꼈고 
이번 기회에 next로 마이그레이션하는 작업을 진행하기로 했습니다.

이번 블로그는 `.md`파일로 블로그 글을 관리하고 싶었고 이를 위해 기존에 작성했던 블로그 글을 모두 .md 파일로 변환해야 했습니다.

## 리드미파일로 변환하기
모든 블로그 글을 수작업으로 변환하기엔 너무 양이 많아 스크립트를 작성해 변환하기로 했습니다. 

변환하기 위해 필요한 작업은 다음 순서로 나열할 수 있습니다.
- 게시글 파일을 순서대로 모두 읽기
- 게시글을 파싱해 `.md`문법으로 변환하기
- 새로운 폴더를 생성해 파싱한 파일을 카테고리별로 생성

여기서 가장 중요한 부분은 `게시글을 파싱해 .md문법으로 변환하기` 작업이기 때문에  
게시글을 순서대로 폴더 구조대로 읽고 새로운 폴더를 생성해 생성하는 과정 부터 만들었습니다.

```
/post
  ├─ /backEnd
  ├─ /cs
  ├─ /css
  ├─ /etc
  ├─ /frontEnd
  ├─ /html
  ├─ /javascript
  ├─ /network
  ├─ /next
  ├─ /node
  ├─ /react
  ├─ /sever
  └─ /typescript
```

### 폴더 구조대로 파일 읽기
이런 폴더 구조로 게시글이 관리되고 있어서 해당 폴더를 읽고 해당 폴더에 하위 폴더가 있다면 재귀적으로 다시 폴더를 읽습니다. 

만약 읽은 파일이 `tsx`파일일 경우 tsx 파일일 경우 파일을 파싱하는 로직을 추가한 후 파일을 저장하는 로직을 생성해주면 됩니다.
```js
const convertAllTsxFilesToMarkdown = (tsxDir, outputDir) => {
  const files = fs.readdirSync(tsxDir);

  files.forEach((file) => {
    const filePath = path.join(tsxDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // 하위 디렉토리 처리
      convertAllTsxFilesToMarkdown(filePath, outputDir);
    } else if (path.extname(file) === ".tsx") {
      // tsx 파일일 경우 파일을 파싱하는 로직
    }
  });
};

// 실행 예시
const tsxDir = path.join(__dirname, "post"); // tsx 파일들이 있는 폴더
const outputDir = path.join(__dirname, "dist"); // 마크다운 파일을 저장할 폴더
convertAllTsxFilesToMarkdown(tsxDir, outputDir);
```

### 폴더 구조대로 파일 생성하기
**tsx 파일일 경우 파일을 파싱하는 로직**에 파일을 생성하는 함수를 추가합니다. 

`filePath(파일 경로)`와 `outputDir(파일을 생성할 위치)`을 함수 인자로 받습니다." 
그런 후 `extractContent`함수를 이용해 마크다운 문법으로 변환한 후에 
출력 폴더를 생성해 완료합니다.
```js
const convertTsxToMarkdownFile = (tsxFilePath, outputDir) => {
  const tsxContent = fs.readFileSync(tsxFilePath, "utf-8");
  if (!tsxContent) return;

  const markdownContent = extractContent(
    tsxContent,
    path.relative(__dirname, tsxFilePath)
  );

  if (!markdownContent) {
    return;
  }

  const outputFilePath = path.join(
    outputDir,
    path.relative(__dirname, tsxFilePath).replace(".tsx", ".md")
  );
  const outputFolder = path.dirname(outputFilePath);

  // 출력 폴더가 없다면 생성
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }
  console.log(outputFilePath);
  fs.writeFileSync(outputFilePath, markdownContent, "utf-8");
};
```

### 리드미파일 변환 로직
파일을 읽고 쓰는 과정은 다른 프로젝트를 진행하며 경험했기 때문에 그렇게 어렵지 않았지만 tsx문법을 마크다운 문법으로 변환하는 과정에서 저는 큰 함정에 빠지고 말았습니다.

이 작업을 시작할 때 리드미파일로 변환하기 위해선 tsx파일을 파싱해 변환해야만 한다고 생각한 나머지 `babel`을 사용하고 맙니다.  
~~이 선택만 아니였어도 하루를 버리진 않았을거 같은 생각이...~~

로직이 너무 어지러워 함수를 호출했을 때 일어나는 일에 대해서 설명하겠습니다.

- `extractContent`함수에서 tsx파일을 파싱해 jsx파일로 만들어 `ast`변수에 할당합니다. 
- `ast`변수를 순회하며 `processJSXElement`함수를 호출합니다.
- `processJSXElement`함수 에서는 `switch`를 이용해 태그에 이름에 따라  Markdown 문법으로 매핑해줍니다. 

```js
const getJSXTextFromChildren = (children) => {
  let text = "";
  children.forEach((child) => {
    if (t.isJSXText(child)) {
      text += child.value;
    } else if (
      t.isJSXExpressionContainer(child) &&
      child.expression &&
      typeof child.expression.value === "string"
    ) {
      text += child.expression.value;
    } else if (t.isJSXElement(child)) {
      text += processJSXElement(child);
    }
  });
  return text.trim();
}

const processJSXElement = (node) => {
  // 엘리먼트의 태그 이름 추출
  const tagName = node.openingElement.name.name;
  let result = "";

  // 태그 이름에 따라 Markdown으로 매핑
  switch (tagName) {
    case "PostHeader": {
      let title = "";
      let tagProp = "";
      let date = "";
      node.openingElement.attributes.forEach((attr) => {
        if (attr.name && attr.name.name === "title") {
          title = attr.value.value;
        }
        if (attr.name && attr.name.name === "tagName") {
          tagProp = attr.value.value;
        }
        if (attr.name && attr.name.name === "date") {
          date = attr.value.value;
        }
      });
      result += `---\n**title:** ${title}\n`;
      if (tagProp) result += `**Tag:** ${tagProp}\n`;
      if (date) result += `**Date:** ${date} \n---`;
      result += "\n";
      break;
    }
    case "SubTitle": {
      const text = getJSXTextFromChildren(node.children);
      result += `## ${text}\n\n`;
      break;
    }
    case "TextBox": {
      const text = getJSXTextFromChildren(node.children);
      result += `${text}\n\n`;
      break;
    }
    case "ReferenceLink": {
      let href = "";
      node.openingElement.attributes.forEach((attr) => {
        if (attr.name && attr.name.name === "href") {
          href = attr.value.value;
        }
      });
      const linkText = getJSXTextFromChildren(node.children);
      result += `[${linkText}](${href})\n\n`;
      break;
    }
    case "ImgContainer": {
      node.children.forEach((child) => {
        if (t.isJSXElement(child) && child.openingElement.name.name === "img") {
          let alt = "";
          let src = "";
          child.openingElement.attributes.forEach((attr) => {
            if (attr.name && attr.name.name === "alt") {
              alt = attr.value.value;
            }
            if (attr.name && attr.name.name === "src") {
              if (attr.value.type === "StringLiteral") {
                src = attr.value.value;
              } else {
                src = `{${attr.value.expression.name}}`;
              }
            }
          });
          result += `\![\${alt}] (\${src})\n\n`;
        }
      });
      break;
    }
    default:

      break;
  }

  // 만약 위에서 처리하지 않은 컨테이너 태그라면 자식 노드들을 재귀적으로 처리
  node.children.forEach((child) => {
    if (t.isJSXElement(child)) {
      result += processJSXElement(child);
    } else if (t.isJSXText(child)) {
      result += child.value;
    } else if (t.isJSXExpressionContainer(child)) {
      if (child.expression && child.expression.value) {
        result += child.expression.value;
      }
    }
  });
  return result;
}


const extractContent = (tsxContent, local) => {
  // TSX 내용을 파싱하여 AST 생성 (TypeScript, JSX 플러그인 활성화)
  const ast = parser.parse(tsxContent, {
    sourceType: "module",
    plugins: ["typescript", "jsx"]
  });

  let markdown = "";
  // AST를 순회하며 return문 안의 JSX 엘리먼트를 찾아 변환 수행
  traverse(ast, {
    ReturnStatement(path) {
      if (t.isJSXElement(path.node.argument)) {
        markdown = processJSXElement(path.node.argument);
      }
    }
  });

  return markdown;
};
```

이 로직을 만들어 md 파일로 변환을 성공한 후에 이렇게 하는게 맞는지에 대한 의문이 들었고 이제서야 여러 단점들이 보이기 시작했습니다.

우선 이 로직의 문제점은
1. 유지보수하기 매우 힘들다는 점 
2. 다른 용도로 활용할 수 없다는 점 
3. 파싱한 데이터를 들여다보며 작업하기 때문에 시간이 아주 많이 든다는 점
4. `babel`은 이런 용도로 사용되는 도구가 아니라는 점 이였습니다.

## 해결 방법
다시 처음으로 돌아와 문제를 해결하기 위한 방법을 생각해보니 결국 제게 필요한 행동은 성능상의 이유로 파일을 빌드하거나 호환 가능하도록 변환하는 작업이 아닌 단순하게 텍스트를 변환하는 과정이였습니다.

자바스크립트에서 텍스트를 다른 텍스트로 바꾸는 것은 어려운 작업이 아닐 뿐더러 정규식이라는 훌륭한 도구만 있으면 될거 같다는 생각이 들어 간단한 로직을 만들어 테스트 해보았습니다.

`extractContent`함수에 정규식을 활용해 `PostHeader`태그의 제목, 태그, 날짜 추출해 빌드해 보니 성공적 변환이 되는 점을 확인했습니다.
```js
const extractContent = (tsxCode, filePath) => {
  let markdownContent = `# ${path.basename(filePath, ".tsx")}\n\n`;

  const headerMatch = tsxCode.match(
    /<PostHeader\s+title=['"](.+?)['"]\s+tagName=['"](.+?)['"]\s+date=['"](.+?)['"]\s*\/?>/
  );
  if (headerMatch) {
    const [, title, tagName, date] = headerMatch;
    markdownContent += `**${title}**\n\n`;
    markdownContent += `- 태그: ${tagName}\n`;
    markdownContent += `- 날짜: ${date}\n\n`;
  }

  return markdownContent;
};
```

```md
# React-Fragment

**Fragment를 알아보자**

- 태그: React
- 날짜: 2022.01.02
```

## 마치며
단순하게 `tsx` 파일을 `.md`으로 변환하는 것이 아니라 **내가 추출 해야하는 데이터**를 먼저 분석하고 이를 위해 **어떤 방법을 사용할지 결정하는 과정**이 중요하단 생각이 들었습니다.

### 오늘의 한마디  
**너무 생각을 복잡하게 하다 주화입마에 걸리지 말자!**