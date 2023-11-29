// npm i --save-dev @faker-js/faker
// const { faker } = require('@faker-js/faker');
const { fakerPT_BR: faker } = require('@faker-js/faker');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: 'minimal'});
const bcrypt = require('bcryptjs');

async function generateRandomUser() {
    return {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: await bcrypt.hash(faker.internet.password(), 10),
    };
}

async function createRandomUsers(userCount = 50) {
  const users = []
  const seenEmails = new Set();
  for (let i = 0; i < userCount; i++) {
    newUser = await generateRandomUser();
    if (!seenEmails.has(newUser.email)) {
      seenEmails.add(newUser.email);
      users.push(newUser);
    }
  }
  console.log(users);
  await prisma.user.createMany({ data: users });
}

createRandomUsers(100);
