'use client';

import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from 'next-auth/react';
import { useState, useEffect } from 'react';

type ProviderType = LiteralUnion<'Google' | 'GitHub' | string, string>;

type ProviderInfo = Record<ProviderType, ClientSafeProvider> | null;

export default function Home() {
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
    <main className="flex justify-center items-center h-screen border gap-4">
      {providers && !session ? (
        Object.values(providers).map((provider, index) => (
          <button
            key={index}
            onClick={() => signIn(provider.id)}
            className="border py-2 px-4 text-2xl">
            {provider.name}
          </button>
        ))
      ) : (
        <button onClick={() => signOut()} className="border py-2 px-4 text-2xl">
          Logout
        </button>
      )}
    </main>
  );
}
