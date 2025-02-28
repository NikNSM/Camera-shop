import { store } from '../store/store';

export type TypeState = ReturnType<typeof store.getState>;

export type TypeAppDispatch = typeof store.dispatch;
