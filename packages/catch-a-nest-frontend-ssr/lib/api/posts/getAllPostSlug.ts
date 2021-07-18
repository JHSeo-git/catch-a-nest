import client from '../client';

export default async function getAllPostSlug(includeTemp = true) {
  const response = await client.get<string[]>('/api/posts/all-slug', {
    params: {
      include_temp: includeTemp,
    },
  });

  return response.data;
}
