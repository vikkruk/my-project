import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import artistsRouter from './routers/artists-router';
import artistRolesRouter from './routers/artist-roles-router';

dotenv.config();
const server = express();

const DB_CONNECTION_URL = process.env.REACT_APP_DB_CONNECTION_URL;
if (DB_CONNECTION_URL === undefined) throw new Error('Set up environment variables!');

server.use(morgan(':method :url :status'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/artists', artistsRouter);
server.use('/api/artistRoles', artistRolesRouter);

mongoose.connect(
  DB_CONNECTION_URL,
  {
    retryWrites: true,
    w: 'majority',
  },
  (error) => {
    if (error) {
      console.log(`Couldn't connect:\n${error.message}`);
      return;
    }
    console.log('Successfully connected to MongoDB');
    server.listen(1337, () => console.log('Application server is running on: http://localhost:1337'));
  },

);

// "json-server -p 8000 -w ./database/db.json",
