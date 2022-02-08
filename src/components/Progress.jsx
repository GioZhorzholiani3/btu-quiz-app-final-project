import React from "react";
import { Progress } from "reactstrap";
const ProgressBar = (props) => {
  return (
    <div className="progres">
      <Progress color="danger" value={props.value} max={props.max} />
    </div>
  );
};

export default ProgressBar;
