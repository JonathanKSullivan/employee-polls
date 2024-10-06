import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from './page';
import { useRouter } from 'next/navigation';
import reducers from '@/reducers';
import middleware from '@/middleware';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => '/'),
  })),
}));

jest.mock('../components/nav', () => {
  const MockedNav = () => <div>Mocked Nav</div>;
  MockedNav.displayName = 'MockedNav';
  return MockedNav;
});

const store = createStore(
  reducers,
  {
    authedUser: null,
    users: {
      user1: { id: 'user1', password: 'password123' },
    },
    polls: {},
  },
  middleware
);

describe('Login Page', () => {
  beforeEach(() => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  test('renders username, password fields, and submit button', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText(/Enter your username/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your password/i)
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  test('does not redirect on incorrect login', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: 'wrongUser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'wrongPassword' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    });

    expect(push).not.toHaveBeenCalled();
  });
});
