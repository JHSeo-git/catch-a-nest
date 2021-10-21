// Generated by https://quicktype.io
import { User } from '../auth/types';

export type PostShortInfo = {
  id: number;
  title: string;
  url_slug: string;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  short_description: string | null;
  thumbnail: string | null;
  url_slug: string;
  user: User;
  is_temp: boolean;
  created_at: string;
  updated_at: string;
  read_count?: number;
  read_time?: number;
  next_post?: PostShortInfo;
  prev_post?: PostShortInfo;
};
