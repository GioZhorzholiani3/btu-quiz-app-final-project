import React, { useState } from "react";

const Boolean = (props) => {
  const [selected, setSelected] = useState(null);
  const yes = () => {
    props.setClr("prob");
    props.setCheck(props.answer);
    setSelected(1);
  };

  const no = () => {
    props.setClr("prob");
    props.setCheck(!props.answer);
    setSelected(2);
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
        <p
          className={`answer` + (selected === 1 ? " selected" : "")}
          onClick={yes}
        >
          True
        </p>
        <p
          className={`answer` + (selected === 2 ? " selected" : "")}
          onClick={no}
        >
          False
        </p>
      </ul>
    </div>
  );
};

export default Boolean;
