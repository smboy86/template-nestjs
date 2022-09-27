# prisma

## 설치

### 소스 복사

$ git clone git@github.com:smboy86/template-nestjs.git
$ cd template-nestjs
$ npm i

### 환경설정

.env 파일 생성
example)
PORT="3003"

DATABASE_URL="...."

SWAGGER_USER="admin"
SWAGGER_PASSWORD="admin1004"

JWT_ACCESS_SECRET="secret_JWT_ACCESS_SECRET_JWT_ACCESS_SECRET_jwt"
JWT_EXPIRES="30s"

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
