import { getItems } from '@/server/actions';

import FestivalName from '../FestivalName/FestivalName';
import SearchBar from '../SearchBar/SearchBar';

const ListHeader = async () => {
	const allItems = await getItems();

	return (
		<div className="fixed top-0 left-0 px-5 mb-8 bg-white">
			<header className="relative grid grid-cols-2 gap-6 py-4">
				<FestivalName />
				<SearchBar allItems={allItems.items} />
			</header>
		</div>
	);
};

export default ListHeader;
