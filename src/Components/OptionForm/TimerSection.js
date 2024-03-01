import React from 'react';
import styles from './OptionForm.module.css';

const TimerSection = ({ onTimerChange }) => (
  <div className={styles.timerSection}>
    <label>Timer</label>
    <div className={styles.timerOptionsContainer}>
      <div>
        <input
          type="radio"
          id="timerOff"
          name="timerOptions"
          onChange={() => onTimerChange(-1)}
        />
        <label htmlFor="timerOff" className={styles.dashboard_timer_btn}>Off</label>
      </div>

      <div>
        <input
          type="radio"
          id="timer5sec"
          name="timerOptions"
          onChange={() => onTimerChange(5)}
        />
        <label htmlFor="timer5sec" className={styles.dashboard_timer_btn}>5 sec</label>
      </div>

      <div>
        <input
          type="radio"
          id="timer10sec"
          name="timerOptions"
          onChange={() => onTimerChange(10)}
        />
        <label htmlFor="timer10sec" className={styles.dashboard_timer_btn}>10 sec</label>
      </div>
    </div>
  </div>
);

export default TimerSection;
