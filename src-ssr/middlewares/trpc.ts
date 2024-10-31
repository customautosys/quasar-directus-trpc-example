import {ssrMiddleware} from 'quasar/wrappers';
import {createExpressMiddleware} from '@trpc/server/adapters/express';
import createContext from './trpc/createContext';
import trpcRouter from './trpc/trpcRouter';

export default ssrMiddleware(({app})=>{
	app.use('/trpc',createExpressMiddleware({
		createContext,
		router:trpcRouter
	}));
});