<style scoped lang="scss">
p{
	word-break:break-all;
}
</style>
<template>
	<q-page class="row items-center justify-evenly full-width">
		<p>{{user}}</p>
		<p>{{platform.userAgent}}</p>
	</q-page>
</template>

<script setup lang="ts">
import{
	computed,
	onMounted
}from 'vue';
import jsan from 'jsan';
import{
	createTRPCProxyClient,
	httpBatchLink
}from '@trpc/client';
import API_URL from '../utils/constants/API_URL';
import type trpcRouter from '../../src-ssr/middlewares/trpc/trpcRouter';
import type {DirectusUser} from '@directus/sdk';
import type DirectusSchema from '../utils/interfaces/DirectusSchema';

const store=prefetchStore||useStore();
const platform=prefetchPlatform||Platform;

const user=computed(()=>jsan.stringify(store.user));

onMounted(async()=>{
	store.trpc=createTRPCProxyClient<typeof trpcRouter>({
		links:[
			httpBatchLink({
				url:API_URL+'trpc'
			})
		]
	});
	store.user=await store.trpc.readUser.query() as Partial<DirectusUser<DirectusSchema>>;
		console.log(store.user);
});
</script>
<script lang="ts">
import {defineComponent} from 'vue';
import {Platform} from 'quasar';
import {preFetch} from 'quasar/wrappers';
import useStore from '../stores/store';

let prefetchPlatform:Platform|null=null;
let prefetchStore:ReturnType<typeof useStore>|null=null;

export default defineComponent({
	preFetch:preFetch(async params=>{
		if(params.ssrContext?.req?.get('host')?.startsWith('www.'))return params.redirect(params.ssrContext.req.protocol+'://'+String(params.ssrContext.req.get('host')).replace('www.','')+params.ssrContext.req.originalUrl);
		prefetchPlatform=params.ssrContext?Platform.parseSSR(params.ssrContext):Platform;
		prefetchStore=useStore(params.store);
	})
});
</script>