// CreateQuizPopup.js
import React, { useState } from "react";
import OptionForm from "../OptionForm/OptionForm";
import styles from "./CreateQuizPopup.module.css";
import BASEURL from "../../constant/baseurl";
const CreateQuizPopup = ({ onClose }) => {
  const [quizType, setQuizType] = useState("qa");
  const [activeBtn, setActiveBtn] = useState("qa");
  const [showOptionForm, setShowOptionForm] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState(null);

  const handleQuizTypeChange = (type) => {
    setQuizType(type);
    setActiveBtn(type);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleContinue = async () => {
    const token = localStorage.getItem("token");
   // console.log("Access Token:", token);
    try {
      if (quizType === "qa" || quizType === "poll") {
        const response = await fetch(`${BASEURL}/quiz/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            title: document.getElementById("quizName").value,
            quizType,
            // Add other necessary data
          }),
        });

        if (response.ok) {
          const createdQuiz = await response.json();
          //console.log("Created Quiz:", createdQuiz);
          setCreatedQuizId(createdQuiz.quizId);
          setShowOptionForm(true);
        } else {
          console.error("Error creating quiz:", response.statusText);
        }
      } else {
        console.log("Selected Quiz Type:", quizType);
        onClose();
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className={styles.createQuizPopup}>
      <div style={{ display: showOptionForm ? "none" : "block" }}>
      <h3>Create Quize</h3>
      <div className="quizeInptBox">
        <input type="text" id="quizName" className={styles.inputbox} />
      </div>

        <div className={styles.quizTypeSection}>
          <label>Select Quiz Type</label>
            <button
              className={`${styles.quizTypeBtn} ${activeBtn === "qa" && styles.activeBtn} firstQBntn`}
              onClick={() => handleQuizTypeChange("qa")}
            >
              Q & A
            </button>
            <button
              className={`${styles.quizTypeBtn} ${
                activeBtn === "poll" && styles.activeBtn
              }`}
              onClick={() => handleQuizTypeChange("poll")}
            >
              Poll Type
            </button>
        </div>

        {/* Buttons */}
        <div className={styles.buttonsSection}>
          <button onClick={handleCancel} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleContinue} className={styles.continueBtn}>
            Continue
          </button>
        </div>
      </div>

      {/* Render the second popup for options */}
      {showOptionForm && (
        <OptionForm
          onClose={() => setShowOptionForm(false)}
          slctdQzType={quizType}
          createdQuizId={createdQuizId} // Pass createdQuizId as a prop
        />
      )}
    </div>
  );
};

export default CreateQuizPopup;
