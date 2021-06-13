import { useState } from "react";

function onFilterClick(localFilterState, setFilterState) {
	setFilterState(localFilterState);
}

function onChange(event, setLocalFilterState) {
	setLocalFilterState(event.target.value.toLowerCase());
}

function UsersFilter(props) {
	const { setFilterState } = props;

	const [localFilterState, setLocalFilterState] = useState('');

	return (
		<div className="userFilter">
			<input className='inputField' onChange={(event) => { onChange(event, setLocalFilterState) }} />
			<button className='button' onClick={() => { onFilterClick(localFilterState, setFilterState) }}>
				Найти
			</button>
		</div>
	);
}

export default UsersFilter;
