# Historic Truth Tweet Bot (역사속 오늘은?)

You must have a Twitter developer account in order to run this bot.
and make file(.env) or set environmental variable with following data:
|  key	| value	|
|---	|---	|
|   consumer_key	|   string	|
|   access_token_key	|   string	|
|   access_token_key	|   string	|
|   access_token_secret	|   string	|

## prepare
```
npm install
```
## run
```
npm run run
```

data source: 우리역사넷 (http://contents.history.go.kr/front/th/list.do)

ramdomly get 3 truthes by date, and display like following:
```
3월 19일 역사속 오늘은... (3 / 3)
1727년: [음]왕세자(효장 세자)가 성균관에 입학함
출처: 조선왕조실록
```

## 한국어
봇을 구동하기 위해서는 트위터 개발자 계정이 있어야 합니다.
개발자 계정을 생성한 뒤에 .env파일 혹은 환경변수를 위와 같이 설정해주세요.

자료 출처는 우리역사넷 (http://contents.history.go.kr/front/th/list.do)입니다.
봇으르 구동할 때 마다 HTTP로 받아옵니다.
받아온 자료를 랜덤으로 3개씩 위와같이 출력합니다.

### 설치
```
npm install
```

### 실행
```
npm run run
```