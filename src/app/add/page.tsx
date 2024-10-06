'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography, message } from 'antd';
import Nav from '../components/nav';
import { RootState } from '@/types';
import { NewPoll } from '@/types/poll';
import { handleCreatePoll } from '@/actions/polls';
import { AppDispatch } from '@/app/store';

const { Title, Paragraph, Text } = Typography;

const CreatePoll: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const authedUser = useSelector((state: RootState) => state.authedUser);

  useEffect(() => {
    if (!authedUser) {
      router.push(`/login?from=/add`);
    }
  }, [authedUser, router]);

  const AddNewPoll = async (values: { option1: string; option2: string }) => {
    const { option1, option2 } = values;

    if (!authedUser) {
      message.error('You must be logged in to create a poll.');
      return;
    }

    const newPoll: NewPoll = {
      optionOneText: option1,
      optionTwoText: option2,
      author: authedUser,
    };

    try {
      await dispatch(handleCreatePoll(newPoll));
      message.success('Poll created successfully!');
      router.push('/');
    } catch {
      message.error('Failed to create the poll. Please try again.');
    }
  };

  return (
    <div>
      <Nav currentTab="add" />
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <Title level={1}>Create a New Poll</Title>

        <Paragraph>
          Welcome! Here you can create your very own poll and see how others
          respond. Think of two fun, creative, or thought-provoking options for
          people to choose between. After you submit the poll, it will appear on
          the homepage for others to answer.
        </Paragraph>

        <Paragraph>
          <Text strong>How it works:</Text> Simply provide two options that
          start with &quot;Would you rather...&quot;. Once submitted, others
          will be able to vote on which option they prefer. You can view the
          results on the homepage afterward.
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          onFinish={AddNewPoll}
          style={{ marginTop: '20px' }}
        >
          <Title level={3}>Would you rather...</Title>

          <Form.Item
            label="Option 1"
            name="option1"
            rules={[
              { required: true, message: 'Please input the first option!' },
            ]}
          >
            <Input placeholder="Option 1 (e.g., Have the ability to fly)" />
          </Form.Item>

          <Form.Item
            label="Option 2"
            name="option2"
            rules={[
              { required: true, message: 'Please input the second option!' },
            ]}
          >
            <Input placeholder="Option 2 (e.g., Be invisible)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Poll
            </Button>
          </Form.Item>
        </Form>

        <Paragraph
          type="secondary"
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          After submission, you’ll be redirected to the homepage where you can
          see the poll you created and how others are voting!
        </Paragraph>
      </div>
    </div>
  );
};

export default CreatePoll;
