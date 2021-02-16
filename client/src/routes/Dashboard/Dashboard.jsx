import { useAuthContext } from "../../providers";

//Components
import { AddApp, AppsTable } from "../../components";

//Style
import "./style.scss";

const Dashboard = () => {
  const { setIsLoggedIn } = useAuthContext();

  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
        تسجيل الخروج
      </button>
      <AddApp />
      <AppsTable />
    </div>
  );
};

export default Dashboard;
