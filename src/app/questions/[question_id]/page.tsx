'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Typography, Row, Col, Button, message } from 'antd';
import PollCard from '@/app/components/pollCard';
import AuthorCard from '@/app/components/authorCard';
import Nav from '@/app/components/nav';
import {
  calculateVotePercentage,
  getTotalVotes,
  getUserAnswer,
} from '@/utils/pollUtils';
import { handleAnswerPoll } from '@/actions/polls';
import { RootState, AppDispatch } from '@/app/store';

const { Title, Paragraph, Text } = Typography;

const PollPage: React.FC = () => {
  const router = useRouter();
  const { question_id } = useParams() as { question_id: string };
  const [selectedOption, setSelectedOption] = useState<'optionOne' | 'optionTwo' | null>(null);
  const dispatch = useDispatch<AppDispatch>()

  const polls = useSelector((state: RootState) => state.polls);
  const users = useSelector((state: RootState) => state.users);
  const authedUser = useSelector((state: RootState) => state.authedUser);

  useEffect(() => {
    if (!authedUser) {
      router.push(`/login?from=/poll/${question_id}`);
    }
  }, [authedUser, router, question_id]);

  const poll = polls[question_id];
  const author = poll ? users[poll.author] : null;

  const userAnswer = useMemo(() => {
    return authedUser && poll
      ? getUserAnswer(authedUser, question_id, users)
      : null;
  }, [authedUser, question_id, users, poll]);

  const totalVotes = poll ? getTotalVotes(poll) : 0;
  const optionOnePercentage = poll
    ? calculateVotePercentage(poll.optionOne.votes.length, totalVotes)
    : 0;
  const optionTwoPercentage = poll
    ? calculateVotePercentage(poll.optionTwo.votes.length, totalVotes)
    : 0;

  const onOptionChange = (option: 'optionOne' | 'optionTwo') =>
    setSelectedOption(option);

  const onSubmit = async () => {
    if (!selectedOption) {
      message.error('Please select an option before submitting.');
      return;
    }

    try {
      await dispatch(
        handleAnswerPoll(authedUser!, question_id, selectedOption)
      );
      message.success('Your answer has been submitted!');
      router.push('/');
    } catch {
      message.error('There was an error submitting your answer.');
    }
  };

  if (!poll || !author) return <Spin size="large" tip="Loading poll data..." />;

  return (
    <div>
      <Nav currentTab="home" />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Title level={1} style={{ textAlign: 'center' }}>
          Would You Rather
        </Title>
        <Paragraph style={{ textAlign: 'center', marginBottom: '20px' }}>
          Participate in this fun poll by choosing the option you would prefer.
          After you vote, you’ll see how others responded as well. Ready to make
          your choice?
        </Paragraph>

        <AuthorCard author={{ ...author, avatarURL: author?.avatarURL || '/default-avatar.png' }} />

        <Row gutter={16}>
          {userAnswer ? (
            <>
              <Col span={12}>
                <PollCard
                  text={poll.optionOne.text}
                  votes={poll.optionOne.votes.length}
                  percentage={optionOnePercentage}
                  isSelected={userAnswer === 'optionOne'}
                  answered={true}
                />
              </Col>
              <Col span={12}>
                <PollCard
                  text={poll.optionTwo.text}
                  votes={poll.optionTwo.votes.length}
                  percentage={optionTwoPercentage}
                  isSelected={userAnswer === 'optionTwo'}
                  answered={true}
                />
              </Col>
            </>
          ) : (
            <>
              <Col span={12}>
                <PollCard
                  text={poll.optionOne.text}
                  votes={poll.optionOne.votes.length}
                  percentage={optionOnePercentage}
                  onClick={() => onOptionChange('optionOne')}
                  answered={false}
                />
              </Col>
              <Col span={12}>
                <PollCard
                  text={poll.optionTwo.text}
                  votes={poll.optionTwo.votes.length}
                  percentage={optionTwoPercentage}
                  onClick={() => onOptionChange('optionTwo')}
                  answered={false}
                />
              </Col>
            </>
          )}
        </Row>

        {!userAnswer && (
          <Button
            type="primary"
            onClick={onSubmit}
            style={{ marginTop: '20px' }}
            block
          >
            Submit
          </Button>
        )}
        <Text type="secondary" style={{ marginTop: '20px', display: 'block' }}>
          Quiz ID: {question_id}
        </Text>
      </div>
    </div>
  );
};

export default PollPage;
