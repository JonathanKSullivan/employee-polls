import React from 'react';
import { List, Avatar, Badge, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

interface User {
  id: string;
  avatarURL: string | null;
  name: string;
  questionsAsked: number;
  questionsAnswered: number;
  score: number;
}

interface LeaderboardItemProps {
  index: number;
  user: User;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = React.memo(
  ({ index, user }) => {
    const { avatarURL, name, questionsAsked, questionsAnswered, score } = user;

    const getAvatarURL = (url: string | null) => url || '/default-avatar.png';

    return (
      <List.Item style={styles.listItem}>
        <Row align="middle" style={styles.row}>
          <Col span={3}>
            <Avatar src={getAvatarURL(avatarURL)} size={64} />
          </Col>

          <Col span={16}>
            <Title level={4} style={styles.title}>
              {index + 1}. {name}
            </Title>
            <div style={styles.stats}>
              <div style={styles.statItem}>
                <Text strong>Questions Asked: </Text>
                <Text data-testid={`questions-asked-${user.id}`}>
                  {questionsAsked}
                </Text>
              </div>
              <div style={styles.statItem}>
                <Text strong>Questions Answered: </Text>
                <Text data-testid={`questions-answered-${user.id}`}>
                  {questionsAnswered}
                </Text>
              </div>
            </div>
          </Col>

          <Col span={5} style={styles.scoreCol}>
            <Badge
              count={score}
              showZero
              style={styles.badge}
              overflowCount={9999}
            />
          </Col>
        </Row>
      </List.Item>
    );
  }
);

LeaderboardItem.displayName = 'LeaderboardItem';

const styles: Record<string, React.CSSProperties> = {
  listItem: {
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    marginBottom: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s',
  },
  row: {
    width: '100%',
  },
  title: {
    margin: 0,
  },
  stats: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  statItem: {
    marginBottom: '6px',
  },
  scoreCol: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#52c41a',
    fontSize: '16px',
    padding: '12px',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default LeaderboardItem;
