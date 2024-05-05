import { useList } from '@/providers/ListContext';
import { Item } from '@/utils/types';

import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';

const PackingListItem = ({ item }: { item: Item }) => {
	const { dispatch } = useList();

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Checkbox
					onChange={() =>
						dispatch({
							type: 'TOGGLE_ITEM_OBTAINED',
							payload: { _id: item._id },
						})
					}
				/>
				<span className="capitalize">{item.name}</span>
			</div>
			<Icon name="FaTrashCan" size={20} />
		</div>
	);
};

export default PackingListItem;
