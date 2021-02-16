import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuthContext } from "./providers";

//Style
import "./style.scss";

//Screens
import { Login, Dashboard } from "./routes";

const App = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Switch>
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" component={Dashboard} />
              <Redirect to="/dashboard" />
            </>
          ) : (
            <>
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
