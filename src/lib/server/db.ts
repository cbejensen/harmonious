import { PrismaClient } from '@prisma/client';

console.log('called');

export const db = new PrismaClient();
export type { Track, Song } from '@prisma/client';
