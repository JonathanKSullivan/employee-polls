'use client';

import { logoutUser } from '@/actions/users';
import Link from 'next/link';
import React, { useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Menu, Button, Layout } from 'antd';
import {
  HomeOutlined,
  PlusOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';

interface NavProps {
  authedUser: string | null;
  currentTab: string;
  dispatch: Dispatch;
}

const { Header } = Layout;

const Nav: React.FC<NavProps> = ({ authedUser, currentTab, dispatch }) => {
  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const menuItems = useMemo(
    () => [
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: <Link href="/">Home</Link>,
      },
      {
        key: 'add',
        icon: <PlusOutlined />,
        label: <Link href="/add">Add</Link>,
      },
      {
        key: 'leaderboard',
        icon: <TrophyOutlined />,
        label: <Link href="/leaderboard">Leaderboard</Link>,
      },
      {
        key: 'user',
        icon: <UserOutlined />,
        label: authedUser ? (
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button type="primary">Login</Button>
          </Link>
        ),
        style: { marginLeft: 'auto' },
      },
    ],
    [authedUser, handleLogout]
  );

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[currentTab]}
          items={menuItems}
        />
      </Header>
    </Layout>
  );
};

const mapStateToProps = (state: { authedUser: string | null }) => ({
  authedUser: state.authedUser,
});

export default connect(mapStateToProps)(Nav);
