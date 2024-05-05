import { Category } from '@/utils/types';

import Icon from '../Icon/Icon';

const CategoryHeader = ({ category }: { category: Category }) => {
	return (
		<div className="flex items-center gap-4">
			<Icon name={category.faIcon} size={20} />
			<span>{category.name}</span>
		</div>
	);
};

export default CategoryHeader;
