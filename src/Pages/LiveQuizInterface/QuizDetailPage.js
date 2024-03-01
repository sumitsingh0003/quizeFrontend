import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./QuizDetailPage.module.css";
import BASEURL from "../../constant/baseurl";
const QuizDetailPage = () => {
  const { sharedLink } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/quiz/shared/${sharedLink}`
        );
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [sharedLink]);

  useEffect(() => {
    if (quizData && currentQuestionIndex < quizData.questions.length) {
      // eslint-disable-next-line
      const question = quizData.questions[currentQuestionIndex];
      setTimer(quizData.timer);
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            handleNextQuestion();
            return quizData.timer;
          }
          return prevTimer - 1;
        });
      }, 1000);
      setTimerInterval(interval);
    }
    // eslint-disable-next-line
  }, [currentQuestionIndex, quizData]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex !== null) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOptionIndex(null);
      clearInterval(timerInterval);
    } else {
      // alert('Please select an option before moving to the next question.');
    }
  };

  const handleSubmit = () => {
    console.log("Quiz submitted!");
    if (quizData.quizType === "qa") {
      navigate("/quizcongrats");
    } else if (quizData.quizType === "poll") {
      navigate("/pollcongrats");
    }
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className={styles.Questions_mainContainer}>
      <div className={styles.Question_questionContent}>
        <div className={styles.Questions_header}>
          <div>{quizData.title}</div>
          <div className={styles.Questions_timer}>{timer} seconds</div>
        </div>
        <div className={styles.Questions_pollQuestions}>
          <div className={styles.Question} key={currentQuestion._id}>
            <div className={styles.Question_text}>
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </div>
            <div className={styles.Questions_options}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={option._id}
                  className={`${styles.Questions_option} ${
                    selectedOptionIndex === index ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {currentQuestion.optionType === "imgurl" ? (
                    <img src={option.imgUrl} alt={`Option ${index + 1}`} />
                  ) : (
                    option.text
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {currentQuestionIndex === quizData.questions.length - 1 ? (
          <button className={styles.submit_btn} onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className={styles.submit_btn} onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizDetailPage;
