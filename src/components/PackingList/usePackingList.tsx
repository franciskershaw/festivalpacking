import { useMemo } from 'react';

import { useList } from '@/providers/ListContext';
import { Item } from '@/utils/types';

import { IconName } from '../Icon/Icon';

const usePackingList = () => {
	const { state } = useList();

	const categorisedItems = useMemo(() => {
		const grouped = state?.items?.reduce(
			(acc, item) => {
				const category = item.category;

				if (!acc[category?._id]) {
					acc[category?._id] = {
						_id: category?._id,
						name: category?.name,
						faIcon: category?.faIcon,
						items: [],
					};
				}

				acc[category?._id].items.push(item);
				return acc;
			},
			{} as Record<
				string,
				{ _id: string; name: string; faIcon: IconName; items: Item[] }
			>,
		);

		return Object.values(grouped).map((category) => {
			category?.items?.sort((a, b) => a?.name?.localeCompare(b?.name));
			return category;
		});
	}, [state.items]);

	return { categorisedItems };
};

export default usePackingList;
