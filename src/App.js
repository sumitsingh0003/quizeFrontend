import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import QuizDetailPage from "./Pages/LiveQuizInterface/QuizDetailPage";
import "./App.css";
import QuizCongratsPage from "./Pages/LiveQuizInterface/QuizCongratsPage";
import PollCongratsPage from "./Pages/LiveQuizInterface/PollCongratsPage";
import QuizAnalysisPage from "./Pages/QuizAnalysisPage/QuizAnalysisPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz/:sharedLink" element={<QuizDetailPage />} />

          <Route path="/quizanalysis" element={<QuizAnalysisPage />} />
          <Route path="/quizcongrats" element={<QuizCongratsPage />} />
          <Route path="/pollcongrats" element={<PollCongratsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
