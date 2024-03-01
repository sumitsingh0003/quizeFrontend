import React, { useState, useEffect } from "react";
import styles from "./AnalyticsPage.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import edit from "../../assets/images/edit-icon.svg";
import deleteIcon from "../../assets/images/delete-icon.svg";
import share from "../../assets/images/share-icon.svg";
import BASEURL from "../../constant/baseurl";
const AnalyticsPage = () => {
  const [allAnalData, setAllAnalData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCopyLink, setShowCopyLink] = useState(false);
  const [stdntId, setStdntId] = useState("");
  // const [copiedLink, setCopiedLink] = useState("");

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
     // console.log(response);
      setAllAnalData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(allAnalData, 'allAnalData');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because January is 0
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleCopyLink = (link) => (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(link);
    setShowCopyLink(true);
    // setCopiedLink(link);
    setTimeout(() => {
      setShowCopyLink(false);
    }, 3000);
  };

  const handleDeleteData = (id) => {
    setStdntId(id);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    try {
      const response = await axios.delete(
        `http://localhost:4000/quiz/api/deleteQuiz/${stdntId}`
      );
      if (response.status === 200 || response.status === 204) {
        fetchData();
      } else {
        console.error("Failed to delete data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className={styles.dashboard_analyticsScreen}>
        <h1 className={styles.dashboard_analyticsHeading}>Quiz Analytics</h1>
        <div className={styles.analData}>
        <table className={styles.dashboard_analyticsTable}>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Quize Name.</th>
              <th>Created Date</th>
              <th>Impression</th>
              <th>Action</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {allAnalData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{formatDate(item.createdOn)}</td>
                  <td>{item.impressions}</td>
                  <td>
                    <div className="actionBox">
                      <img src={edit} alt="" />
                      <img
                        src={deleteIcon}
                        onClick={() => handleDeleteData(item._id)}
                        alt=""
                      />
                      <img
                        src={share}
                        onClick={handleCopyLink(
                          `http://localhost:3000/quiz/${item.shareableLink}`
                        )}
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`http://localhost:3000/quiz/${item.shareableLink}`}
                    >
                      Question Wise Analysis
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>

      {showConfirm && (
        <div className={styles.cnfrmMainBox}>
          <div className={styles.cnfrInnerBx}>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleConfirm} className={styles.del}>
              Delete
            </button>
          </div>
        </div>
      )}

      {showCopyLink && (
        <div className={styles.copiedBox}>
          <p>Link Copied</p>
        </div>
      )}
    </>
  );
};

export default AnalyticsPage;
