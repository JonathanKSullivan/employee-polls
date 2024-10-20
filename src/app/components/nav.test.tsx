import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Nav from './nav';
import { useRouter } from 'next/router';
import React from 'react';
import { AnyAction } from 'redux';

const mockStore = configureStore<RootState, AnyAction>([]);

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;

interface RootState {
  authedUser: string | null;
}

describe('Nav Component', () => {
  let store: MockStoreEnhanced<RootState, AnyAction>;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((message) => {
      if (message.includes('An update to ForwardRef inside a test was not wrapped in act')) {
        return;
      }
      console.error(message);
    });
  });

  beforeEach(() => {
    store = mockStore({
      authedUser: null,
    });

    mockedUseRouter.mockReturnValue({
      pathname: '/',
      query: {},
      asPath: '/',
    });
  });

  it('should display all the expected navigation links', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Nav currentTab="home" />
        </Provider>
      );
    });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('should display "Login" when user is not authenticated', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Nav currentTab="home" />
        </Provider>
      );
    });

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should display "Logout" when user is authenticated', async () => {
    store = mockStore({
      authedUser: 'sarahedo',
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Nav currentTab="home" />
        </Provider>
      );
    });

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
