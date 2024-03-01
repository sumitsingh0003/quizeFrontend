import React from "react";
import styles from "./PollCongratsPage.module.css";

const PollCongratsPage = () => {
  return (
    <>
      <div className={styles.PollCompletion_mainContainer}>
        <div className={styles.PollCompletion_thankYouContainer}>
          Thank you <br /> for participating in <br />
          the Poll
        </div>
      </div>
    </>
  );
};

export default PollCongratsPage;
