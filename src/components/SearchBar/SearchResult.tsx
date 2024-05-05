import { Item } from '@/utils/types';

const SearchResult = ({ item, border }: { item: Item; border: boolean }) => {
	return (
		<div
			className={`flex justify-between items-center py-4 px-3 hover:bg-gray-100 border-0 ${border ? 'border-b-2' : ''} `}
		>
			<p className="capitalize">{item.name}</p>
			<p className="text-gray-500">{item.category.name}</p>
		</div>
	);
};

export default SearchResult;
