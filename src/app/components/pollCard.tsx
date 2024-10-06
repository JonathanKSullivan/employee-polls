import React from 'react';
import { Card, Progress, Typography } from 'antd';

interface PollCardProps {
  text: string;
  votes: number;
  percentage: number;
  isSelected?: boolean;
  onClick?: () => void;
  answered: boolean;
}

const PollCard: React.FC<PollCardProps> = React.memo(
  ({ text, votes, percentage, isSelected = false, onClick, answered }) => (
    <Card
      onClick={onClick}
      style={{
        ...styles.card,
        border: isSelected ? styles.selectedBorder : styles.defaultBorder,
        cursor: onClick ? 'pointer' : 'default',
      }}
      hoverable={!!onClick}
    >
      <Typography.Text>{text}</Typography.Text>

      {answered && (
        <>
          <Progress percent={percentage} status="active" />
          <Typography.Text>{votes} votes</Typography.Text>
        </>
      )}
    </Card>
  )
);

PollCard.displayName = 'PollCard';

const styles = {
  card: {
    transition: 'border 0.3s ease',
  },
  selectedBorder: '2px solid #1890ff',
  defaultBorder: '2px solid transparent',
};

export default PollCard;
