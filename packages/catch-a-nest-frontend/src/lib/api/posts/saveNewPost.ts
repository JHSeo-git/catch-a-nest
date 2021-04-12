import { EditorContent } from '@src/states/editorState';
import axiosClient from '../axiosClient';
import { Post } from './types';

export default async function saveNewPost({
  title,
  body,
  shortDescription,
  thumbnail,
}: EditorContent) {
  const response = await axiosClient.post<Post>('/api/posts/new', {
    title,
    body,
    shortDescription,
    thumbnail,
  });

  return response.data;
}
