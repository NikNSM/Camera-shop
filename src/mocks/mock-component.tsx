import { createMemoryHistory, MemoryHistory } from 'history';
import HistoryRoute from '../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { TypeState } from '../type/type-redux';
import { createApi } from '../api/api';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { TypeAppThunkAppDispatch } from './mocks';
import { Provider } from 'react-redux';

export function withHistory(component: JSX.Element, hisory?: MemoryHistory) {
  const memoryHistory = hisory ?? createMemoryHistory();

  return (
    <HistoryRoute history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRoute>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<TypeState> = {},
): ComponentWithMockStore {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<TypeState, Action<string>, TypeAppThunkAppDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore: mockStore,
    mockAxiosAdapter: mockAxiosAdapter,
  });
}
