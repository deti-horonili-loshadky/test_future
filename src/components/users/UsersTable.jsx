function onClick(setTableState, tableState, key) {
	setTableState({ ...tableState, [key]: !tableState[key] });
}

function UserTableHeadCol(props) {
	const { id, text, setTableState, tableState } = props;
	const arrow = tableState[id] ? '▲' : '▼'
	return (
		<th onClick={() => { onClick(setTableState, tableState, id) }}>
			{text}
			{arrow}
		</th>
	)
}

function UserTableHead(props) {
	const { setTableState, tableState } = props;

	return (
		<thead>
			<tr>
				<UserTableHeadCol tableState={tableState} setTableState={setTableState} id="id" text="Id" />
				<UserTableHeadCol tableState={tableState} setTableState={setTableState} id="firstName" text="First Name" />
				<UserTableHeadCol tableState={tableState} setTableState={setTableState} id="lastName" text="Last Name" />
				<UserTableHeadCol tableState={tableState} setTableState={setTableState} id="email" text="Email" />
				<UserTableHeadCol tableState={tableState} setTableState={setTableState} id="phone" text="Phone" />
			</tr>
		</thead>
	)
}

function onUserClick(data) {
	data.setInfoState({
		id: data.id,
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		phone: data.phone,
		address: data.address,
		description: data.description,
	})
}

function User(props) {
	return (
		<tr key={props.id} onClick={() => onUserClick(props)}>
			<td>{props.id}</td>
			<td>{props.firstName}</td>
			<td>{props.lastName}</td>
			<td>{props.email}</td>
			<td>{props.phone}</td>
		</tr>
	)
}

function UserTableBody(props) {
	const { userData, setInfoState } = props;

	return (
		<tbody>
			{
				userData
					.map((user, index) => <User {...user} setInfoState={setInfoState} key={`key-${index}`} />)
			}
		</tbody>
	)
}

function UserTable(props) {
	const { tableState, setTableState, userDataState, setInfoState } = props;
	return (
		<table>
			<UserTableHead tableState={tableState} setTableState={setTableState} />
			<UserTableBody userData={userDataState} setInfoState={setInfoState} />
		</table>
	);
}

export default UserTable;
