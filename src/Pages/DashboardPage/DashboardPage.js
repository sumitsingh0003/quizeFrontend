import React, { useState, useEffect } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import RightSection from "../../Components/RightSection/RightSection";
import AnalyticsPage from "../AnalyticsPage/AnalyticsPage";
import CreateQuizPopup from "../../Components/CreateQuizPopup/CreateQuizPopup";
import styles from "./DashboardPage.module.css";
import axios from "axios";
import BASEURL from "../../constant/baseurl";
const DashboardPage = () => {
  const [allAnalData, setAllAnalData] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [isCreateQuizPopupOpen, setCreateQuizPopupOpen] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASEURL}/quiz/analytics-data`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      ); // Adjust URL if your API is hosted elsewhere
    //  console.log(response);
      setAllAnalData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //console.log(allAnalData);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSidebarItemClick = (section) => {
    setActiveSection(section);

    if (section === "createQuiz") {
      setCreateQuizPopupOpen(true);
    }
  };

  const handleCloseCreateQuizPopup = () => {
    setCreateQuizPopupOpen(false);
  };

  const getNumberOfQueCreated = (data) => {
    let questions = 0;
    data.forEach((quiz) => {
      questions += quiz.questions.length;
    });
    return questions;
  };
  const getNumberOfImpressions = (data) => {
    let impressions = 0;
    data.forEach((quiz) => {
      impressions += quiz.impressions;
    });
    return impressions;
  };
  return (
    <div className={styles.dashboardContainer}>
      <SideBar onSidebarItemClick={handleSidebarItemClick} />
      <RightSection>
        {activeSection === "analytics" ? (
          <AnalyticsPage />
        ) : (
          <div className={styles.dashboard_subcontainer}>
            <div className={styles.dashboard_screen}>

              <div className={styles.dashboard_maincard}>

                <div className={styles.dashboard_totalQuiz}>
                  <span className={styles.dashboard_quizdata_number}>
                    {allAnalData.length}
                  </span> 
                 <h4>Quizzes <br />
                  Created</h4>
                </div>

                <div className={styles.dashboard_totalQue}>
                  <span className={styles.dashboard_quizdata_number}>
                    {getNumberOfQueCreated(allAnalData)}
                  </span>
                  <h4>Questions Created</h4>
                  
                </div>
                <div className={styles.dashboard_totalImpressions}>
                  <span className={styles.dashboard_quizdata_number}>
                    {getNumberOfImpressions(allAnalData)}
                  </span>
                  <h4>Impressions</h4>
                  
                </div>
              </div>

              <h2>Trending Quiz</h2>
              <div className={styles.dashboard_trendCard}>

              {allAnalData.slice(-6).reverse().map((item, index) => (
                <div
                  key={index}
                  className={styles.dashboard_trending_quiz_container}
                >
                  <div className={styles.dashboard_trending_quiz_item}>
                    <div className={styles.dashboard_trending_quiz_title}>
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        )}
      </RightSection>

      {isCreateQuizPopupOpen && <div className={styles.blurOverlay} />}
      {isCreateQuizPopupOpen && (
        <CreateQuizPopup onClose={handleCloseCreateQuizPopup} />
      )}
    </div>
  );
};

export default DashboardPage;
