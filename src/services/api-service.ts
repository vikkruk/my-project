import axios, { AxiosError, AxiosResponse } from 'axios';

export type ResponseError = Omit<AxiosError<{ error: string }>, 'response'> & {
  response: AxiosResponse<{ error: string }>
};

export const isResponseError = (error: unknown | ResponseError): error is ResponseError => Boolean(
  error instanceof AxiosError
  && error.response
  && error.response.data.error,
);

const API_SERVER = process.env.REACT_APP_API_SERVER;
const API_BE_SERVER = process.env.REACT_APP_API_BE_SERVER;

if (API_BE_SERVER === undefined) {
  throw new Error('Please declare REACT_APP_API_BE_SERVER value in /.env');
}

const ApiService = axios.create({
  baseURL: API_SERVER,
  headers: {
    'Content-Type': 'application/json',

  },
  timeout: 5000,
});

export default ApiService;

export const ApiServiceBE = axios.create({
  baseURL: API_BE_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});
