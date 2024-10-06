import React from 'react';
import { Provider } from 'react-redux';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import reducers from '@/reducers';
import middleware from '@/middleware';
import Home from './page';
import { useRouter } from 'next/navigation';
import renderer from 'react-test-renderer';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const store = createStore(
  reducers,
  { users: {}, polls: {}, authedUser: null },
  middleware
);

describe('Home Page', () => {
  beforeEach(() => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/',
    });
  });

  it('should render the home page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByText('Welcome to the Polling App!')).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    let component;

    act(() => {
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
