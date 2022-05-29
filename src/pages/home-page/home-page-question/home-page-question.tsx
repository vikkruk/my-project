import {
  Box, Button, Typography,
} from '@mui/material';
import React from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import HomePageQuestionChoice from './home-page-choice';
import sadImg from './images/sadend.jpg';
import happyImg from './images/happyend.jpg';

const choiceFunction = (emotion: string) => {
  const choiceSection = document.querySelector(emotion) as HTMLDivElement;
  const question = document.querySelector('#question') as HTMLDivElement;
  choiceSection.classList.add('choice');
  question.classList.add('hidden');
};

const HomePageQuestion: React.FC = () => (

  <Box
    sx={(theme) => ({
      bgcolor: theme.palette.info.main,
      color: theme.palette.common.white,
      boxShadow: '0 0px 1px 2px grey',
      maxWidth: '500px',
      height: 400,
      m: 'auto',
      position: 'relative',
      overflow: 'hidden',
    })}
  >
    <Box
      id="question"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        gap: 5,
        transition: 'opacity 0.5s',

        '&.hidden': {
          opacity: 0,
        },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{ mt: 6, textAlign: 'center' }}
      >
        What kind of movie endings do you prefer?

      </Typography>
      <Box sx={{
        mb: 5, display: 'flex', justifyContent: 'center', gap: 3,
      }}
      >
        <Button
          onClick={
            () => choiceFunction('#happy')
          }
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            p: 2,
            gap: 1,
            transition: 'all 0.3s',

            ':hover': {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },

          })}
        >
          Happy ending
          <SentimentSatisfiedAltIcon />
          {' '}
        </Button>
        <Button
          onClick={() => choiceFunction('#sad')}
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            p: 2,
            gap: 1,
            transition: 'all 0.3s',

            ':hover': {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          })}
        >
          Sad ending
          {' '}
          <SentimentVeryDissatisfiedIcon />
          {' '}
        </Button>
      </Box>
    </Box>

    <HomePageQuestionChoice
      image={sadImg}
      transform="1200px"
      id="sad"
      text="Pathetic"
    />
    <HomePageQuestionChoice
      image={happyImg}
      transform="-1200px"
      id="happy"
      text="Ridiculous"
    />
  </Box>
);

export default HomePageQuestion;
