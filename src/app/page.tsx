'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Typography, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleReceiveUsers } from '@/actions/users';
import { handleAnswerPoll, handleReceivePolls } from '@/actions/polls';
import Nav from './components/nav';
import UserInfo from './components/userInfo';
import PollList from './components/pollList';
import LoggedOutView from './components/loggedOutView';
import { RootState, AppDispatch } from '@/app/store';
import { Poll as PollType } from '@/types/poll';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

const Home: React.FC = () => {
  const [answeredPolls, setAnsweredPolls] = useState<PollType[]>([]);
  const [unansweredPolls, setUnansweredPolls] = useState<PollType[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const authedUser = useSelector((state: RootState) => state.authedUser);
  const users = useSelector((state: RootState) => state.users);
  const polls = useSelector((state: RootState) => state.polls);

  useEffect(() => {
    dispatch(handleReceiveUsers());
    dispatch(handleReceivePolls());
  }, [dispatch]);

  const sortPollsByTimestamp = useCallback((pollsList: PollType[]) => {
    return pollsList.sort((a, b) => b.timestamp - a.timestamp);
  }, []);

  useEffect(() => {
    if (authedUser && users[authedUser]) {
      const user = users[authedUser];
      const pollsList = Object.values(polls).filter((poll): poll is PollType => !!poll);

      const answered = pollsList.filter((poll) => poll.id in user.answers);
      const unanswered = pollsList.filter((poll) => !(poll.id in user.answers));

      setAnsweredPolls(sortPollsByTimestamp(answered));
      setUnansweredPolls(sortPollsByTimestamp(unanswered));
    }
  }, [authedUser, users, polls, sortPollsByTimestamp]);

  const onVote = async (pollId: string, answer: 'optionOne' | 'optionTwo') => {
    if (!authedUser) return;
    await dispatch(handleAnswerPoll(authedUser, pollId, answer));
  };

  if (!authedUser) {
    return <LoggedOutView />;
  }

  const user = users[authedUser];

  return (
    <div>
      <Nav currentTab="home" />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Title level={1}>Home</Title>
        <Paragraph>
          Welcome back, <Text strong>{user.name}</Text>! Answer some new polls
          or check out the results of those you&apos;ve already completed.
        </Paragraph>

        <UserInfo name={user.name} avatarURL={user.avatarURL} />

        <Divider />

        <Tabs defaultActiveKey="1" style={{ marginTop: '20px' }}>
          <TabPane tab="Unanswered Polls" key="1">
            <PollList polls={unansweredPolls} users={users} onVote={onVote} />
          </TabPane>

          <TabPane tab="Answered Polls" key="2">
            <PollList
              polls={answeredPolls}
              users={users}
              answered={true}
              authedUser={authedUser}
              onVote={onVote}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
