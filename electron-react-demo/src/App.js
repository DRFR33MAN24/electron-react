import logo from "./logo.svg";
import "./App.css";
import { withRouter } from "./withRouter";
import { useNavigate, Outlet } from "react-router";
import { Provider } from 'react-redux'
import store from './store'
import TitleBar from "./Components/TitleBar";
import { useEffect } from "react";

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/Login");
  }, []);

  return (
    <Provider store={store}>
      <div className="App ">
        {/* <TitleBar /> */}
        <Outlet />
      </div>
    </Provider>
  );
}

export default withRouter(App);
