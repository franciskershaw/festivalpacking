'use client';

import { useEffect, useMemo, useState } from 'react';

import { Item } from '@/utils/types';

const SearchBar = ({ allItems }: { allItems: Item[] }) => {
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

	return (
		<div>
			<input
				className="text-sm border border-gray-300 rounded-md pl-2 h-full w-full focus:border-gray-500 focus:outline-none"
				type="text"
				value={search}
				placeholder="Search items..."
				onChange={(e) => setSearch(e.target.value)}
			/>
			{searchResults.length > 0 && search !== '' && (
				<div className="absolute left-0 w-full bg-white border border-gray-300 shadow p-1 space-y-0.5 mt-2">
					{searchResults.map((item, index) => (
						<p key={index} className="text-sm p-2 hover:bg-gray-100">
							{item.name}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
