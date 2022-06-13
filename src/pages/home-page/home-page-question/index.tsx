import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import HomePageQuestionChoice from './home-page-choice';
import HomePageQuestionButton from './home-page-question-button';
import happyImg from './images/happyend.jpg';
import sadImg from './images/sadend.jpg';

const choiceFunction = (emotion: string): void => {
  const choiceSection = document.querySelector(emotion) as HTMLDivElement;
  const question = document.querySelector('#question') as HTMLDivElement;
  choiceSection.classList.add('choice');
  question.classList.add('hidden');
};

const HomePageQuestion: React.FC = () => (

  <Box
    sx={(theme) => ({
      color: theme.palette.primary.main,
      boxShadow: '0 1px 1px 2px grey',
      width: { xs: 280, sm: 600 },
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
        <HomePageQuestionButton onClick={() => choiceFunction('#happy')} text="Happy ending">
          <SentimentSatisfiedAltIcon />
        </HomePageQuestionButton>
        <HomePageQuestionButton onClick={() => choiceFunction('#sad')} text="Sad ending">
          <SentimentVeryDissatisfiedIcon />
        </HomePageQuestionButton>
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
