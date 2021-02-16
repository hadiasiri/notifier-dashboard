import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../providers";

//Components
import { LoginForm } from "../../components";

const Login = () => {
  const { isLoggedIn } = useAuthContext();


  return (
    <div>
      {isLoggedIn && <Redirect to="/dashboard" />}
      <LoginForm />
    </div>
  );
};

export default Login;
