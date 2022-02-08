import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/Home";
import History from "./History/History";
import QuizPage from "./Quiz/QuizPage";
import "./Quizapp.scss";

const StartingPage = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/quiz">
        <QuizPage />
      </Route>
      <Route path="/history">
        <History />
      </Route>
    </Router>
  );
};

export default StartingPage;
