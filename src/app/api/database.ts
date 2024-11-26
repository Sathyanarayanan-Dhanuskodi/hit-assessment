import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// async function dataSeed() {
//   await Promise.all([
//     prisma.module.upsert({
//       create: { name: 'Employees' },
//       update: {},
//       where: {
//         name: 'Employees'
//       }
//     }),
//     prisma.module.upsert({
//       create: { name: 'Finance management' },
//       update: {},
//       where: { name: 'Finance management' }
//     }),
//     prisma.module.upsert({
//       create: { name: 'Access management' },
//       update: {},
//       where: { name: 'Access management' }
//     })
//   ]);

//   await Promise.all([
//     prisma.permission.upsert({
//       create: { name: 'Read' },
//       update: {},
//       where: { name: 'Read' }
//     }),
//     prisma.permission.upsert({
//       create: { name: 'Write' },
//       update: {},
//       where: { name: 'Write' }
//     }),
//     prisma.permission.upsert({
//       create: { name: 'Update' },
//       update: {},
//       where: { name: 'Update' }
//     }),
//     prisma.permission.upsert({
//       create: { name: 'Delete' },
//       update: {},
//       where: { name: 'Delete' }
//     })
//   ]);

//   await Promise.all([
//     prisma.role.upsert({
//       create: { name: 'Admin', code: 'ADM' },
//       update: {},
//       where: { code: 'ADM' }
//     }),
//     prisma.role.upsert({
//       create: { name: 'HR Manager', code: 'HRM' },
//       update: {},
//       where: { code: 'HRM' }
//     }),
//     prisma.role.upsert({
//       create: { name: 'HR', code: 'HR' },
//       update: {},
//       where: { code: 'HR' }
//     }),
//     prisma.role.upsert({
//       create: { name: 'Finance Manager', code: 'FM' },
//       update: {},
//       where: { code: 'FM' }
//     })
//   ]);
// }

// dataSeed()
//   .catch((e) => {
//     console.error('Error while seeding data', e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

export default prisma;
