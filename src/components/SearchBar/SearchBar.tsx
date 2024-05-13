'use client';

import Link from 'next/link';

import { Item } from '@/utils/types';
import { useSession } from 'next-auth/react';

import SearchResult from './SearchResult';
import useSearchBar from './useSearchBar';

import Icon from '../Icon/Icon';

const SearchBar = ({ allItems }: { allItems: Item[] }) => {
	const { search, setSearch, searchResults } = useSearchBar(allItems);

	const { data: session } = useSession();

	return (
		<>
			<input
				className="text-sm border border-gray-300 rounded-md pl-2 h-full w-full focus:border-gray-500 focus:outline-none"
				type="text"
				value={search}
				placeholder="Search items..."
				onChange={(e) => setSearch(e.target.value)}
                id='searchItems'
			/>
			{search !== '' && (
				<div className="absolute top-14 left-0 w-full bg-white border border-gray-300 shadow mt-2">
					{searchResults.length > 0 ? (
						searchResults.map((item, index) => (
							<SearchResult
								key={item._id}
								item={item}
								border={index < searchResults.length - 1}
								setSearch={setSearch}
							/>
						))
					) : (
						<div className="text-center py-4 space-y-4">
							<h3 className="text-xl">No items found</h3>
							{session ? (
								<Link
									className="flex justify-center items-center w-full"
									href={`/?newItem=true&newItemName=${search}`}
								>
									<div className="flex items-center gap-2">
										<span>Add new item</span>
										<Icon size={15} name="FaCirclePlus" />
									</div>
								</Link>
							) : (
								<button>Login to add custom items</button>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default SearchBar;
