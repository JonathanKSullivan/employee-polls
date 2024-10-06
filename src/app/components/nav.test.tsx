import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Nav from './nav';
import { useRouter } from 'next/router';
import React from 'react';

const mockStore = configureStore([]);

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;

interface RootState {
  authedUser: string | null;
}

describe('Nav Component', () => {
  let store: MockStoreEnhanced<RootState, unknown>;

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

  it('should display all the expected navigation links', () => {
    render(
      <Provider store={store}>
        <Nav currentTab="home" />
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('should display "Login" when user is not authenticated', () => {
    render(
      <Provider store={store}>
        <Nav currentTab="home" />
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should display "Logout" when user is authenticated', () => {
    store = mockStore({
      authedUser: 'sarahedo',
    });

    render(
      <Provider store={store}>
        <Nav currentTab="home" />
      </Provider>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
