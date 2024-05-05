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
							payload: item._id,
						})
					}
				/>
				<span className="capitalize">{item.name}</span>
			</div>
			<button
				onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item._id })}
			>
				<Icon name="FaTrashCan" size={20} />
			</button>
		</div>
	);
};

export default PackingListItem;
