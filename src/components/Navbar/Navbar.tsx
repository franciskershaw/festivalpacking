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
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { FaListCheck } from 'react-icons/fa6';
import { FaFloppyDisk } from 'react-icons/fa6';
type ProviderType = LiteralUnion<'Google' | 'GitHub' | string, string>;

type ProviderInfo = Record<ProviderType, ClientSafeProvider> | null;

const Navbar = () => {
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
    <nav className=' bg-gray-200 py-6 fixed bottom-0 left-0 flex justify-around items-center w-full'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <FaListCheck size={30} />
        <span className='text-lg'>Packing</span>
      </div>
      {session && (
        <div className='flex flex-col gap-2 items-center justify-center'>
          <FaFloppyDisk size={30} />
          <span className='text-lg'>Saved Lists</span>
        </div>
      )}

      {session ? (
        <button
          onClick={() => signOut()}
          className='flex flex-col gap-2 items-center justify-center'
        >
          <FaArrowRightToBracket size={30} />
          <span className='text-lg'>Log Out</span>
        </button>
      ) : (
        <button
          onClick={() => signIn(providers?.google.id)}
          className='flex flex-col gap-2 items-center justify-center'
        >
          <FaArrowRightToBracket size={30} />
          <span className='text-lg'>Login</span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
