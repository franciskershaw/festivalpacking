import { getItems } from '@/server/items';

import FestivalName from '../FestivalName/FestivalName';
import SearchBar from '../SearchBar/SearchBar';

const ListHeader = async () => {
	const allItems = await getItems();

	return (
		<div className="bg-indigo-900 fixed top-0 left-0 px-5 mb-8 border-b-2 md:border-0 flex w-full md:justify-center">
			<header className="relative grid grid-cols-2 gap-6 py-4">
				<FestivalName />
				<SearchBar allItems={allItems?.data} />
			</header>
		</div>
	);
};

export default ListHeader;
