'use client';

import {
	Dispatch,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react';

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
	| { type: 'ADD_ITEM'; payload: Item }
	| {
			type: 'TOGGLE_ITEM_OBTAINED';
			payload: { _id: string };
	  };

// Initial state
const initialState: ListState = {
	festivalName: '',
	items: [],
};

// Create context
const ListContext = createContext<{
	state: ListState;
	dispatch: Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => null,
});

// Reducer
function listReducer(state: ListState, action: Action): ListState {
	switch (action.type) {
		case 'SET_FESTIVAL_NAME':
			return { ...state, festivalName: action.payload };
		case 'ADD_ITEM': {
			const newItem: Item = {
				...action.payload,
				obtained: action.payload.obtained ?? false,
			};
			return { ...state, items: [...state.items, newItem] };
		}
		case 'TOGGLE_ITEM_OBTAINED':
			return {
				...state,
				items: state.items.map((item) =>
					item._id === action.payload._id
						? { ...item, obtained: !item.obtained }
						: item,
				),
			};
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
