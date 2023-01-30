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

# 템플릿 기능 소개

### 기능 리스트

1. nestjs 프레임웤 기반 템플릿 뼈대구성
2. JWT 인증 (bcryptjs, passport, guard)
3. 스웨거
4. 미들웨어 - 로거 (윈스턴)
5. 프리즈마 DB 클라이언트 구성
6. .dotenv 구성
7. DTO 기반 req, res 양식 구축

### API 목록

1. 서버 기본 정보 확인(public)
2. 회원 가입
3. 로그인
4. 로그아웃
5. 회원정보 확인 (private)
