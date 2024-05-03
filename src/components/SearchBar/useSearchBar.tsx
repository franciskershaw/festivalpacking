import { useMemo, useState } from 'react';

import { Item } from '@/utils/types';

const useSearchBar = (allItems: Item[]) => {
	const [search, setSearch] = useState('');

	const searchResults = useMemo(() => {
		if (search === '') {
			return [];
		}
		const lowerCaseSearch = search.toLowerCase();
		const startsWithResults = allItems.filter((item) =>
			item.name.toLocaleLowerCase().startsWith(lowerCaseSearch),
		);
		if (startsWithResults.length >= 5) {
			return startsWithResults.slice(0, 5);
		}
		const includesResults = allItems.filter((item) =>
			item.name.toLowerCase().includes(lowerCaseSearch),
		);
		const combinedResults = Array.from(
			new Set([...startsWithResults, ...includesResults]),
		);
		return combinedResults.slice(0, 5);
	}, [allItems, search]);

	return { search, setSearch, searchResults };
};

export default useSearchBar;
