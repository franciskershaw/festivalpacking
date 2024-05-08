import { getUserLists } from '@/server/lists';
import { List } from '@/utils/types';

import Icon from '@/components/Icon/Icon';
import NoItems from '@/components/PackingList/NoItems';

import EditList from './client/EditList';

const ListsPage = async () => {
	const res = await getUserLists();
	const data = res.data;

	return (
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
							<Icon name="FaTrashCan" size={20} />
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default ListsPage;
