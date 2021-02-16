import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { IoMdNotifications } from "react-icons/io";
import { IoClose } from "react-icons/io5";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import DeleteImage from "../../../assets/img/delete.svg";
// @ts-ignore
import EditImage from "../../../assets/img/edit.svg";

const TableRow = ({
  _id = 1,
  name = "موعد الرواتب",
  pushTokens = [],
  onChange = ({ _id }) => null,
  onDelete = (_id) => null,
}) => {
  const [editBoxVisible, setEditBoxVisible] = useState(false);
  const [deleteBoxVisible, setDeleteBoxVisible] = useState(false);
  const [notificationBoxVisible, setNotificationBoxVisible] = useState(false);
  const [appName, setAppName] = useState(name);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const editAppBoxRef = useRef(null);
  const deleteAppBoxRef = useRef(null);
  const notificationBoxRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mouseup", containerHandler);

    return () => {
      window.removeEventListener("mouseup", containerHandler);
    };
  });

  const containerHandler = (e) => {
    e.preventDefault();

    if (editAppBoxRef.current && !editAppBoxRef.current.contains(e.target)) {
      setEditBoxVisible(false);
    }
    if (
      deleteAppBoxRef.current &&
      !deleteAppBoxRef.current.contains(e.target)
    ) {
      setDeleteBoxVisible(false);
    }
    if (
      notificationBoxRef.current &&
      !notificationBoxRef.current.contains(e.target)
    ) {
      setNotificationBoxVisible(false);
    }
  };

  const editApp = async () => {
    try {
      let response = await axios.post("/editApp", { _id, name: appName });
      let data = await response.data;

      if (!data.status) {
        return alert(data.errors);
      }

      alert(data.messages);
      setEditBoxVisible(false);
      setAppName(data.app.name);
      onChange(data.app);
    } catch (e) {
      alert(e.message);
    }
  };

  const deleteApp = async () => {
    try {
      let response = await axios.post("/deleteApp", { _id });
      let data = await response.data;

      if (!data.status) {
        return alert(data.errors);
      }

      alert(data.messages);
      setDeleteBoxVisible(false);
      onDelete(_id);
    } catch (e) {
      alert(e.message);
    }
  };

  const sendNotification = async () => {
    try {
      let response = await axios.post("/sendNotification", {
        _id,
        title,
        body,
      });
      let data = await response.data;

      if (!data.status) {
        return alert(data.errors);
      }

      alert(data.messages);
      setNotificationBoxVisible(false);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <tr className="table-row-container">
      <td>{_id}</td>
      <td>{name}</td>
      <td>{pushTokens.length}</td>
      <td>
        <img
          className="icon-img"
          src={DeleteImage}
          onClick={() => setDeleteBoxVisible(true)}
        />
        <img
          className="icon-img edit-icon"
          src={EditImage}
          onClick={() => setEditBoxVisible(true)}
        />
        <button
          className="notify-btn"
          onClick={() => setNotificationBoxVisible(true)}
        >
          <p>اشعار جديد</p>
          <IoMdNotifications className="notification-icon" />
        </button>
        {editBoxVisible && (
          <div className="editapp-box-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="editapp-box" ref={editAppBoxRef}>
                <IoClose
                  className="close-icon"
                  onClick={() => setEditBoxVisible(false)}
                />
                <input
                  className="input-box"
                  placeholder="اسم التطبيق"
                  onChange={(e) => setAppName(e.target.value)}
                  value={appName}
                />
                <button
                  type="submit"
                  className="submit-btn"
                  onClick={() => editApp()}
                >
                  تعديل التطبيق
                </button>
              </div>
            </form>
          </div>
        )}
        {deleteBoxVisible && (
          <div className="deleteapp-box-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="deleteapp-box" ref={deleteAppBoxRef}>
                <IoClose
                  className="close-icon"
                  onClick={() => setDeleteBoxVisible(false)}
                />
                <p>هل أنت متأكد من أنك تريد حذف التطبيق</p>
                <h2>{name}</h2>
                <div className="action-btns">
                  <button className="submit-btn" onClick={() => deleteApp()}>
                    نعم
                  </button>
                  <button
                    className="submit-btn no-btn"
                    onClick={() => setDeleteBoxVisible(false)}
                  >
                    لا
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {notificationBoxVisible && (
          <div className="notification-box-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="notification-box" ref={notificationBoxRef}>
                <IoClose
                  className="close-icon"
                  onClick={() => setNotificationBoxVisible(false)}
                />
                <h2>{name}</h2>
                <input
                  placeholder="عنوان الإشعار"
                  className="input-box"
                  maxLength={65}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="محتوي الإشعار"
                  className="input-box"
                  maxLength={4000}
                  style={{ height: 200 }}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <span className="notice-txt">حد أقصي 4000 حرف</span>
                <button
                  className="submit-btn"
                  onClick={() =>
                    pushTokens.length == 0
                      ? alert("لا يوجد مستخدمين مسجلين لإرسال اشعارت بعد")
                      : sendNotification()
                  }
                >
                  ارسال الي {pushTokens.length} مستخدم
                </button>
              </div>
            </form>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
