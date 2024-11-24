'use client';

import { IUser } from '@/types/users';
import Utils from '@/utils/utils';
import { createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext<IUser | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        console.log(document.cookie);
        const currentUserInfo = await Utils.getCurrentUser();

        setCurrentUser(currentUserInfo);
      }
    })();
  }, []);

  useEffect(() => {
    console.log('oooo');
  }, [document.cookie]);

  return (
    <SessionContext.Provider value={currentUser}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  return useContext(SessionContext);
};
