import React from "react";
import styles from "./QuizCongratsPage.module.css";
import trophyimg from "../../assets/images/trophy.png";
const QuizCongratsPage = () => {
  return (
    <>
      <div className={styles.QuizCompletion_mainContainer}>
        <div className={styles.QuizContainer_thankYouContainer}>
          <div>Congrats!! Quiz is completed</div>
          <img src={trophyimg} alt="" />
          
        </div>
      </div>
    </>
  );
};

export default QuizCongratsPage;
