import React, { useState, useRef } from "react";
import ContextMenu from "./ContextMenu";
const ContextItem = (props) => {
  const listItemRef = useRef();
  const [isRightClicked, setIsRightClicked] = useState(false);

  return (
    <li
      className="history-item"
      ref={listItemRef}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsRightClicked(e);
      }}
    >
      {`${props.value} / ${props.maxValue} ${props.date}`}
      <ContextMenu
        idx={props.idx}
        parent={listItemRef}
        isRightClicked={isRightClicked}
        del={props.del}
      />
    </li>
  );
};

export default ContextItem;
