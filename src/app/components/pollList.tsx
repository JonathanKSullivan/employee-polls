import React, { useMemo } from 'react';
import { Card, Row, Col, Empty } from 'antd';
import Link from 'next/link';
import Poll from './poll';
import { Poll as PollType } from '@/types/poll';
import { User } from '@/types/user';

interface PollListProps {
  polls: PollType[];
  users: Record<string, User>;
  answered?: boolean;
  onVote: (pollId: string, answer: 'optionOne' | 'optionTwo') => void;
  authedUser?: string;
}

const PollList: React.FC<PollListProps> = React.memo(
  ({ polls, users, answered = false, onVote, authedUser }) => {
    const hasPolls = polls.length > 0;

    const renderPollList = useMemo(
      () => (
        <Row gutter={[16, 16]}>
          {polls.map((poll) => (
            <Col span={24} key={poll.id}>
              <Link href={`/questions/${poll.id}`}>
                <Poll
                  poll={poll}
                  answered={answered}
                  answer={
                    answered && authedUser
                      ? users[authedUser]?.answers[poll.id]
                      : undefined
                  }
                  onVote={onVote}
                  users={users}
                />
              </Link>
            </Col>
          ))}
        </Row>
      ),
      [polls, users, answered, authedUser, onVote]
    );

    return (
      <Card>
        {hasPolls ? (
          renderPollList
        ) : (
          <Empty
            description={
              answered
                ? 'No answered polls available.'
                : 'No unanswered polls available.'
            }
          />
        )}
      </Card>
    );
  }
);

PollList.displayName = 'PollList';

export default PollList;
