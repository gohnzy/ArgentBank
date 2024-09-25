// src/store/loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCall } from '../../calls/calls'; // appel API pour login

// Thunk pour gérer la connexion asynchrone
export const loginUser = createAsyncThunk(
	'login/loginUser',
	async (loginRequestBody, { rejectWithValue }) => {
		try {
			const response = await LoginCall(loginRequestBody);
			console.log(response);

			localStorage.setItem('token', response.body.token);
			// localStorage.setItem('user', response.body.email)

			return response;
		} catch (error) {
			return rejectWithValue('Login failed');
		}
	},
);

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		isAuthenticated: false,
		status: 'idle',
		error: null,
	},
	reducers: {
		logout(state) {
			state.isAuthenticated = false;
			state.status = 'idle';
			state.user = null;
			localStorage.removeItem('token');
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.pending, state => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.meta.arg.email;
				state.isAuthenticated = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
