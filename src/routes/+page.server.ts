import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = () => {
  return { name: 'Christian ' };
  // throw redirect(302, '/songs');
};
