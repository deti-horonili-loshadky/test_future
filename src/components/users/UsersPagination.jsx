function onPageClick(index, setPaginationState) {
	setPaginationState(index);
}

function UserPaginationButton(props) {
	const { index, paginationState, setPaginationState } = props;
	const isActive = index === paginationState;
	if (isActive) {
		return (
			<button className="userTablePage userTablePage-active">
				{index + 1}
			</button>
		);
	}
	return (
		<button className="userTablePage" onClick={() => onPageClick(index, setPaginationState)}>
			{index + 1}
		</button>
	);
}

function UserPagination(props) {
	const { paginationState, setPaginationState, pageCount } = props;
	const buttons = [];
	for (let index = 0; index < pageCount; index += 1) {
		buttons.push(<UserPaginationButton index={index} paginationState={paginationState} setPaginationState={setPaginationState} />)
	}
	return (
		<div className="userTablePagination">
			{buttons}
		</div>
	);
}

export default UserPagination;