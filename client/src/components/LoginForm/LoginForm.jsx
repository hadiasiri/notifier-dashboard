import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../providers";
import { useHistory } from "react-router-dom";

//Styles
import "./style.scss";

//Assets
// @ts-ignore
import LockImage from "../../assets/img/lock.svg";
// @ts-ignore
import ProfileImage from "../../assets/img/profile.svg";

const LoginForm = () => {
  const history = useHistory();
  const { setIsLoggedIn } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async ({ username, password }) => {
    try {
      if (!username || !password) {
        return alert("يجب كتابة اسم المستخدم وكلمة المرور");
      }

      const response = await axios.post("/login", {
        username,
        password,
      });
      const data = await response.data;

      if (!data.status) {
        return alert(data.errors);
      }

      setIsLoggedIn(true);
      history.push("/dashboard");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="head">
          <h2>تسجيل الدخول</h2>
        </div>
        <form method="POST" onSubmit={(e) => e.preventDefault()}>
          <div className="content">
            <div className="input-items">
              <div className="input-item">
                <img src={ProfileImage} alt="user" />
                <input
                  type="text"
                  name="user"
                  placeholder="اسم المستخدم"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-item">
                <img src={LockImage} alt="Lock" />
                <input
                  type="password"
                  name="pass"
                  placeholder="كلمة المرور"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-item">
                <button
                  className="btn-login"
                  type="submit"
                  onClick={() => login({ username, password })}
                >
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
