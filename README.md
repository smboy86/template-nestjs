# prisma

## 설치

### 소스 복사

$ git clone git@github.com:smboy86/template-nestjs.git
$ cd template-nestjs
$ npm i

### 환경설정

.env.example 파일 수정

1. .env 으로 파일명 변경
2. 파일 내부 정보 알맞게 수정 (앱 이름, DATABASE_URL 등등...)
3. sqlite 일시 설정 수정 후 아래 명령어 실행
   $ prisma migrate dev --name init
4. 만약 시드데이터가 안 만들어졋다면 수동으로 실행
   $ npx prisma db seed (seed.ts 파일의 데이터를 미리 넣어줌)

## 개발 방법

### 1) 서버 실행

$ npm run start:dev

접속 http://localhost:3003

### 2) 프리즈마 스튜디오 실행 (db 간편 조작 및 조회)

$ npx prisma studio

접속 hottp://localhost:5555

### 3) scheme 정보 수정 후

```
$ npx prisma migrate dev
>> 변경 내역 확인하고 y
```

### 4) 배포방법

github action에 자동 CD 등록 push 하게 되면 자동으로 ssh 접속하여 빌드 커맨드 작동

# 템플릿 기능 소개

### 기능 리스트

1. nestjs 프레임웤 기반 템플릿 뼈대구성
2. JWT 인증 (bcryptjs, passport, guard)
3. 스웨거
4. 미들웨어 - 로거 (윈스턴)
5. 프리즈마 DB 클라이언트 구성
6. .dotenv 구성
7. DTO 기반 req, res 양식 구축
8. vscode extension인 Thunder client를 통해 편리한 api 테스트

### API 목록

1. 서버 기본 정보 확인(public)
2. DB 안에 서버 정보 확인 (private)
3. 회원 가입
4. 로그인
5. 로그아웃
6. 회원정보 확인 (private)

### 테스트 시나리오

1. 서버 구동 후 seed.ts 데이터 확인 후 [1] api 전송 확인
2. [1-2] 혹은 [5] private api 호출 후 결과 확인 (403)
3. 회원 가입
4. 로그인
5. [1-2] 혹은 [5] private api 호출 후 결과 재 확인 (정상작동) (api auth, bearer에 엑세스 토큰 입력)
6. 로그아웃
7. [1-2] 혹은 [5] private api 호출 후 결과 재 확인 (정상작동 jwt 토큰은 살아 있다. beacause 15분 유효기간 설정)
8. .env 에서 15m 을 10s로 수정 후 서버 재기동, jwt 토큰 만료되는 지 확인
9. 로그인
10. [1-2] 혹은 [5] private api 호출 후 결과 재 확인 (10초 후 테스트 했을때 403 만료 )
11. 스웨거 문서 확인
