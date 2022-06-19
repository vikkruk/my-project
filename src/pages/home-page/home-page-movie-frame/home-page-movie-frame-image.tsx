import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import MoviesService from '../../../services/movies-service';

const HomePageMovieFrameImage: React.FC = () => {
  const [randomImage, setRandomImage] = useState<string>('');
  useEffect(() => {
  (async () => {
    const fetchedImage: string = await MoviesService.fetchRandomMovieImage();
    setRandomImage(fetchedImage);
  })();
}, []);

  return (
    <Box
      sx={{
      position: 'absolute',
      display: 'block',
      backgroundImage: `url(${randomImage})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      top: {
        xs: 10,
        sm: 15,
        md: 16,
        lg: 14,
      },
      left: {
        xs: 14,
        sm: 26,
        md: 33,
        lg: 35,
      },
      width: {
        xs: 268,
        sm: 500,
        md: 640,
        lg: 680,
      },
      height: {
        xs: 190,
        sm: 350,
        md: 450,
        lg: 475,
      },
    }}
    />
  );
};

export default HomePageMovieFrameImage;
