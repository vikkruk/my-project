import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
 Box,
  CardMedia,
  Container,
} from '@mui/material';
import { Movie } from '../../types';

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

const MovieCard: React.FC<Movie> = ({
 id,
 title,
 year,
 poster,
 directors,
 actors,
 genres,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container sx={{ p: 2 }}>

      <Card sx={{ width: '100%' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        >
          <CardMedia>
            <Box
              component="img"
              sx={{
              width: {
                xs: 150,
                sm: 250,
                md: 400,
                lg: 500,
              },
              height: '100%',
              objectFit: 'cover',
              borderRadius: 1,
              mt: { xs: 1, lg: 0 },
              justifySelf: 'flex-start',
            }}
              height="400"
              src={poster}
            />
          </CardMedia>
          <CardContent sx={{ m: 'auto' }}>
            <Typography
              variant="h4"
              color="primary"
              sx={{
                fontSize: {
                  xs: '1.2rem',
                  sm: '1.8rem',
                  md: '2rem',
                },
              }}
            >
              {title}
            </Typography>
            <Typography variant="h5" color="primary">
              {year}
            </Typography>
          </CardContent>
        </Box>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon
              color="primary"
            />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ width: '100%' }}>
            <Typography paragraph>{directors.length > 1 ? 'Directors' : 'Director'}</Typography>

            {directors.map((director) => (
              <Typography paragraph key={director}>
                {director}
              </Typography>
            ))}
            <Typography paragraph>{actors.length > 1 ? 'Actors' : 'Actor'}</Typography>

            {actors.map((actor) => (
              <Typography paragraph key={actor}>
                {actor}
              </Typography>
            ))}

            <Typography paragraph>{genres.length > 1 ? 'Genres' : 'Genre'}</Typography>

            {genres.map((genre) => (
              <Typography paragraph key={genre}>
                {genre}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
};

export default MovieCard;
