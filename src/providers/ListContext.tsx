'use client';

import {
	Dispatch,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react';

import { Item, List } from '@/utils/types';

// Types
type ListState = {
	festivalName: string;
	items: Item[];
	festivalId: string;
};
type Action =
	| {
			type: 'SET_FESTIVAL_NAME';
			payload: string;
	  }
	| {
			type: 'ADD_ITEM';
			payload: Item;
	  }
	| {
			type: 'REMOVE_ITEM';
			payload: string;
	  }
	| {
			type: 'TOGGLE_ITEM_OBTAINED';
			payload: string;
	  }
	| {
			type: 'SET_LIST_ID';
			payload: string;
	  }
	| {
			type: 'SET_LIST';
			payload: List;
	  };

// Initial state
const initialState: ListState = {
	festivalName: '',
	items: [],
	festivalId: '',
};

// Create context
const ListContext = createContext<{
	state: ListState;
	dispatch: Dispatch<Action>;
	setList: (list: List) => void;
}>({
	state: initialState,
	dispatch: () => null,
	setList: () => null,
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
		case 'REMOVE_ITEM':
			return {
				...state,
				items: state.items.filter((item) => item._id !== action.payload),
			};
		case 'TOGGLE_ITEM_OBTAINED':
			return {
				...state,
				items: state.items.map((item) =>
					item._id === action.payload
						? { ...item, obtained: !item.obtained }
						: item,
				),
			};
		case 'SET_LIST_ID':
			return { ...state, festivalId: action.payload };
		case 'SET_LIST':
			return {
				festivalName: action.payload.name,
				items: action.payload.items,
				festivalId: action.payload._id,
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

	const setList = (list: List) => {
		dispatch({ type: 'SET_LIST', payload: list });
	};

	return (
		<ListContext.Provider value={{ state, dispatch, setList }}>
			{children}
		</ListContext.Provider>
	);
};

// Hook
export const useList = () => useContext(ListContext);

export default ListContext;
