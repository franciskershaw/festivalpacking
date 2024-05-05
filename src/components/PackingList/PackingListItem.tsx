import { Item } from '@/utils/types';

import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';

const PackingListItem = ({ item }: { item: Item }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Checkbox />
				<span className="capitalize">{item.name}</span>
			</div>
			<Icon name="FaTrashCan" size={20} />
		</div>
	);
};

export default PackingListItem;
