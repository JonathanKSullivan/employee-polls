import { Poll } from '@/types/poll';
import { User } from '@/types/user';

// Calculate the vote percentage for a poll option
export const calculateVotePercentage = (
  votes: number,
  totalVotes: number
): number => (totalVotes ? (votes / totalVotes) * 100 : 0);

// Get the total number of votes for a poll
export const getTotalVotes = (poll: Poll): number =>
  poll.optionOne.votes.length + poll.optionTwo.votes.length;

// Get the answer of the authenticated user for a specific poll
export const getUserAnswer = (
  authedUser: string,
  pollId: string,
  users: Record<string, User>
): string | undefined => users[authedUser]?.answers[pollId];
