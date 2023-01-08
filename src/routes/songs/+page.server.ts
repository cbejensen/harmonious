import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return { songs: [{ name: 'test', id: '333' }] };
  // const songs = await db.song.findMany();
  // return { songs };
};
