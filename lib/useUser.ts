import { useEffect } from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import { User } from '../pages/api/user';

const fetcher = (...args: [string, RequestInit]) => fetch(...args).then((res) => res.json());

const useUser = (reload: boolean) => {
  const { data } = useSWR<User>('/api/user', fetcher, {
    revalidateOnFocus: false,
  });
  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.isLoggedIn === false) {
      return;
    }
    async function redirect() {
      await Router.replace('/');
    }
    if (reload) {
      void redirect();
    }
  }, [data, reload]);
  return data;
};

export default useUser;
