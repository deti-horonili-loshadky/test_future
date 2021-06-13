function UserInfo(props) {
	const { infoState } = props;
	return (
		<div className="userInfo">
			<div className="userInfoTable">
				Выбран пользователь <b>{infoState.firstName} {infoState.lastName}</b>
			</div>
			<div className="userInfoTable">
				Описание:
				<textarea className="userInfoText" defaultValue={infoState.description} />
			</div>
			<div className="userInfoTable">
				Адрес проживания: <b>{infoState.address.streetAddress}</b>
			</div>
			<div className="userInfoTable">
				Город: <b>{infoState.address.city}</b>
			</div>
			<div className="userInfoTable">
				Провинция/штат: <b>{infoState.address.state}</b>
			</div>
			<div className="userInfoTable">
				Индекс: <b> {infoState.address.zip}</b>
			</div>
		</div>
	)
}

export default UserInfo;