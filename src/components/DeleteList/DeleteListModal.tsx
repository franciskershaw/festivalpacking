'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { deleteList } from '@/server/lists';

const DeleteListModal = ({ href, _id }: { href: string; _id: string }) => {
	const router = useRouter();

	const onClick = async () => {
		await deleteList({ _id });
		router.push(href);
	};

	return (
		<div className="flex flex-col gap-5">
			<h2 className="text-lg text-center font-semibold">
				Are you sure you want to delete this list?
			</h2>
			<div className="flex justify-center gap-4">
				<Link className="border p-3 rounded-sm" href={href}>
					Cancel
				</Link>
				<button className="border p-3 rounded-sm" onClick={onClick}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteListModal;
