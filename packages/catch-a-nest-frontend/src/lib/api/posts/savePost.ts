import { EditorContent } from '@src/states/editorState';
import axiosClient from '../../axiosClient';
import { Post } from './types';

export default async function savePost({
  title,
  body,
  shortDescription,
  thumbnail,
}: EditorContent) {
  // TODO: remove
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('complete');
    }, 2000);
  });
  const response = await axiosClient.post<Post>('/api/posts/save', {
    title,
    body,
    shortDescription,
    thumbnail,
  });

  return response.data;
}
