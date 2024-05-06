'use client';

import { useList } from '@/providers/ListContext';
import { useSession } from 'next-auth/react';

import Icon from '../Icon/Icon';

const FestivalName = () => {
	const { dispatch, state } = useList();
	const { data: session } = useSession();

	return (
		<div className="relative w-full max-w-sm">
			<input
				className="w-full py-2 pr-9 border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
				type="text"
				placeholder="New Festival"
				value={state.festivalName}
				onChange={(e) =>
					dispatch({ type: 'SET_FESTIVAL_NAME', payload: e.target.value })
				}
			/>

			{session && state.festivalName.trim() && !state.festivalId && (
				<button className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 pr-2">
					<Icon name="FaFloppyDisk" size={20} />
					<span className="sr-only">Save List</span>
				</button>
			)}
		</div>
	);
};

export default FestivalName;
