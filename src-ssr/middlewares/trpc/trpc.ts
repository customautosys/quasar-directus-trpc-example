import {initTRPC} from '@trpc/server';
import createContext from './createContext';

export const trpc=initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create();

export default trpc;