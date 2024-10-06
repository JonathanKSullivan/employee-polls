import React, { useMemo } from 'react';
import { Row, Col, Button } from 'antd';
import { Poll as PollType } from '@/types/poll';
import PollCard from './pollCard';
import AuthorCard from './authorCard';
import { calculateVotePercentage, getTotalVotes } from '@/utils/pollUtils';
import { User } from '@/types/user';

interface PollProps {
  poll: PollType;
  answer?: string;
  onVote?: (pollId: string, option: 'optionOne' | 'optionTwo') => void;
  users: Record<string, User>;
  answered: boolean;
}

const Poll: React.FC<PollProps> = ({
  poll,
  answer,
  onVote,
  users,
  answered,
}) => {
  const totalVotes = useMemo(() => getTotalVotes(poll), [poll]);
  const optionOnePercentage = useMemo(
    () => calculateVotePercentage(poll.optionOne.votes.length, totalVotes),
    [poll, totalVotes]
  );
  const optionTwoPercentage = useMemo(
    () => calculateVotePercentage(poll.optionTwo.votes.length, totalVotes),
    [poll, totalVotes]
  );

  const author = users[poll.author];

  const authorWithAvatar = {
    ...author,
    avatarURL: author.avatarURL || '/default-avatar.png',
  };

  const renderPollContent = () => {
    if (answer) {
      return (
        <>
          <Col span={12}>
            <PollCard
              text={poll.optionOne.text}
              votes={poll.optionOne.votes.length}
              percentage={optionOnePercentage}
              isSelected={answer === 'optionOne'}
              answered={answered}
            />
          </Col>
          <Col span={12}>
            <PollCard
              text={poll.optionTwo.text}
              votes={poll.optionTwo.votes.length}
              percentage={optionTwoPercentage}
              isSelected={answer === 'optionTwo'}
              answered={answered}
            />
          </Col>
        </>
      );
    }

    return (
      <>
        <Col span={12}>
          <Button block onClick={() => onVote?.(poll.id, 'optionOne')}>
            {poll.optionOne.text}
          </Button>
        </Col>
        <Col span={12}>
          <Button block onClick={() => onVote?.(poll.id, 'optionTwo')}>
            {poll.optionTwo.text}
          </Button>
        </Col>
      </>
    );
  };

  return (
    <div>
      <AuthorCard author={authorWithAvatar} />
      <Row gutter={16}>{renderPollContent()}</Row>
    </div>
  );
};

export default Poll;
