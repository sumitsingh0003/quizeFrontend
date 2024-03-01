
import React from "react";
import styles from "./OptionForm.module.css";

const PollQuestionInput = ({ id, pollQuestion, onChange, quizeType }) => (
  <div className={styles.pollQuestionInput}>
    <input
      className={styles.dashboard_pollquestion}
      type="text"
      placeholder={quizeType==='qa' ? 'Q & A Questions': 'Poll Questions' }
      value={pollQuestion}
      onChange={(e) => onChange(id, e.target.value)}
    />
  </div>
);

export default PollQuestionInput;
