import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

interface ApiProps {
  method: 'post' | 'get' | 'delete' | 'put' | 'patch';
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

const okStatuses = [200, 201, 204];

export default function api<T>({ method, path, data }: ApiProps): Promise<T> {
  const url =
    data && method === 'get' ? `${path}?${new URLSearchParams(data)}` : path;
  return new Promise((resolve, reject) => {
    axiosInstance<T>({
      method,
      url,
      data,
    })
      .then((response) => {
        if (
          response.data !== undefined &&
          okStatuses.includes(response.status)
        ) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((response) => {
        reject(response);
      });
  });
}
