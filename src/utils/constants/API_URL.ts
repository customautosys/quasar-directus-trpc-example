import deepFreeze from 'deep-freeze-es6';

export const API_URL=deepFreeze(process.env.MODE==='cordova'||process.env.MODE==='capacitor'?'http://'+process.env.IP+':9100/':'http://localhost:9100/');

export default API_URL;