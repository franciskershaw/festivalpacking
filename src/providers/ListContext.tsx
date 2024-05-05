'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';

import { Item } from '@/utils/types';

// Types
type ListState = {
	festivalName: string;
	items: Item[];
};
type Action =
	| {
			type: 'SET_FESTIVAL_NAME';
			payload: string;
	  }
	| { type: 'ADD_ITEM'; payload: Item };

// Initial state
const initialState: ListState = {
	festivalName: '',
	items: [],
};

// Create context
const ListContext = createContext<{
	state: ListState;
	dispatch: React.Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => null,
});

// Reducer
function listReducer(state: ListState, action: Action): ListState {
	switch (action.type) {
		case 'SET_FESTIVAL_NAME':
			return { ...state, festivalName: action.payload };
		case 'ADD_ITEM':
			return { ...state, items: [...state.items, action.payload] };
		default:
			return state;
	}
}

// Provider
export const ListProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(listReducer, initialState);

	useEffect(() => {
		console.log('context state', state);
	}, [state]);

	return (
		<ListContext.Provider value={{ state, dispatch }}>
			{children}
		</ListContext.Provider>
	);
};

// Hook
export const useList = () => useContext(ListContext);

export default ListContext;
