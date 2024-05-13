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
		<nav className=" py-5 fixed bottom-0 left-0 flex justify-around items-center w-full border-t-2 shadow-sm">
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
