import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateUserCall } from '../calls/calls';
export const updateName = createAsyncThunk(
	'profile/updateUser',
	async (newdata, { rejectWithValue }) => {
		try {
			const response = await UpdateUserCall(newdata);

			return response;
		} catch (error) {
			return rejectWithValue('Update failed');
		}
	},
);

const updateNameSlice = createSlice({
	name: 'update',
	initialState: {
		status: 'idle',
		error: null,
		formState: 'closed',
	},
	reducers: {
		toggleUpdateForm(state) {
			state.formState === 'closed'
				? (state.formState = 'opened')
				: (state.formState = 'closed');
		},
	},
	extraReducers: builder => {
		builder
			.addCase(updateName.pending, state => {
				state.status = 'loading';
			})
			.addCase(updateName.fulfilled, (state, action) => {
				state.status = 'succeeded';
			})
			.addCase(updateName.rejected, state => {
				state.status = 'rejected';
			});
	},
});

export const { toggleUpdateForm } = updateNameSlice.actions;
export default updateNameSlice.reducer;
