'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import {
	ClientSafeProvider,
	LiteralUnion,
	getProviders,
	signIn,
	signOut,
	useSession,
} from 'next-auth/react';

import Icon from '../Icon/Icon';

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
		<nav className="bg-indigo-900 py-5 fixed bottom-0 w-full border-t-2 shadow-sm flex justify-around items-center md:flex-col md:items-center md:justify-center md:gap-16 md:h-full md:py-0 md:px-6 md:border-0 md:top-0 md:right-0 md:w-auto">
			<Link
				href="/"
				className="flex flex-col gap-2 items-center justify-center"
			>
				<Icon name="FaListCheck" size={26} />
				<span className="text-lg">Packing</span>
			</Link>
			{session && (
				<Link
					href="/lists"
					className="flex flex-col gap-2 items-center justify-center"
				>
					<Icon name="FaFloppyDisk" size={26} />
					<span className="text-lg">Saved Lists</span>
				</Link>
			)}

			{session ? (
				<button
					onClick={() => signOut()}
					className="flex flex-col gap-2 items-center justify-center"
				>
					<Icon name="FaArrowRightToBracket" size={26} />
					<span className="text-lg">Log Out</span>
				</button>
			) : (
				<button
					onClick={() => signIn(providers?.google.id)}
					className="flex flex-col gap-2 items-center justify-center"
				>
					<Icon name="FaArrowRightToBracket" size={26} />
					<span className="text-lg">Login</span>
				</button>
			)}
		</nav>
	);
};

export default Navbar;
