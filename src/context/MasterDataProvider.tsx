'use client';

import { IRoleModulePermission, TMasterData } from '@/types/types';
import Utils from '@/utils/utils';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSession } from './SessionProvider';

const MasterDataContext = createContext<
  | {
      data: TMasterData | undefined;
      allPermissions: IRoleModulePermission[] | undefined;
      isLoading: boolean;
    }
  | undefined
>(undefined);

export function MasterDataProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [data, setData] = useState<TMasterData>();
  const [allPermissions, setAllPermissions] =
    useState<IRoleModulePermission[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useSession();

  useEffect(() => {
    setIsLoading(true);

    if (currentUser) {
      (async () => {
        const masterData = await Utils.callRestAPI({
          url: `/api/master-data?roles=${currentUser.rid.join(',')}`,
          headers: {
            cache: 'force-cache'
          }
        });

        setData(masterData.data);
      })();

      (async () => {
        const allAccess = await Utils.callRestAPI({
          url: '/api/access',
          headers: {
            cache: 'force-cache'
          }
        });

        setAllPermissions(allAccess.data);
        setIsLoading(false);
      })();
    }
  }, [currentUser]);

  const value = useMemo(() => {
    return { data, isLoading, allPermissions };
  }, [data, isLoading, allPermissions]);

  return (
    <MasterDataContext.Provider value={value}>
      {children}
    </MasterDataContext.Provider>
  );
}

export const useMasterData = () => {
  return useContext(MasterDataContext);
};
