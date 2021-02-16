import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

//Style
import "./style.scss";

const AddApp = () => {
  const [addBoxVisible, setAddBoxVisible] = useState(false);
  const [appName, setAppName] = useState("");

  const addAppBoxRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mouseup", containerHandler);

    return () => {
      window.removeEventListener("mouseup", containerHandler);
    };
  });

  const containerHandler = (e) => {
    e.preventDefault();

    if (addAppBoxRef.current && !addAppBoxRef.current.contains(e.target)) {
      setAddBoxVisible(false);
    }
  };

  const addApp = async () => {
    try {
      let response = await axios.post("/addApp", { name: appName });
      let data = await response.data;

      if (!data.status) {
        return alert(data.errors);
      }

      alert(data.messages);
      setAddBoxVisible(false);
      setAppName("");
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="addapp-container">
      <button className="addapp-btn" onClick={() => setAddBoxVisible(true)}>
        <p>تطبيق جديد</p>
        <FiPlus className="plus-icon" />
      </button>
      {addBoxVisible && (
        <div className="addapp-box-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="addapp-box" ref={addAppBoxRef}>
              <IoClose
                className="close-icon"
                onClick={() => setAddBoxVisible(false)}
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
                onClick={() => addApp()}
              >
                اضافة التطبيق
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddApp;
