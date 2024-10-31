import {ssrMiddleware} from 'quasar/wrappers';

export default ssrMiddleware(async({app})=>{app.use('/directus',await (await import('@directus/api')).createApp())});