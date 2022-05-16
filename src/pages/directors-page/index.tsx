import React from 'react';
import { Button, Container } from '@mui/material';

const DirectorsPage: React.FC = () => (
  <Container sx={{
    mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
  }}
  >
    <Button
      color="themeBlueColor"
      sx={(theme) => theme.mixins.redirectButton}
      variant="outlined"
      component="a"
      href="https://www.imdb.com"
      target="blank"
    >
      Just go to IMDB
    </Button>
    <Button
      color="themeGreyColor"
      sx={(theme) => theme.mixins.redirectButton}
      variant="outlined"
      component="a"
      href="https://www.letterboxd.com"
      target="blank"
    >
      Or Letterboxd
    </Button>
    <Button
      color="themeDarkColor"
      sx={(theme) => theme.mixins.redirectButton}
      variant="outlined"
      component="a"
      href="https://www.rottentomatoes.com"
      target="blank"
    >
      Or RottenTomatoes
    </Button>
  </Container>
);

export default DirectorsPage;
