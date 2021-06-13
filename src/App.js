import { useState, Fragment } from "react";
import './App.css';
import { loadBigData, loadSmallData } from "./components/api/api";
import Loading from "./components/loading/Loading";
import Users from "./components/users/Users";
import Error from "./components/error/Error";

function onClick(isBigData, setUserDataState, setAppLoadingState, setAppErrorState) {
  fetchData(isBigData, setUserDataState, setAppLoadingState)
    .catch((error) => onError(error, setAppErrorState));
}

function onError(error, setAppErrorState) {
  setAppErrorState(true);
}

async function fetchData(isBigData, setUserDataState, setAppLoadingState) {
  setAppLoadingState(true);
  const userData = isBigData ? await loadBigData() : await loadSmallData();
  setUserDataState(userData);
  setAppLoadingState(false);
}

function addData(data, appUserDataState, setUserDataState) {
  const currentUserData = [...appUserDataState];
  currentUserData.unshift(data);
  setUserDataState(currentUserData);
}

const AppTable = (props) => {
  const { appUserDataState, setAppLoadingState, setUserDataState, setAppErrorState } = props;
  return (
    <Fragment>
      <button onClick={() => onClick(false, setUserDataState, setAppLoadingState, setAppErrorState)}>Загрузить мало данных</button>
      <button onClick={() => onClick(true, setUserDataState, setAppLoadingState, setAppErrorState)}>Загрузить много данных</button>
      <Users userData={appUserDataState} addData={(data) => addData(data, appUserDataState, setUserDataState)} />
    </Fragment>
  );
}

const App = () => {
  const [appLoadingState, setAppLoadingState] = useState(false);
  const [appErrorState, setAppErrorState] = useState(false);
  const [appUserDataState, setUserDataState] = useState([]);

  if (appErrorState) return <Error />
  if (appLoadingState) return <Loading />;
  return <AppTable appUserDataState={appUserDataState} setAppLoadingState={setAppLoadingState} setUserDataState={setUserDataState} setAppErrorState={setAppErrorState} />;
}

export default App;