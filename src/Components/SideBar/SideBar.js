import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ onSidebarItemClick }) => {
  // const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('dashboard');

  const handleButtonClick = (section) => {
    setActiveButton(section);
    onSidebarItemClick(section);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.dashboardLogo}>QUIZZIE</div>
      <div className={styles.dashboardBtnSection}>
        <button
          onClick={() => handleButtonClick("dashboard")}
          // className={`${styles.sidebarBtn} ${activeButton === "dashboard" ? 'active' : ""}`}
          className={`${styles.sidebarBtn} ${activeButton === "dashboard" && styles.activeBtn}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleButtonClick("analytics")}
          className={`${styles.sidebarBtn} ${
            activeButton === "analytics" && styles.activeBtn
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => handleButtonClick("createQuiz")}
          className={`${styles.sidebarBtn} ${
            activeButton === "createQuiz" && styles.activeBtn
          }`}
        >
          Create Quiz
        </button>
      </div>
      <div className={styles.logout_btn}>
        <button className={styles.sidebarBtn} onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
