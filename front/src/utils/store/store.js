import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../pages/slices/loginSlice';
import userReducer from '../../pages/slices/profileSlice';
import updateReducer from '../../features/updateNameSlice';

const store = configureStore({
	preloadedState: {},
	reducer: {
		login: loginReducer,
		user: userReducer,
		update: updateReducer,
	},
});

export default store;
