import React from 'react';
import { Avatar, Typography, Row, Col } from 'antd';

interface AuthorCardProps {
  author: {
    avatarURL: string;
    name: string;
    id: string;
  };
}

const AuthorCard: React.FC<AuthorCardProps> = React.memo(({ author }) => {
  const { avatarURL, name, id } = author;

  return (
    <Row align="middle" style={styles.row}>
      <Col span={4}>
        <Avatar src={avatarURL} size={64} alt={name} />
      </Col>
      <Col span={20}>
        <Typography.Title level={4} style={styles.title}>
          {name} (@{id}) asks:
        </Typography.Title>
      </Col>
    </Row>
  );
});

AuthorCard.displayName = 'AuthorCard';

const styles = {
  row: { marginBottom: '20px' },
  title: { marginLeft: '20px' },
};

export default AuthorCard;
