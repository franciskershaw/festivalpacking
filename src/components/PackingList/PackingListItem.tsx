import { useList } from '@/providers/ListContext';
import { removeItemFromList } from '@/server/lists';
import { Item } from '@/utils/types';

import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';

const PackingListItem = ({ item }: { item: Item }) => {
	const { dispatch, state } = useList();

	const onRemoveItem = async () => {
		dispatch({ type: 'REMOVE_ITEM', payload: item._id });

		if (state.festivalId)
			await removeItemFromList({ itemId: item._id, listId: state.festivalId });
	};

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
					checkedByDefault={item.obtained}
				/>
				<span className="capitalize">{item.name}</span>
			</div>
			<button onClick={onRemoveItem}>
				<Icon name="FaTrashCan" size={20} />
			</button>
		</div>
	);
};

export default PackingListItem;
