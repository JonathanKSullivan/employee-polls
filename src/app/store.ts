import { createStore } from 'redux';
import reducers from '@/reducers';
import middleware from '@/middleware';

const initialState = {
  users: {},
  polls: {},
  authedUser: undefined,
};

const store = createStore(
  reducers,
  initialState,
  middleware
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
