import { useMemo, useState } from 'react';

import { useList } from '@/providers/ListContext';
import { Item } from '@/utils/types';

const useSearchBar = (allItems: Item[]) => {
	const [search, setSearch] = useState('');

	const { state } = useList();

	const excludedIds = useMemo(
		() => new Set(state.items.map((item) => item._id)),
		[state.items],
	);

	const searchResults = useMemo(() => {
		if (search === '') {
			return [];
		}

		const lowerCaseSearch = search.toLowerCase();

		const startsWithResults = allItems.filter(
			(item) =>
				item.name.toLowerCase().startsWith(lowerCaseSearch) &&
				!excludedIds.has(item._id),
		);

		if (startsWithResults.length >= 5) {
			return startsWithResults.slice(0, 5);
		}

		const includesResults = allItems.filter(
			(item) =>
				item.name.toLowerCase().includes(lowerCaseSearch) &&
				!excludedIds.has(item._id),
		);

		const combinedResults = Array.from(
			new Set([...startsWithResults, ...includesResults]),
		);

		return combinedResults.slice(0, 5);
	}, [allItems, search, excludedIds]);

	return { search, setSearch, searchResults };
};

export default useSearchBar;
