import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { _saveQuestion, _saveQuestionAnswer } from './_DATA';
import { Answer } from '../types/poll';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const validQuestion = {
  optionOneText: 'Learn React',
  optionTwoText: 'Learn Vue',
  author: 'mtsamis',
};

const invalidQuestion = {
  optionOneText: '',
  optionTwoText: '',
  author: '',
};

const validAnswer: Answer = {
  authedUser: 'sarahedo',
  qid: '8xf0y6ziyjabvozdd253nd',
  answer: 'optionOne',
};

const invalidAnswer: Answer = {
  authedUser: '',
  qid: '',
  answer: 'optionOne',
};

describe('_saveQuestion', () => {
  it('should return a formatted question when provided valid input', async () => {
    const question = await _saveQuestion(validQuestion);
    expect(question).toHaveProperty('id');
    expect(question).toHaveProperty('timestamp');
    expect(question).toHaveProperty('author', validQuestion.author);
    expect(question.optionOne.text).toBe(validQuestion.optionOneText);
    expect(question.optionTwo.text).toBe(validQuestion.optionTwoText);
  });

  it('should reject with an error message when provided invalid input', async () => {
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});

describe('_saveQuestionAnswer', () => {
  it('should return true when provided valid input', async () => {
    const result = await _saveQuestionAnswer(validAnswer);
    expect(result).toBe(true);
  });

  it('should reject with an error message when provided invalid input', async () => {
    await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
