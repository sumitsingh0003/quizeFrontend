import React from 'react';
import styles from './RightSection.module.css';

const RightSection = ({ children }) => {
  return (
    <div className={styles.rightSectionMainContainer}>
      {children}
    </div>
  );
}

export default RightSection;
