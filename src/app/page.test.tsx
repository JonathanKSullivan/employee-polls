import React from 'react';
import { Provider } from 'react-redux';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '@/reducers';
import Home from './page';
import { useRouter } from 'next/navigation';
import renderer from 'react-test-renderer';
import middleware from '@/middleware';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const store = createStore(
  reducers,
  { users: {}, polls: {}, authedUser: null },
  middleware
);

beforeAll(() => {
  const originalError = console.error;
  jest.spyOn(console, 'error').mockImplementation((message) => {
    if (typeof message === 'string' && message.includes('deprecated')) return;
    originalError(message);
  });
});

describe('Home Page', () => {
  beforeEach(() => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/',
    });
  });

  it('should render the home page with welcome text', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    });

    expect(screen.getByText('Welcome to the Polling App!')).toBeInTheDocument();
  });

  it('should match the snapshot', async () => {
    let component;

    await act(async () => {
      component = renderer.create(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
