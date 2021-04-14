import axiosClient from '@src/lib/api/axiosClient';

export default async function deletePostBySlug(slug: string) {
  const response = await axiosClient.delete(`/api/posts/${slug}`);

  return response.status === 204;
}
