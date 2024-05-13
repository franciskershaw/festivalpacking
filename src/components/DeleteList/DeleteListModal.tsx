'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useList } from '@/providers/ListContext';
import { deleteList } from '@/server/lists';

import Modal from '../Modal/Modal';

const DeleteListModal = ({ href, _id }: { href: string; _id: string }) => {
	const router = useRouter();

	const { state, clearListState } = useList();

	const onClick = async () => {
		await deleteList({ _id });
		if (state.festivalId && state.festivalId === _id) {
			clearListState();
		}
		router.push(href);
	};

	return (
		<Modal href={'/lists'}>
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
		</Modal>
	);
};

export default DeleteListModal;
