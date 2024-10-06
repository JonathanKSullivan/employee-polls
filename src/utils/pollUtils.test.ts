import {
  calculateVotePercentage,
  getTotalVotes,
  getUserAnswer,
} from './pollUtils';

describe('pollUtils', () => {
  describe('calculateVotePercentage', () => {
    it('should return the correct percentage when totalVotes is greater than 0', () => {
      const votes = 50;
      const totalVotes = 100;
      const result = calculateVotePercentage(votes, totalVotes);
      expect(result).toBe(50);
    });

    it('should return 0 when totalVotes is 0', () => {
      const votes = 50;
      const totalVotes = 0;
      const result = calculateVotePercentage(votes, totalVotes);
      expect(result).toBe(0);
    });
  });

  describe('getTotalVotes', () => {
    it('should return the correct total number of votes', () => {
      const poll = {
        optionOne: { votes: ['user1', 'user2'] },
        optionTwo: { votes: ['user3'] },
      };
      const result = getTotalVotes(poll);
      expect(result).toBe(3);
    });

    it('should return 0 when there are no votes', () => {
      const poll = {
        optionOne: { votes: [] },
        optionTwo: { votes: [] },
      };
      const result = getTotalVotes(poll);
      expect(result).toBe(0);
    });
  });

  describe('getUserAnswer', () => {
    it('should return the correct answer for the authenticated user', () => {
      const authedUser = 'user1';
      const pollId = 'poll1';
      const users = {
        user1: {
          answers: {
            poll1: 'optionOne',
          },
        },
      };
      const result = getUserAnswer(authedUser, pollId, users);
      expect(result).toBe('optionOne');
    });

    it('should return undefined if the user has not answered the poll', () => {
      const authedUser = 'user1';
      const pollId = 'poll2';
      const users = {
        user1: {
          answers: {
            poll1: 'optionOne',
          },
        },
      };
      const result = getUserAnswer(authedUser, pollId, users);
      expect(result).toBeUndefined();
    });

    it('should return undefined if the user does not exist', () => {
      const authedUser = 'nonExistentUser';
      const pollId = 'poll1';
      const users = {
        user1: {
          answers: {
            poll1: 'optionOne',
          },
        },
      };
      const result = getUserAnswer(authedUser, pollId, users);
      expect(result).toBeUndefined();
    });
  });
});
