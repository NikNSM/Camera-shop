import { createAction } from '@reduxjs/toolkit';
import { AddresesRoute } from '../../const';

export const actionRedirect = createAction<AddresesRoute>('page/redirectToRoute');
