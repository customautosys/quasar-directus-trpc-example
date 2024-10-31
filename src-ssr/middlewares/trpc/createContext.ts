import type {CreateExpressContextOptions} from '@trpc/server/adapters/express';
import type express from 'express';

export async function createContext({
	req,
	res
}:CreateExpressContextOptions):Promise<{
	req:express.Request,
	res:express.Response
}>{
	return{
		req,
		res
	};
};

export default createContext;
