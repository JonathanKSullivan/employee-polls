'use client';

import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import Nav from '@/app/components/nav';

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <>
      <Nav currentTab='' />
      <div style={styles.container}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={handleBackHome}>
              Back Home
            </Button>
          }
        />
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
};

export default NotFound;
