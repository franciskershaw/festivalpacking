import Link from 'next/link';

import { getUserLists } from '@/server/lists';
import { List } from '@/utils/types';

import DeleteListModal from '@/components/DeleteList/DeleteListModal';
import Icon from '@/components/Icon/Icon';
import Modal from '@/components/Modal/Modal';
import NoItems from '@/components/PackingList/NoItems';

import EditList from './client/EditList';

export const dynamic = 'force-dynamic';

type SearchParamProps = {
	searchParams: Record<string, string> | null | undefined;
};

const ListsPage = async ({ searchParams }: SearchParamProps) => {
	const res = await getUserLists();
	const data = res?.data;

	const show = searchParams?.show;
	const idToDelete = searchParams?.id;

	return (
		<>
			<div className="pt-6 space-y-4">
				<h1 className="text-2xl">Saved lists</h1>
				{data?.length === 0 ? (
					<NoItems
						main="No lists saved yet"
						sub="Go to packing page to add your first list!"
					/>
				) : (
					data?.map((list: List) => (
						<div
							className="flex items-center justify-between border-0 border-b-2 pb-2"
							key={list._id}
						>
							<div className="space-y-1">
								<h2 className="text-lg">{list.name}</h2>
								<h3 className="text-xs">
									Created: {new Date(list.createdAt).toLocaleDateString()}
								</h3>
								<h3 className="text-xs">
									Updated: {new Date(list.updatedAt).toLocaleDateString()}
								</h3>
							</div>

							{/* Buttons */}
							<div className="flex items-center gap-4">
								<EditList list={list} />
								<Link href={`/lists?show=true&id=${list._id}`}>
									<Icon name="FaTrashCan" size={20} />
								</Link>
							</div>
						</div>
					))
				)}
			</div>
			{show && idToDelete && (
				<Modal href={'/lists'}>
					<DeleteListModal _id={idToDelete} href={'/lists'} />
				</Modal>
			)}
		</>
	);
};

export default ListsPage;
