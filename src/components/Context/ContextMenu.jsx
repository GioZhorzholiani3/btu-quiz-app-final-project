import React, { useEffect, useState } from "react";
const ContextMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    props.isRightClicked && setIsOpen(true);
  }, [props.isRightClicked]);

  useEffect(() => {
    const hideMenu = (e) => {
      const parent = props.parent.current;
      if (parent && parent.contains(e.target)) {
        e.preventDefault();
      }
      if (parent && !parent.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", hideMenu);

    return () => {
      window.removeEventListener("click", hideMenu);
    };
  });
  return isOpen ? (
    <div className="hst-delete">
      <span className="hst-btn" onClick={() => props.del(props.idx)}>
        <button className="del">delete</button>
      </span>
    </div>
  ) : null;
};

export default ContextMenu;
