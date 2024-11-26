import React from 'react';
import Layout from '@/components/Layout';
import { SessionProvider } from '../../context/SessionProvider';
import { MasterDataProvider } from '@/context/MasterDataProvider';

export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <MasterDataProvider>
        <Layout>{children}</Layout>
      </MasterDataProvider>
    </SessionProvider>
  );
}
