import { useState, useEffect } from "react";
import axios from "axios";

//Components
import TableRow from "./TableRow/TableRow";

//Style
import "./style.scss";

const AppsTable = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getApps();
  }, []);

  const getApps = async () => {
    try {
      let response = await axios.post("/getApps");
      let data = await response.data;

      if (!data.status) {
        alert(data.errors);
      }

      setApps(data.apps);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="apps-table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>اسم التطبيق</th>
            <th>عدد المستخدمين</th>
            <th>الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {apps &&
            apps.length != 0 &&
            apps.map((item, i) => (
              <TableRow
                key={i}
                {...item}
                onChange={(newApp) => {
                  setApps(
                    apps.map((app) => (app._id == newApp._id ? newApp : app))
                  );
                }}
                onDelete={(_id) => {
                  setApps(apps.filter((app) => app._id != _id));
                }}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppsTable;
