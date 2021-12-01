import React, { ReactElement } from 'react';

import { useSession } from 'next-auth/client';

import Header from '@/components/Header';

function HeaderContainer(): ReactElement {
  const [session] = useSession();

  return (
    <Header
      session={session}
    />
  );
}

export default HeaderContainer;
