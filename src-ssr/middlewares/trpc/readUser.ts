import {TRPCError} from '@trpc/server';
import{
	DirectusUser,
	readMe
}from '@directus/sdk';
import trpc from './trpc';
import directus from '../../../src/utils/functions/directus';
import type DirectusSchema from '../../../src/utils/interfaces/DirectusSchema';

export const readUser=trpc.procedure.query(async opts=>{
	opts.ctx.req.headers['if-none-match']='no-match-for-this';

	await directus(opts.ctx.req).login('quasar_directus_trpc_example@example.com','quasar_directus_trpc_example_password');

	let user=await directus(opts.ctx.req).request<Partial<DirectusUser<DirectusSchema>>>(readMe());
	console.log(user);
	if(user)return user;

	throw new TRPCError({
		code:'BAD_REQUEST',
		message:'Unable to read admin user'
	});
});

export default readUser;