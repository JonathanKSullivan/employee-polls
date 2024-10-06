import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CreatePoll from './page';
import { useRouter } from 'next/navigation';
import reducers from '@/reducers';
import middleware from '@/middleware';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    pathname: '/',
  })),
}));

jest.mock('@/actions/polls', () => ({
  handleCreatePoll: jest.fn(),
}));

jest.mock('../components/nav', () => {
  const MockNav = () => <div>Mocked Nav</div>;
  MockNav.displayName = 'MockNav';
  return MockNav;
});

const store = createStore(
  reducers,
  { authedUser: 'user1', users: {}, polls: {} },
  middleware
);

describe('CreatePoll Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the CreatePoll form fields and submit button', () => {
    render(
      <Provider store={store}>
        <CreatePoll />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Option 1/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Option 2/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Submit Poll/i })
    ).toBeInTheDocument();
  });

  test('redirects to login page if user is not authenticated', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <Provider store={createStore(() => ({ authedUser: null }))}>
        <CreatePoll />
      </Provider>
    );

    expect(push).toHaveBeenCalledWith('/login?from=/add');
  });
});
