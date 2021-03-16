import axiosClient from '../axiosClient';
import { User } from './types';

export default async function googleLogin(token: string) {
  const response = await axiosClient.post<GoogleSigninResult>(
    '/api/auth/google/login',
    {
      access_token: token,
    }
  );

  return response.data;
}

export type GoogleSigninResult = {
  user: User;
  access_token: string;
};
