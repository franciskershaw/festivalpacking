'use client';

import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import { useEffect, useState } from 'react';

type ProviderType = LiteralUnion<'Google' | 'GitHub' | string, string>;

type ProviderInfo = Record<ProviderType, ClientSafeProvider> | null;

const LoginButtons = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<ProviderInfo>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <div>
      {providers && !session ? (
        Object.values(providers).map((provider, index) => (
          <button
            key={index}
            onClick={() => signIn(provider.id)}
            className='border py-2 px-4 text-2xl'
          >
            {provider.name}
          </button>
        ))
      ) : (
        <button onClick={() => signOut()} className='border py-2 px-4 text-2xl'>
          Logout
        </button>
      )}
    </div>
  );
};

export default LoginButtons;
