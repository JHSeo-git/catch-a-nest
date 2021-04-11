import axiosClient from '../../axiosClient';
import { User } from './types';

type GoogleLoginPayload = {
  token: string;
  isAdmin: boolean;
};

export default async function googleLogin({
  token,
  isAdmin,
}: GoogleLoginPayload) {
  const response = await axiosClient.post<GoogleSigninResult>(
    '/api/auth/google/login',
    {
      access_token: token,
      is_admin: isAdmin,
    }
  );

  return response.data;
}

export type GoogleSigninResult = {
  user: User;
  access_token: string;
};
