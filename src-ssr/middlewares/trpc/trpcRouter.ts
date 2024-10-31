import trpc from './trpc';
import readUser from './readUser';

export const trpcRouter=trpc.router({
	readUser
});

export default trpcRouter;