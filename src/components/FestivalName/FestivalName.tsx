'use client';

import { useList } from '@/providers/ListContext';

const FestivalName = () => {
	const { dispatch } = useList();

	return (
		<input
			className="py-2 border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
			type="text"
			placeholder="New Festival"
			onChange={(e) =>
				dispatch({ type: 'SET_FESTIVAL_NAME', payload: e.target.value })
			}
		/>
	);
};

export default FestivalName;
