'use client';

import { Item } from '@/utils/types';

import useSearchBar from './useSearchBar';

const SearchBar = ({ allItems }: { allItems: Item[] }) => {
	const { search, setSearch, searchResults } = useSearchBar(allItems);

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
