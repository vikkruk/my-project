import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MovieIcon from '@mui/icons-material/Movie';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { Movie } from '../../../types';
import CustomDivider from '../../../components/custom-divider';
import MoviesPageCardArtistsSection from './movies-page-card-artists-section';
import MoviesPageCardMedia from './movies-page-card-media';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MoviesPageCard: React.FC<Movie> = ({
 title,
 year,
 poster,
 directors,
 actors,
 genres,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container sx={{ p: 2, width: { xs: '100%', sm: 548, md: '100%' } }}>
      <Card>
        <Box
          sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },

        }}
        >
          <MoviesPageCardMedia poster={poster} />
          <CardContent sx={{ m: 'auto', display: { xs: 'none', md: 'initial' } }}>
            <Typography
              variant="h4"
              color="primary"
              sx={{
                fontSize: {
                  xs: '1.2rem',
                  sm: '1.8rem',
                  md: '2rem',
                },
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
            <Typography variant="h5" color="primary">
              {year}
            </Typography>
            <CustomDivider />
            <MoviesPageCardArtistsSection
              artistRole="director"
              artistsCollection={directors}
              height={190}
              width={150}
            />
            <CustomDivider />
            <MoviesPageCardArtistsSection
              artistRole="actor"
              artistsCollection={actors}
              height={190}
              width={150}
            />
          </CardContent>
        </Box>
        <CardActions disableSpacing sx={{ display: { xs: 'block', md: 'none' } }}>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
          >
            <MovieIcon
              color="primary"
              fontSize="large"
            />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ width: '100%', display: { xs: 'initial', md: 'none' } }}>
            <CustomDivider />
            <MoviesPageCardArtistsSection
              artistRole="director"
              artistsCollection={directors}
              height={130}
              width={90}
            />
            <CustomDivider />
            <MoviesPageCardArtistsSection
              artistRole="actor"
              artistsCollection={actors}
              height={130}
              width={90}
            />
            <CustomDivider />
            <Box sx={{ mt: 2 }}>

              <Typography
                variant="h5"
                color="primary"
                fontWeight="600"
                sx={{
                mb: 2,
              }}
              >
                {genres.length > 1 ? 'Genres' : 'Genre'}
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1,
              }}
              >

                {genres.map((genre) => (
                  <Typography variant="h5" key={genre.id}>
                    {`${genre.name.toUpperCase().slice(0, 1)}${genre.name.slice(1)} `}
                  </Typography>

                ))}
              </Box>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
};

export default MoviesPageCard;
