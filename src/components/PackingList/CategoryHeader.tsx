import { Category } from '@/utils/types';

import Icon from '../Icon/Icon';

const CategoryHeader = ({ category }: { category: Category }) => {
	return (
		<div className="flex items-center gap-4 cursor-default">
			<Icon name={category.faIcon} size={20} />
			<span className="text-lg font-bold border-0 border-b cursor-text md:text-xl">
				{category.name}
			</span>
		</div>
	);
};

export default CategoryHeader;
