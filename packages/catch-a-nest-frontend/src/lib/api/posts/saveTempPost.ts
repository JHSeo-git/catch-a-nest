import { EditorContent } from '@src/states/editorState';
import axiosClient from '../axiosClient';
import { Post } from './types';

export default async function saveTempPost(
  { title, body, shortDescription, thumbnail }: EditorContent,
  slug: string
) {
  const response = await axiosClient.put<Post>(`/api/temps/save/${slug}`, {
    title,
    body,
    shortDescription,
    thumbnail,
  });

  return response.data;
}
