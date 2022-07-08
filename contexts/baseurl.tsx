import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type BaseurlCtx = {
  baseurl: string;
  setBaseurl?: React.Dispatch<React.SetStateAction<string>>;
};

const baseurlCtx = createContext<BaseurlCtx>({
  baseurl: '',
});

function BaseurlProvider({ children }: { children: JSX.Element }) {
  const [baseurl, setBaseurl] = useState('');
  const value = useMemo(() => ({ baseurl, setBaseurl }), [baseurl]);
  return (
    <baseurlCtx.Provider value={value}>
      {children}
    </baseurlCtx.Provider>
  );
}

export const useBaseurl = () => {
  const { baseurl, setBaseurl } = useContext(baseurlCtx);
  return { baseurl, setBaseurl };
};

export default BaseurlProvider;
