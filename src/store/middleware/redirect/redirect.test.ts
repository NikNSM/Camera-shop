import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { TypeState } from '../../../type/type-redux';
import { redirect } from './redirect';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../../browser-history/browser-history';
import { redirectToRoute } from './action-redirect';
import { AddresesRoute } from '../../../const';

vi.mock('../../../browser-history/browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Middleware redirect', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<TypeState, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/*" with action "actionRedirect"', () => {
    const redirectToRoutePage404 = redirectToRoute(AddresesRoute.PAGE_404);
    store.dispatch(redirectToRoutePage404);
    expect(browserHistory.location.pathname).toBe(AddresesRoute.PAGE_404);
  });

  it('should not redirect to "/*" with empty action', () => {
    const emptyAction = {
      type: '',
      payload: AddresesRoute.PAGE_404,
    };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AddresesRoute.PAGE_404);
  });
});

