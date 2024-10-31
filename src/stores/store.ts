import {defineStore} from 'pinia';
import type {createTRPCProxyClient} from '@trpc/client';
import {DirectusUser} from '@directus/sdk';
import type router from '../../src-ssr/middlewares/trpc/trpcRouter';
import DirectusSchema from '../utils/interfaces/DirectusSchema';


export default defineStore('store',{
	state:()=>({
		trpc:null as ReturnType<typeof createTRPCProxyClient<typeof router>>|null,
		user:null as Partial<DirectusUser<DirectusSchema>>|null
	})
});