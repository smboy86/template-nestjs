import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // #) 시드 생성시 중복 에러를 피하기 위해 upsert 커맨드 이용
  // 1) create appInfo data
  const insertAppInfo = await prisma.appInfo.upsert({
    where: { appName: 'template-nestjs app' },
    update: {
      regDt: new Date(),
      modDt: new Date(),
    },
    create: {
      appName: 'template-nestjs app',
      text: '재미난 앱을 만들어 보입시다 ~',
    },
  });
  console.log('insert AppInfo', insertAppInfo);

  // 2) create temp user
  const insertUser = await prisma.user.upsert({
    where: { email: 'test-a@email.com' },
    update: {
      regDt: new Date(),
      modDt: new Date(),
    },
    create: {
      email: 'test-a@email.com',
      password: 'qwe123',
      name: 'seed-user',
    },
  });
  console.log('insert User', insertUser);
}

// execute the main function
main()
  .catch((e) => {
    console.error('seed errrr  ::: ', e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
