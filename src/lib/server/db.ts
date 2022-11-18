import { PrismaClient } from '@prisma/client';

console.log('called');

export const db = new PrismaClient();
