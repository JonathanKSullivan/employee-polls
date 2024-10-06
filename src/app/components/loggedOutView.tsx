import React, { useCallback } from 'react';
import { Button, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import Nav from './nav';

const { Title, Paragraph, Text } = Typography;

const LoggedOutView: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <div>
      <Nav currentTab="home" />
      <div style={styles.container}>
        <Title level={1}>Welcome to the Polling App!</Title>
        <Paragraph>
          This is a community-driven app where you can participate in fun and
          thought-provoking polls. Answer existing polls, create your own, and
          see how others voted.
        </Paragraph>
        <Paragraph>
          To get started, please <Text strong>log in</Text> or{' '}
          <Text strong>sign up</Text> and join the conversation!
        </Paragraph>
        <Button
          type="primary"
          size="large"
          style={styles.button}
          onClick={handleLoginClick}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '50px',
  },
  button: {
    marginTop: '20px',
  },
};

export default LoggedOutView;
