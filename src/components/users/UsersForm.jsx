import { useState } from "react";

function onShowFormClick(formStatusState, setFormStatusState) {
	setFormStatusState(!formStatusState)
}

function clearForm(setFormDataState) {
	setFormDataState({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	});
}

function onSubmit(event, addData, formDataState, setFormDataState) {
	event.preventDefault();
	addData(formDataState);
	clearForm(setFormDataState);
}

function validateID(value) {
	return /^[0-9]+$/.test(value);
}

function validateName(value) {
	return /^[a-zA-Zа-яА-Я]+$/.test(value);
}

function validateEmail(value) {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

function validatePhone(value) {
	return /\(\d{3}\)\d{3}-\d{4}/.test(value);
}

function validateValue(value, key) {
	switch (key) {
		case 'id':
			return validateID(value);
		case 'firstName':
		case 'lastName':
			return validateName(value);
		case 'email':
			return validateEmail(value);
		default:
			return validatePhone(value);
	}
}

function onChange(event, key, formDataState, setFormDataState, validationDataState, setValidationDataState) {
	const data = { ...formDataState, [key]: event.target.value };
	const validationData = { ...validationDataState, [key]: validateValue(event.target.value, key) }
	setFormDataState(data);
	setValidationDataState(validationData);
}

function UsersFormFields(props) {
	const { addData, formDataState, setFormDataState, validationDataState, setValidationDataState } = props;

	return (
		<form className="userAdd" onSubmit={(event) => onSubmit(event, addData, formDataState, setFormDataState)}>
			<div className="userFormRow">
				<label className="userFormLabel" htmlFor="id">Id</label>
				<input className='usersForm' name='id' id='id' value={formDataState.id} onChange={(event) => onChange(event, 'id', formDataState, setFormDataState, validationDataState, setValidationDataState)} />
			</div>
			<div className="userFormRow">
				<label className="userFormLabel" htmlFor="firstName">First Name</label>
				<input className='usersForm' name='firstName' id='firstName' value={formDataState.firstName} onChange={(event) => onChange(event, 'firstName', formDataState, setFormDataState, validationDataState, setValidationDataState)} />
			</div>
			<div className="userFormRow">
				<label className="userFormLabel" htmlFor="lastName">Last Name</label>
				<input className='usersForm' name='lastName' id='lastName' value={formDataState.lastName} onChange={(event) => onChange(event, 'lastName', formDataState, setFormDataState, validationDataState, setValidationDataState)} />
			</div>
			<div className="userFormRow">
				<label className="userFormLabel" htmlFor="email">Email</label>
				<input className='usersForm' name='email' id='email' value={formDataState.email} onChange={(event) => onChange(event, 'email', formDataState, setFormDataState, validationDataState, setValidationDataState)} />
			</div>
			<div className="userFormRow">
				<label className="userFormLabel" htmlFor="phone">Phone</label>
				<input className='usersForm' name='phone' id='phone' value={formDataState.phone} onChange={(event) => onChange(event, 'phone', formDataState, setFormDataState, validationDataState, setValidationDataState)} />
			</div>
			<button className="userFormSubmit" disabled={Object.values(validationDataState).some(status => !status)}>Добавить в таблицу</button>
		</form>
	);
}

function UsersForm(props) {
	const { addData } = props;

	const [formStatusState, setFormStatusState] = useState(false);

	const [formDataState, setFormDataState] = useState({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	});

	const [validationDataState, setValidationDataState] = useState({
		id: false,
		firstName: false,
		lastName: false,
		email: false,
		phone: false,
	});

	return (
		<div>
			<button className='userFormToggle' onClick={() => onShowFormClick(formStatusState, setFormStatusState)}>Добавить</button>
			{formStatusState && <UsersFormFields addData={addData} formDataState={formDataState} setFormDataState={setFormDataState} validationDataState={validationDataState} setValidationDataState={setValidationDataState} />}
		</div>
	)
}

export default UsersForm;