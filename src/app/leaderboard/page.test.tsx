import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Leaderboard from './page';
import { useRouter } from 'next/navigation';

jest.mock('../components/nav', () => {
  const MockNav = () => <div>Mocked Nav</div>;
  MockNav.displayName = 'MockNav';
  return MockNav;
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockStore = {
  authedUser: 'user1',
  users: {
    user1: {
      id: 'user1',
      name: 'User One',
      avatarURL: '/user1-avatar.png',
      questions: ['q1', 'q2'],
      answers: { q3: 'optionOne' },
    },
    user2: {
      id: 'user2',
      name: 'User Two',
      avatarURL: '/user2-avatar.png',
      questions: ['q3'],
      answers: { q1: 'optionTwo', q2: 'optionOne' },
    },
  },
};

const reducer = (state = mockStore) => state;
const store = createStore(reducer);

describe('Leaderboard Component', () => {
  beforeEach(() => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  test('displays the correct username, number of questions asked, and answered', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByTestId('questions-asked-user1')).toHaveTextContent('2');
    expect(screen.getByTestId('questions-answered-user1')).toHaveTextContent(
      '1'
    );

    expect(screen.getByTestId('questions-asked-user2')).toHaveTextContent('1');
    expect(screen.getByTestId('questions-answered-user2')).toHaveTextContent(
      '2'
    );
  });
});
