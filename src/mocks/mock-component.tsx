import { createMemoryHistory, MemoryHistory } from 'history';
import HistoryRoute from '../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';

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
