import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const { REACT_APP_DB_CONNECTION_URL, REACT_APP_TOKEN_SECRET } = process.env;

if (REACT_APP_DB_CONNECTION_URL === undefined || REACT_APP_TOKEN_SECRET === undefined) {
  throw new Error('Set up environment variables in src/config/.env file');
}

const config = {
  token: {
    secret: REACT_APP_TOKEN_SECRET,
  },
  db: {
    connectionURL: REACT_APP_DB_CONNECTION_URL,
  },
};

export default config;
