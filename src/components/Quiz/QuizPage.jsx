import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import Boolean from "../Boolean";
import ProgressBar from "../Progress";
import TryAgain from "../TryAgain";
const QuizPage = () => {
  const [data, setData] = useState(null);

  const [queId, setQueId] = useState(0);

  const [next, setNext] = useState(false);

  const [prog, setProg] = useState(0);

  const [clr, setClr] = useState("");

  const [count, setCount] = useState(0);

  const [check, setCheck] = useState(null);

  const getQuestions = async () => {
    const response = await fetch(
      "http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db"
    );
    const data = await response.json();
    return data;
  };

  const saveLocal = (key, value, time) => {
    const db = {
      value: value,
      expiry: new Date().getTime() + time,
    };
    localStorage.setItem(key, JSON.stringify(db));
  };

  const getLocal = (key) => {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(itemString);

    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const nextBtn = () => {
    setQueId(queId + 1);
    setNext(false);
    setClr("");
    setCheck(null);
    setCount(count + 1);
  };
  const confirmAns = () => {
    if (check !== null) {
      setNext(true);

      if (check) {
        setClr("true");
        setProg(prog + 1);
      } else {
        setClr("false");
      }
    }
  };

  useEffect(() => {
    const myQuestions = async () => {
      const myData = await getQuestions();
      saveLocal("data", myData, 100000);
      setData(getLocal("data"));
    };
    const isData = getLocal("data");
    isData ? setData(isData) : myQuestions();
  }, []);
  return !data ? (
    <div className="quiz-wrapper"></div>
  ) : (
    <div className="quiz-wrapper">
      {count === data.questions.length ? (
        <div className="quiz-container res">{`Your Result: ${prog} / ${data.questions.length}`}</div>
      ) : (
        <div>
          {data.questions[queId].type === "boolean" ? (
            <Boolean
              question={data.questions[queId]}
              answer={data.answers[queId].answer}
              setNext={setNext}
              setProg={setProg}
              prog={prog}
              setClr={setClr}
              clr={clr}
              count={count}
              setCount={setCount}
              setCheck={setCheck}
            />
          ) : (
            <Quiz
              question={data.questions[queId]}
              answer={data.answers[queId]}
              setNext={setNext}
              setProg={setProg}
              prog={prog}
              clr={clr}
              setClr={setClr}
              setCount={setCount}
              count={count}
              setCheck={setCheck}
            />
          )}
          {!next ? (
            <button
              className={`btn ${next ? "pointerEve" : ""}`}
              onClick={confirmAns}
            >
              confirm
            </button>
          ) : (
            <button className="btn finish" onClick={nextBtn}>
              {count === data.questions.length - 1 ? "finish" : "next"}
            </button>
          )}
        </div>
      )}

      {count === data.questions.length ? (
        <TryAgain value={prog} max={data.questions.length} />
      ) : (
        <div className="progres-txt">{`progress: ${count} of ${data.questions.length}`}</div>
      )}

      <ProgressBar value={count} max={data.questions.length} />
    </div>
  );
};

export default QuizPage;
