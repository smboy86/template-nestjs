import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const testInsert = await prisma.appInfo.upsert({
    where: { AppName: 'template-nestjs app' },
    update: {},
    create: {
      AppName: 'template-nestjs app',
      text: '재미난 앱을 만들어 보입시다 ~',
    },
  });

  console.log({ testInsert });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
