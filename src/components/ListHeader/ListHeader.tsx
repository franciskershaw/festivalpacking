// 'use client';
import { getItems } from '@/server/actions';

import FestivalName from '../FestivalName/FestivalName';
import SearchBar from '../SearchBar/SearchBar';

const ListHeader = async () => {
	const allItems = await getItems();
	// const { dispatch } = useList();
	return (
		<header className="relative grid grid-cols-2 gap-6 py-4">
			<FestivalName />
			<SearchBar allItems={allItems.items} />
		</header>
	);
};

export default ListHeader;
