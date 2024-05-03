'use client';

import { useList } from '@/providers/ListContext';

import SearchBar from '../SearchBar/SearchBar';
import TextInput from '../TextInput/TextInput';

const ListHeader = () => {
	const { dispatch } = useList();
	return (
		<header className="grid grid-cols-2 gap-6 py-4 overflow-hidden">
			<TextInput
				onChange={(name) =>
					dispatch({ type: 'SET_FESTIVAL_NAME', payload: name })
				}
				placeholder="New Festival"
			/>
			<SearchBar />
		</header>
	);
};

export default ListHeader;
