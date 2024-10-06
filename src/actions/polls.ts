import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../utils/_DATA';
import { Poll, NewPoll } from '../types/poll';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '@/app/store';

// Action Types
export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const CREATE_POLL = 'CREATE_POLL';
export const ANSWER_POLL = 'ANSWER_POLL';

// Action Creators
const receivePolls = (polls: { [key: string]: Poll }) => {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
};

const createPoll = (poll: Poll) => {
  return {
    type: CREATE_POLL,
    poll,
  };
};

const answerPoll = (
  authedUser: string,
  qid: string,
  answer: 'optionOne' | 'optionTwo'
) => {
  return {
    type: ANSWER_POLL,
    authedUser,
    qid,
    answer,
  };
};

// Async Action Creators
export const handleCreatePoll =
  (poll: NewPoll): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const savedPoll = await _saveQuestion(poll);
      dispatch(createPoll(savedPoll));
    } catch (e) {
      console.warn('Error in handleCreatePoll: ', e);
    }
  };

export const handleAnswerPoll = (
  authedUser: string,
  qid: string,
  answer: 'optionOne' | 'optionTwo'
) => {
  return (dispatch: Dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(answerPoll(authedUser, qid, answer));
      })
      .catch((e) => {
        console.warn('Error in handleAnswerPoll: ', e);
        alert('There was an error answering the poll. Try again.');
      });
  };
};

export const handleReceivePolls = () => {
  return (dispatch: Dispatch) => {
    return _getQuestions()
      .then((polls: { [key: string]: Poll }) => {
        dispatch(receivePolls(polls));
      })
      .catch((e) => {
        console.warn('Error in handleReceivePolls: ', e);
        alert('There was an error receiving the polls. Try again.');
      });
  };
};
