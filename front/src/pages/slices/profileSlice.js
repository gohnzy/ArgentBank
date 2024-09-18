// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserDataCall } from '../../calls/calls'; // appel API pour récupérer les données utilisateur
import { updateName } from '../../features/updateNameSlice';

// Thunk pour récupérer les données de l'utilisateur
export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, { getState, rejectWithValue }) => {
		const token = localStorage.getItem('token');

		if (!token) {
			return rejectWithValue('No token found');
		}

		try {
			const response = await UserDataCall(token);

			return response;
		} catch (error) {
			return rejectWithValue('Failed to fetch user data');
		}
	},
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		resetUser: state => {
			state.user = null;
			state.status = 'idle';
			state.error = null;
			localStorage.clear();
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload; // Mettre à jour les informations de l'utilisateur
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(updateName.fulfilled, (state, action) => {
				state.user = action.payload.body; // Met à jour l'utilisateur avec la réponse
			});
	},
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
