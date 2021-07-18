import client from '../client';

export default async function getAllPostId(includeTemp = true) {
  const response = await client.get<string[]>('/api/posts/all-id', {
    params: {
      include_temp: includeTemp,
    },
  });

  return response.data;
}
