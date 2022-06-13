import { Button } from '@mui/material';
import React from 'react';

type HomePageQuestionButtonProps = {
  text: string,
  onClick: () => void,
};

const HomePageQuestionButton: React.FC<HomePageQuestionButtonProps> = ({ onClick, text, children }) => (
  <Button
    onClick={onClick}
    sx={(theme) => ({
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            px: 5,
            gap: 1,
            transition: 'all 0.3s',
            width: { xs: 100, sm: 200 },

            ':hover': {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          })}
  >
    {text}
    {' '}
    {children}
    {' '}
  </Button>
  );

export default HomePageQuestionButton;
