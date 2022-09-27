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

JWT_SECRET="secret_jwt_secret_jwt_secret_jwt"
JWT_EXPIRES="30s"

### scheme 정보 수정 후

```
$ npx prisma migrate dev
>> 변경 내역 확인하고 y
```

## 서버 실행

$ npm run start:dev
접속 http://localhost:3003
