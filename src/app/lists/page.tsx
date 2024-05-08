import { getUserLists } from '@/server/actions';
import { List } from '@/utils/types';

const ListsPage = async () => {
	const { data } = await getUserLists();

	return (
		<div className="border pt-6">
			<h1 className="text-xl">Saved lists</h1>
			{data?.map((list: List) => <p key={list._id}>{list.name}</p>)}
		</div>
	);
};

export default ListsPage;
