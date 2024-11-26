'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/config/navigation';
import Utils from '@/utils/utils';
import { useSession } from '@/context/SessionProvider';
import { useMasterData } from '@/context/MasterDataProvider';
import { SIGN_OUT_URL } from '@/constants/api';

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentUser = useSession();
  const masterData = useMasterData();

  return currentUser ? (
    <section className="w-full h-screen flex flex-row">
      <nav className="bg-[#f7f7f8] h-screen min-w-[250px] py-6 px-4">
        <div className="relative">
          <strong>HIT Assessment</strong>
        </div>

        <div className="overflow-auto py-6 h-full mt-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((e) => {
              const isNavLinkAllowed =
                masterData?.data?.currentUserPermissions?.find(
                  (p) => p.module.name === e.title
                )?.permissions.length;

              if (isNavLinkAllowed) {
                return (
                  <Link key={e.link} href={e.link}>
                    <NavLink
                      title={e.title}
                      icon={e.icon}
                      className={pathname === e.link ? 'text-blue-500' : ''}
                    />
                  </Link>
                );
              }
            })}
            <button onClick={signOut}>
              <NavLink
                title="Sign out"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // fill="currentColor"
                    className="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 6.35 6.35">
                    <path
                      d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                      data-original="#000000"
                    />
                  </svg>
                }
              />
            </button>
          </ul>
        </div>
      </nav>

      <div className="w-full p-5">{children}</div>
    </section>
  ) : null;
}

function NavLink({
  title,
  icon,
  className
}: Readonly<{
  title: string;
  icon: React.ReactNode;
  className?: string;
}>) {
  return (
    <li
      className={`text-black cursor-pointer hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${className}`}>
      <span className="w-[35px]">{icon}</span>
      <span>{title}</span>
    </li>
  );
}

async function signOut() {
  await Utils.callRestAPI({
    url: SIGN_OUT_URL
  });
  window.location.href = '/signin';
}

export default Layout;
