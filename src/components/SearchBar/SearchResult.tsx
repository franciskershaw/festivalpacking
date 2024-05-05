import { Item } from '@/utils/types';

import Icon from '../Icon/Icon';

const SearchResult = ({ item, border }: { item: Item; border: boolean }) => {
	return (
		<div
			className={`flex justify-between items-center py-5 px-3 hover:bg-gray-100 border-0 ${border ? 'border-b-2' : ''} `}
			role="button"
			tabIndex={0}
		>
			<p className="capitalize">{item.name}</p>
			<div className="flex items-center gap-4">
				<p className="text-gray-500">{item.category.name}</p>
				<Icon name={item.category.faIcon} size={20} />
			</div>
		</div>
	);
};

export default SearchResult;
