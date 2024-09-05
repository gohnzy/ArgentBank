import { configureStore } from '@reduxjs/toolkit';

const state = {
	value: null,
	user: ['user 1', 'user 2'],
};

const reducer = (currentState, action) => {
	const newState = [...currentState.user, { ...action.payload }];
	return { ...currentState.user, ...newState };
};

export const store = configureStore({
	preloadedState: state,
	reducer,
});
