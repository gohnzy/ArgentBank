const state = {};

const reducer = (currentState, action) => {
	const newState = [...currentState, { ...action.payload }];
	return { ...currentState, ...newState };
};

const store = window.RTK.configureStore({
	state,
	reducer,
});

store.subscribe(() => {
	const state = store.getState();
	console.log(state);
});

store.dispatch({});
