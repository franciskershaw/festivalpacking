'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';

type ListState = {
	festivalName: string;
};

// Initial state
const initialState: ListState = {
	festivalName: '',
};

// Actions
type Action = { type: 'SET_FESTIVAL_NAME'; payload: string };

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
		default:
			return state;
	}
}

// Context Provider
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

export const useList = () => useContext(ListContext);

export default ListContext;
