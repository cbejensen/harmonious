import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.getSession();

  if (session?.user?.email !== 'cbejensen@gmail.com') {
    throw error(401, 'not authorized');
  }

  const song = await db.song.findUnique({
    where: {
      id: 1
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

  return { session, song };
};

import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const trackId = data.get('track') as string;
    const notation = data.get('notation') as string;
    await db.track.update({
      where: { id: +trackId },
      data: { notation }
    });
  }
} satisfies Actions;
