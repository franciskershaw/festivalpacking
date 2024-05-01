'use client';

import { useList } from '@/providers/ListContext';

import TextInput from '../TextInput/TextInput';

const ListHeader = () => {
	const { dispatch } = useList();
	return (
		<header className="flex justify-between items-center py-8">
			<TextInput
				onChange={(name) =>
					dispatch({ type: 'SET_FESTIVAL_NAME', payload: name })
				}
				placeholder="New Festival"
			/>
			{/* <p>Search bar</p> */}
		</header>
	);
};

export default ListHeader;
