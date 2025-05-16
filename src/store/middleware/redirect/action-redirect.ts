import { createAction } from '@reduxjs/toolkit';
import { AddresesRoute } from '../../../const';

export const redirectToRoute = createAction<AddresesRoute>('page/redirectToRoute');
