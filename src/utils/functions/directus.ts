import{
	AuthenticationClient,
	DirectusClient,
	RestClient,
	authentication,
	createDirectus,
	rest
}from '@directus/sdk';
import type{
	Application,
	Request
}from 'express';
import {expressMiddlewareFetch} from 'express-middleware-fetch';
import API_URL from '../constants/API_URL';
import type DirectusSchema from '../interfaces/DirectusSchema';

export default (function(){
	let directus:DirectusClient<DirectusSchema>&RestClient<DirectusSchema>&AuthenticationClient<DirectusSchema>;
	let fetch:ReturnType<typeof expressMiddlewareFetch>;
	return function(req?:Request){
		if(req){
			if(!fetch){
				fetch=expressMiddlewareFetch(req);
			}else{
				fetch.req=req;
			}
			if(!directus){
				directus=createDirectus(
					API_URL+'directus',
					{
						globals:{
							fetch
						}
					}
				).with(rest()).with(authentication('json'));
			}
		}else if(!directus)directus=createDirectus(API_URL+'directus').with(rest()).with(authentication('json'));
		return directus;
	};
})();