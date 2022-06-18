import axios, { AxiosError, AxiosResponse } from 'axios';

export type ResponseError = Omit<AxiosError<{ error: string }>, 'response'> & {
  response: AxiosResponse<{ error: string }>
};

export const isResponseError = (error: unknown | ResponseError): error is ResponseError => Boolean(
  error instanceof AxiosError
  && error.response
  && error.response.data.error,
);

export const handleError = (error: unknown): string => {
  if (isResponseError(error)) {
    return error.response.data.error;
  } if (error instanceof Error) {
    return error.message;
  }
  return error as string;
};

const API_SERVER = process.env.REACT_APP_API_SERVER;

if (API_SERVER === undefined) {
  throw new Error('Please declare REACT_APP_API_BE_SERVER value in /.env');
}

const ApiService = axios.create({
  baseURL: API_SERVER,
  headers: {
    'Content-Type': 'application/json',

  },
  timeout: 20000,
});

export default ApiService;
