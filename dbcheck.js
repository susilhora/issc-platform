const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
  const u = await p.university.findFirst({ include: { country: { include: { costEstimates: true } } } });
  console.log('SAMPLE UNIVERSITY:', JSON.stringify(u, null, 2));
  await p.$disconnect();
}
main().catch(e => { console.log('DB_ERROR: ' + e.message); process.exit(1); });
