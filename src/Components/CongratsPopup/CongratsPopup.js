// CongratsPopup.js
import React, {useState} from 'react';
import styles from './CongratsPopup.module.css';
const baseUrl = process.env.REACT_APP_BASE_URL || '';

const CongratsPopup = ({ quizLink }) => {

const [showCopyLink, setShowCopyLink] = useState(false);

  const handleCopyLink = (link) => (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(link);
    setShowCopyLink(true);
    setTimeout(() => {
      setShowCopyLink(false);
    }, 3000);
   
  };


  return (
    <div className={styles.congratsPopup}>
      <p>Congrats! Your Quiz is Published!</p>
     
      <div className={styles.copyData}>
        <p>{baseUrl}/quiz/{quizLink}</p><button  onClick={handleCopyLink(`${baseUrl}/quiz/${quizLink}`)}>Share</button>
      </div>
      {showCopyLink && (
          <div className={styles.copiedBox}>
            <p>Link Copied</p>
          </div>
        )}
    </div>


  );
};

export default CongratsPopup;
