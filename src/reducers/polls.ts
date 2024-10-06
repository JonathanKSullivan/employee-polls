import { Poll } from '../types/poll';
import { ANSWER_POLL, CREATE_POLL, RECEIVE_POLLS } from '@/actions/polls';

interface PollsAction {
  type: string;
  polls?: { [key: string]: Poll };
  poll?: Poll;
  qid?: string;
  answer?: 'optionOne' | 'optionTwo';
  authedUser?: string;
}

const polls = (state: { [key: string]: Poll } = {}, action: PollsAction) => {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };

    case CREATE_POLL:
      return {
        ...state,
        [action.poll!.id]: action.poll,
      };

    case ANSWER_POLL:
      const { qid, answer, authedUser } = action;
      return {
        ...state,
        [qid!]: {
          ...state[qid!],
          [answer!]: {
            ...state[qid!][answer!],
            votes: state[qid!][answer!].votes.concat([authedUser!]),
          },
        },
      };

    default:
      return state;
  }
};

export default polls;
