---
title: HTTP 응답 코드 종류
tags: [CS]
date: "2024.06.01"
---
라이브 쳇 개발을 하며 HTTP 응답과 HTTP 응답 코드에 대해 궁금해져 이 글을 작성합니다.

HTTP 응답 코드는 HTTP 요청이 성공적으로 완료되었는지 알려주는 코드입니다. 이 응답은 5그룹으로 나누어져있고 숫자로 그 상태를 나타냅니다.

## HTTP 응답 코드의 종류 

1xx: Informational (정보 응답) 
    - 클라이언트의 요청을 서버가 수신했으며, 추가 작업을 기다리라는 정보를 제공. - 이 응답 코드는 클라이언트와 서버 간 통신 상태를 유지하는 데 사용됩니다.

2xx: Success (성공) 
    - 요청이 성공적으로 수신, 이해, 처리되었음을 나타냅니다.

3xx: Redirection (리다이렉션) 
    - 클라이언트가 요청을 완료하려면 리소스가 다른 위치로 이동했거나 추가 작업(예: 리다이렉션)이 필요합니다.

4xx: Client Error (클라이언트 오류) 
    - 클라이언트의 잘못된 요청(예: 문법 오류, 인증 실패 등)으로 인해 서버가 요청을 처리할 수 없습니다. - 문제는 클라이언트 쪽에 있으며, 요청을 수정해야 합니다.

5xx: Server Error (서버 오류) 
    - 요청은 유효하지만 서버에서 처리하는 중 문제가 발생했습니다. - 문제는 서버 쪽에 있으며, 클라이언트가 요청을 변경해도 해결되지 않습니다.

### 1xx: Informational 

| 상태 코드 | 상태 메세지 | 설명 |
| --- | --- | --- |
| 100 | Continue | 서버가 데이터를 받아드릴 준비가 되어 있는지 확인하기 위해 사용됩니다. |
| 101 | Switching Protocols | 클라이언트 요청에 따라 서버가 프로토콜을 전환했음을 나타냅니다. |
| 102 | Processing | 서버가 요청을 수신했지만, 처리가 완료되지 않았음. |
| 103 | Early Hints | 웹 페이지의 리소스를 미리 로드할 수 있도록 브라우저에 보내는 힌트 입니다. |

### 2xx: Success 

| 상태 코드 | 상태 메세지 | 설명 |
| --- | --- | --- |
| 200 | OK | 클라이언트의 요청이 성공적으로 처리되었음을 나타냅니다. |
| 201 | Created | 클라이언트의 요청에 의해 새로운 리소스가 성공적으로 생성되었습니다. |
| 202 | Accepted | 클라이언트의 요청이 접수되었으나 아직 서버에서 처리를 완료하지 못했다는 의미 입니다. |
| 203 | Non-Authoritative Information | 요청이 성공적으로 처리되었지만 정보가 중간 캐시나 다른 출처에서 온 정보입니다. |
| 204 | No Content | 요청이 성공적으로 처리되었지만 응답 본문이 없습니다. 보통 리소스를 삭제한 후 응답으로 사용됩니다. |
| 205 | Reset Content | 새로 고침하라는 의미 입니다. |
| 206 | Partial Content | 큰 파일이나 미디어를 부분적 다운로드할 때 사용되는 코드입니다. |
| 207 | Multi-Status | WebDAV에서 사용되며 여러 리소스에 대한 상태 코드를 한 번에 응답할 때 사용됩니다. |
| 208 | Already Reported | WebDAV에서 사용되며 같은 리소스를 여러 번 보고하는 것을 방지하기 위해 사용됩니다. |
| 218 | This is Fine | Apache 웹 서버에서 사용되는 비공식적인 상태 코드입니다. 오류가 발생했지만 서버에서는 문제 없이 처리되었음을 나타냅니다. |
| 226 | IM Used | HTTP Delta Encoding 기법을 사용해 수정된 부분만 보내는 방식입니다 |
### 3xx: Redirection 

| 상태 코드 | 상태 메세지 | 설명 |
| --- | --- | --- |
| 301 | Moved Permanently | 요청한 리소스가 영구적으로 다른 위치로 이동되었음 |
| 302 | Found | 요청한 리소스가 임시로 다른 위치로 이동되었음 |
| 303 | See Other | 요청한 리소스를 다른 위치에서 확인할 수 있음 |
| 304 | Not Modified | 리소스가 변경되지 않았으며 캐시된 데이터를 사용하면 됩니다. |
| 307 | Temporary Redirect | 임시 리디렉션으로 클라이언트는 원래 URL로 돌아와야 합니다. HTTP 메서드는 유지됩니다. |
| 308 | Permanent Redirect | 영구 리디렉션으로 클라이언트는 새로운 URL을 사용해야 하며, HTTP 메서드는 유지됩니다. |
### 4xx: Client Error 

| 상태 코드 | 상태 메세지 | 설명 |
| --- | --- | --- |
| 400 | Bad Request | 클라이언트의 요청이 잘못되어 서버가 처리할 수 없음 |
| 401 | Unauthorized | 인증이 필요하며, 인증이 없거나 실패한 경우 |
| 403 | Forbidden | 클라이언트는 요청을 했지만, 서버가 이를 거부함 |
| 404 | Not Found | 요청한 리소스를 서버에서 찾을 수 없음 |
| 405 | Method Not Allowed | 요청된 HTTP 메서드가 리소스에서 허용되지 않음 |
| 408 | Request Timeout | 클라이언트의 요청이 시간 내에 완료되지 않았음 |
| 409 | Conflict | 요청이 서버의 현재 상태와 충돌함 |
| 410 | Gone | 요청한 리소스가 더 이상 존재하지 않음 |
| 411 | Length Required | `Content-Length` 헤더가 필요하지만 요청에 포함되지 않음 |
| 413 | Payload Too Large | 요청이 너무 커서 서버가 처리할 수 없음 |
### 5xx: Server Error 

| 상태 코드 | 상태 메세지 | 설명 |
| --- | --- | --- |
| 500 | Internal Server Error | 서버 내부에서 예상치 못한 오류가 발생하여 요청을 처리할 수 없음 |
| 501 | Not Implemented | 서버가 요청된 기능을 지원하지 않음 |
| 502 | Bad Gateway | 서버가 게이트웨이 또는 프록시로서 잘못된 응답을 받음 |
| 503 | Service Unavailable | 서버가 일시적으로 과부하나 유지보수로 인해 서비스를 제공할 수 없음 |
| 504 | Gateway Timeout | 게이트웨이 또는 프록시 서버가 시간 내에 응답을 받지 못함 |
| 505 | HTTP Version Not Supported | 서버가 요청된 HTTP 버전을 지원하지 않음 |