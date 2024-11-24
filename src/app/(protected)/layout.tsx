import React from 'react';
import Layout from '@/components/Layout';
import { SessionProvider } from '../context/SessionProvider';

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Layout>{children}</Layout>
    </SessionProvider>
  );
}
