'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleReceiveUsers, loginUser } from '@/actions/users';
import { handleReceivePolls } from '@/actions/polls';  // Add this if you are receiving polls too
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, Form, message, Typography, Spin } from 'antd';
import { RootState, AppDispatch } from '@/app/store'; // Import AppDispatch for proper dispatch typing
import { User } from '@/types/user'; // Assuming there's a type for User

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();  // Ensure dispatch is typed with AppDispatch
  const users = useSelector((state: RootState) => state.users);

  return (
    <Suspense fallback={<Spin tip="Loading..." />}>
      <LoginContent 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
        users={users}
        router={router}
        dispatch={dispatch}
      />
    </Suspense>
  );
};

interface LoginContentProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  users: Record<string, User>;
  router: ReturnType<typeof useRouter>; // Correct typing for the router
  dispatch: AppDispatch;
}

const LoginContent: React.FC<LoginContentProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  users,
  router,
  dispatch,
}) => {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  useEffect(() => {
    dispatch(handleReceiveUsers());  // handleReceiveUsers is a thunk action
    dispatch(handleReceivePolls());  // handleReceivePolls is also a thunk action
  }, [dispatch]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const handleLogin = () => {
    const user = users[username];

    if (user && user.password === password) {
      dispatch(loginUser(user));
      message.success('Login successful! Redirecting...');
      router.push(from);
    } else {
      message.error('Invalid username or password. Please try again.');
    }
  };

  return (
    <div>
      <div style={{ maxWidth: '400px', margin: '50px auto' }}>
        <Title level={2}>Welcome Back!</Title>
        <Text type="secondary">
          Please log in to access your account and continue.
        </Text>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          style={{ marginTop: '20px' }}
        >
          <Form.Item label="Username" required>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleInputChange(setUsername)}
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item label="Password" required>
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={handleInputChange(setPassword)}
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>

        <Text type="secondary">
          Forgot your password?{' '}
          <a href="/reset-password">Click here to reset it.</a>
        </Text>
        <br />
        <Text type="secondary">
          Don’t have an account? <a href="/signup">Sign up here.</a>
        </Text>
      </div>
    </div>
  );
};

export default Login;
