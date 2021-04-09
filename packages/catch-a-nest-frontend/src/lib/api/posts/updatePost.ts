import axiosClient from '@src/lib/axiosClient';
import { EditorContent } from '@src/states/editorState';
import { Post } from './types';

export default async function updatePost(
  slug: string,
  { title, body, shortDescription, thumbnail }: EditorContent
) {
  const response = await axiosClient.put<Post>(`/api/posts/${slug}`, {
    title,
    body,
    shortDescription,
    thumbnail,
  });

  return response.data;
}
