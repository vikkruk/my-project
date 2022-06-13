import React from 'react';
import { Box, Typography } from '@mui/material';

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
        backgroundSize: 'cover',
        backgroundPosition: '40% 20%',
        height: 400,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        mx: 'auto',
        width: '100%',
        boxShadow: '0 0 1px 1px grey',

        '::after': {
          position: 'absolute',
          content: '""',
          top: 0,
          left: 0,
          backgroundColor: theme.palette.info.main,
          height: '100%',
          width: '100%',
          opacity: '0.48',
        },

      })}
    >
      <Typography sx={{ fontSize: { xs: '25px', sm: '35px', md: '50px' }, zIndex: 1 }}>{text}</Typography>
    </Box>
  </Box>
);

export default HomePageQuestionChoice;
