import { useState, useEffect, Fragment } from "react";
import UsersPagination from "./UsersPagination";
import UsersFilter from "./UsersFilter";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";
import UserInfo from "./UserInfo";

const PAGINATION_MAX = 50;

function UsersEmpty() {
	return <p>Нет данных.</p>;
}

function sortUsersASC(comp1, comp2) {
	if (comp1 < comp2) return -1;
	if (comp1 > comp2) return 1;
	return 0;
}

function sortUsersDESC(comp1, comp2) {
	if (comp1 < comp2) return 1;
	if (comp1 > comp2) return -1;
	return 0;
}

function sortUsers(user1, user2, tableState) {
	const keys = Object.keys(user1);
	let index = 0;
	let result = 0;
	while (result === 0 && index < keys.length) {
		const key = keys[index];
		if (tableState[key]) result = sortUsersASC(user1[key], user2[key]);
		else result = sortUsersDESC(user1[key], user2[key]);
		index += 1;
	}
	return result;
}

function filterValue(value, filterData) {
	return `${value}`.toLowerCase().includes(filterData);
}

function filterUsers(user, filterData) {
	return Object.values(user).some((value) => filterValue(value, filterData));
}

function processData(data, tableState, page, filterData) {
	const start = page * PAGINATION_MAX;
	const end = start + PAGINATION_MAX;
	if (!filterData) {
		return [...data]
			.sort((user1, user2) => sortUsers(user1, user2, tableState))
			.slice(start, end);
	}
	return [...data]
		.sort((user1, user2) => sortUsers(user1, user2, tableState))
		.slice(start, end)
		.filter((user) => filterUsers(user, filterData));
}

function UserData(props) {
	const { userData, addData } = props;
	const pageCount = Math.ceil(userData.length / PAGINATION_MAX);
	const shouldShowPagination = pageCount > 1;

	const [tableState, setTableState] = useState(
		{
			"id": true,
			"firstName": true,
			"lastName": true,
			"email": true,
			"phone": true,
		}
	);
	const [paginationState, setPaginationState] = useState(0);
	const [filterState, setFilterState] = useState('');

	const initial = processData(userData, tableState, paginationState, filterState);
	const [userDataState, setUserDataState] = useState(initial);
	const [infoState, setInfoState] = useState(null);

	useEffect(() => {
		const data = processData(userData, tableState, paginationState, filterState);
		setUserDataState(data);
	}, [userData, tableState, paginationState, filterState]);

	return (
		<Fragment>
			<UsersFilter filterState={filterState} setFilterState={setFilterState} />
			<UsersForm addData={addData} />
			<UsersTable setInfoState={setInfoState} tableState={tableState} setTableState={setTableState} userDataState={userDataState} />
			{shouldShowPagination && <UsersPagination userCount={userData.length} paginationState={paginationState} setPaginationState={setPaginationState} pageCount={pageCount} />}
			{infoState !== null && <UserInfo infoState={infoState} />}
		</Fragment>
	)
}

function Users(props) {
	const { userData, addData } = props
	const isDataEmpty = !userData || userData.length === 0;

	if (isDataEmpty) return <UsersEmpty />
	return <UserData userData={userData} addData={addData} />
}

export default Users;