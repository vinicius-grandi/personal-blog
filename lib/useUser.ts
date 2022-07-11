import { useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { User } from '../pages/api/user';

const fetcher = (...args: [string, RequestInit]) => fetch(...args).then((res) => res.json());

const useUser = () => {
  const { data } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();
  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.isLoggedIn === false) {
      return;
    }
    async function redirect() {
      await router.replace('/');
    }
    void redirect();
  }, [data, router]);
  return data;
};

export default useUser;
