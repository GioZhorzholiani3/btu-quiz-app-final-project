import React, { useState } from "react";

const Quiz = (props) => {
  const type = props.question.type;
  const answer = props.answer.answer;
  const [selected, setSelected] = useState([]);
  const [singleSelected, setSingleSelected] = useState();

  const single = (idx) => {
    let current = singleSelected === idx + 1 ? singleSelected : idx + 1;
    setSingleSelected(current);
    if (!current) {
      props.setClr("");
    }
    if (answer === current) {
      props.setClr("prob");
      props.setCheck(true);
    } else {
      props.setCheck(false);
      props.setClr("prob");
    }
  };

  const multiple = (idx) => {
    let currentSelected = selected.includes(idx + 1)
      ? selected.filter((id) => id !== idx + 1)
      : [...selected, idx + 1];
    setSelected(currentSelected);
    const correctAnswer = props.answer.answer;

    if (
      correctAnswer.every((elem) => currentSelected.includes(elem)) &&
      currentSelected.length === correctAnswer.length
    ) {
      props.setClr("prob");
      props.setCheck(true);
    } else {
      props.setClr("prob");
      props.setCheck(false);
    }
    if (!currentSelected.length) {
      props.setClr("");
      props.setCheck(null);
    }
  };
  return (
    <div
      className={`quiz-container ${
        { true: "clrTrue", false: "clrFalse", prob: "clrProb" }[props.clr]
      }`}
    >
      <div className="question">
        <p>{props.question.question}</p>
      </div>
      <ul className="answers-container">
        {props.question.options.map((ans, idx) => {
          return type === "single" ? (
            <p
              key={idx}
              className={
                `answer` + (singleSelected === idx + 1 ? " selected" : "")
              }
              onClick={() => single(idx)}
            >
              {ans}
            </p>
          ) : (
            <p
              key={idx}
              className={
                `answer` + (selected.includes(idx + 1) ? " selected" : "")
              }
              onClick={() => multiple(idx)}
            >
              {ans}
            </p>
          );
        })}
      </ul>
    </div>
  );
};

export default Quiz;
