import React, { useMemo, CSSProperties } from 'react';
import { Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface UserInfoProps {
  name: string;
  avatarURL: string | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, avatarURL }) => {
  const defaultAvatar = '/default-avatar.png';

  const avatarSrc = useMemo(() => avatarURL || defaultAvatar, [avatarURL]);

  return (
    <Card style={styles.card}>
      <Avatar
        size={100}
        src={avatarSrc}
        icon={!avatarURL ? <UserOutlined /> : undefined}
      />
      <Title level={4} style={styles.title}>
        Welcome, {name}
      </Title>
    </Card>
  );
};

const styles: { card: CSSProperties; title: CSSProperties } = {
  card: {
    width: 300,
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    marginTop: 10,
  },
};

export default React.memo(UserInfo);
