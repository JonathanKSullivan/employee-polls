'use client';

import React, { useEffect, useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Card, Typography, Divider, Layout, Row, Col, List } from 'antd';
import Nav from '../components/nav';
import LeaderboardItem from '../components/LeaderboardItem';
import { RootState } from '@/types';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

interface LeaderboardData {
  id: string;
  name: string;
  avatarURL: string | null;
  questionsAsked: number;
  questionsAnswered: number;
  score: number;
}

const Leaderboard: FC = () => {
  const router = useRouter();
  const authedUser = useSelector((state: RootState) => state.authedUser);
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (!authedUser) {
      router.push(`/login?from=/leaderboard`);
    }
  }, [authedUser, router]);

  const leaderboardData: LeaderboardData[] = useMemo(() => {
    return Object.values(users)
      .map((user) => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        questionsAsked: user.questions.length,
        questionsAnswered: Object.keys(user.answers).length,
        score: user.questions.length + Object.keys(user.answers).length,
      }))
      .sort((a, b) => b.score - a.score);
  }, [users]);

  if (!authedUser) return null;

  return (
    <Layout>
      <Nav currentTab="leaderboard" />
      <Content style={contentStyle}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16}>
            <Title level={1}>Leaderboard</Title>
            <Paragraph>
              Welcome to the leaderboard! Here you can see how you and other
              users rank based on your participation in the community.
            </Paragraph>
            <Paragraph>
              <Text strong>How it works:</Text> Your position is determined by
              the number of questions you&apos;ve asked and answered.
            </Paragraph>
            <Divider />

            <Card>
              <List
                itemLayout="horizontal"
                dataSource={leaderboardData}
                renderItem={(user, index) => (
                  <LeaderboardItem key={user.id} index={index} user={user} />
                )}
              />
            </Card>

            <Divider />
            <Text type="secondary">
              Want to improve your ranking? Keep contributing by asking
              insightful questions or helping others with answers!
            </Text>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

const contentStyle = {
  padding: '0 50px',
  marginTop: 20,
};

export default Leaderboard;
