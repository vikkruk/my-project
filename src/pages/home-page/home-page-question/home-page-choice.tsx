import { Box, Typography } from '@mui/material';
import React from 'react';

type HomePageQuestionChoiceProps = {
  id: string,
  transform: string,
  image: string,
  text: string,
};

const HomePageQuestionChoice: React.FC<HomePageQuestionChoiceProps> = ({
  id, transform, image, text,
}) => (
  <Box
    id={id}
    sx={{
      width: '100%',
      transform: `translateX(${transform})`,
      transition: 'all 0.3s',
      position: 'absolute',
      opacity: 0,

      '&.choice': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }}
  >
    <Box
      sx={(theme) => ({
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '40% 20%',
        height: 400,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        width: '500px',
        mx: 'auto',
        boxShadow: '0 0 1px 1px grey',

        '::after': {
          position: 'absolute',
          content: '""',
          top: 0,
          left: 0,
          backgroundColor: theme.palette.themeGreyColor.main,
          height: '100%',
          width: '100%',
          opacity: '0.48',
        },

      })}
    >
      <Typography sx={{ fontSize: '50px', zIndex: 1 }}>{text}</Typography>
    </Box>
  </Box>
);

export default HomePageQuestionChoice;
