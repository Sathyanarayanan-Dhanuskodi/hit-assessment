import React from 'react';
import Layout from '@/components/Layout';
import { MasterDataProvider } from '@/context/MasterDataProvider';
import { SessionProvider } from '@/context/SessionProvider';

function Home() {
  return (
    <SessionProvider>
      <MasterDataProvider>
        <Layout>
          <strong>Home</strong>
        </Layout>
      </MasterDataProvider>
    </SessionProvider>
  );
}

export default Home;
