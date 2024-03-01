import React from "react";
import styles from "./QuizAnalysisPage.module.css";

const QuizAnalysisPage = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.header}>
        <h1>Quiz Analysis</h1>
      </div>
      <div className={styles.QuizAnalysis_question_analysis_container}>
        <div className={styles.quizanalysis_question}></div>
        <div className={styles.QuizAnalysis_box}>
          <div className={styles.QuizAnalysis_total_attempt_box}>
            <div></div>
            People Attempted the Question
          </div>
          <div className={styles.QuizAnalysis_correct_attempt_box}>
            <div></div>
            People Attempted Correctly
          </div>
          <div className={styles.QuizAnalysis_incorrect_attempt_box}>
            <div></div>
            People Attempted Incorrectly
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAnalysisPage;
