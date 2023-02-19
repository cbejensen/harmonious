import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const song = await db.song.findUnique({
    where: {
      id: parseInt(params.songId, 10)
    },
    include: {
      arrangements: {
        include: {
          tracks: true
        }
      }
    }
  });

  if (!song) {
    throw error(404, { message: "We can't seem to find that song 🤷‍♂️" });
  }

  return { song };
};
