import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

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
    const notation = data.get('notation') as string;
    const res = await db.track.update({
      where: { id: 1 },
      data: { notation }
    });
    console.log(res);
  }
} satisfies Actions;