/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { Action, State } from './types';

const initialValues: State = {
  actors: [
    {
      id: '1',
      name: 'Tommy',
      surname: 'Wiseau',
      img: 'https://imgix.ranker.com/user_node_img/50097/1001926658/original/what-a-story-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces',
      gender: 'male',
    },
    {
      id: '2',
      name: 'Megan',
      surname: 'Fox',
      img: 'https://judiciaryreport.com/images/megan-fox-9-17-11-5.jpg',
      gender: 'female',
    },
    {
      id: '3',
      name: 'Chuck',
      surname: 'Norris',
      img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-chuck-norris-in-walker-texas-ranger-1993--album.jpg',
      gender: 'male',
    },
    {
      id: '4',
      name: 'Paris',
      surname: 'Hilton',
      img: 'https://wild941.com/wp-content/uploads/sites/81/2017/08/GettyImages-624089084-1024x1024.jpg',
      gender: 'female',
    },
    {
      id: '5',
      name: 'Steven',
      surname: 'Seagal',
      img: 'https://teddyfeed.com/wp-content/uploads/2021/04/70efdf2ec9b086079795c442636b55fb-14-768x960.jpg',
      gender: 'male',
    },
    {
      id: '6',
      name: 'Lindsay',
      surname: 'Lohan',
      img: 'https://dazedimg-dazedgroup.netdna-ssl.com/1024/azure/dazed-prod/1300/5/1305305.jpg',
      gender: 'female',
    },
  ],
  favored: [],
};

const mainReducer: Reducer<State, Action> = (state = initialValues, { type, payload }) => {
  if (type === 'ADD_TO_FAVORED') {
    const favoredActor = state.actors.find((actor) => actor.id === payload.actorId);
    if (favoredActor) {
      return {
        ...state,
        favored: [
          ...state.favored,
          { id: payload.actorId },
        ],
      };
    }
  }
  return state;
};

export default mainReducer;
