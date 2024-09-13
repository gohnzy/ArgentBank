import { useDispatch, useSelector } from 'react-redux';
import { toggleUpdateForm, updateName } from './updateNameSlice';

export const UpdateName = ({ className }) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const data = user.user;

	const form = document.querySelector('form');

	const submitChanges = event => {
		event.preventDefault();
		const firstName = event.currentTarget.firstNameUpdate?.value;
		const lastName = event.currentTarget.lastNameUpdate?.value;

		const changes = {
			firstName: firstName,
			lastName: lastName,
		};

		if (firstName.length > 0 && lastName.length > 0)
			dispatch(updateName(changes)).then(action => {
				if (updateName.fulfilled.match(action)) {
					dispatch(toggleUpdateForm());
					form.reset();
				}
			});
	};

	const cancelUpdate = event => {
		event.preventDefault();
		dispatch(toggleUpdateForm());
		form.reset();
	};
	return (
		<div id="updateName" className={className}>
			<form action="" id="updateNameForm" onSubmit={submitChanges}>
				<div id="fieldsDiv">
					<input
						type="text"
						name="firstNameUpdate"
						placeholder={data.firstName}
					/>
					<input
						type="text"
						name="lastNameUpdate"
						placeholder={data.lastName}
					/>
				</div>
				<div id="buttonsDiv">
					<input type="submit" id="submitUpdates" value="Sauvegarder" />
					<button id="cancelUpdate" onClick={cancelUpdate}>
						Annuler
					</button>
				</div>
			</form>
		</div>
	);
};
