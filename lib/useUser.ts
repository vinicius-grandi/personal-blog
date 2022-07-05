import useSWR from 'swr';

const fetcher = (...args: [string, RequestInit]) => fetch(...args).then((res) => res.json());

const useUser = () => {
  const { data } = useSWR<{
    message: string,
  }>('/api/login', fetcher);
  if (!data) {
    return null;
  }
  return data;
};

export default useUser;
