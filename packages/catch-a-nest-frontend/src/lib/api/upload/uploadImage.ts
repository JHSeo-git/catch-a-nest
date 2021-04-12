import axiosClient from '@src/lib/api/axiosClient';
import { UploadImagePayload, UploadImageUrl } from './types';

export default async function uploadImage({
  type,
  filename,
}: UploadImagePayload) {
  const response = await axiosClient.post<UploadImageUrl>(
    '/api/upload/image/create-upload-url',
    {
      type,
      filename,
    }
  );

  return response.data;
}
