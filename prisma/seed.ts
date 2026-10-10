import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@ums.com';
  const adminPassword = 'securepassword123';
  
  console.log('Starting seed...');

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Use transaction to create both User and Admin records
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          role: Role.ADMIN,
        },
      });

      await tx.admin.create({
        data: {
          userId: user.id,
          name: 'Super Admin',
        },
      });
    });
    
    console.log(`✅ Admin user seeded successfully!`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } else {
    console.log('✅ Admin user already exists. Skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
