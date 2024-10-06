import { User } from '../types/user';
import { RECEIVE_USERS } from '../actions/users';
import { ANSWER_POLL, CREATE_POLL } from '@/actions/polls';
import { Poll } from '../types/poll';

interface UsersAction {
  type: string;
  users?: { [key: string]: User };
  pollId?: string;
  authedUser?: string;
  answer?: 'optionOne' | 'optionTwo';
  poll?: Poll;
}

const users = (state: { [key: string]: User } = {}, action: UsersAction) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    case CREATE_POLL: {
      const { poll } = action;
      return {
        ...state,
        [poll!.author]: {
          ...state[poll!.author],
          questions: state[poll!.author].questions.concat([poll!.id]),
        },
      };
    }

    case ANSWER_POLL: {
      const { pollId, authedUser, answer } = action;
      return {
        ...state,
        [authedUser!]: {
          ...state[authedUser!],
          answers: {
            ...state[authedUser!].answers,
            [pollId!]: answer!,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default users;
