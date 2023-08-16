"use client"

import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

const safeFun = fn => fn && typeof fn === "function" ? fn : () => {};

export const Portal = props => {
  const {
    open,
    parent,
    children,
    onClick,
    shadow
  } = props;

  const [node, setNode] = useState(null);

  const root = "#__next";

  useEffect(() => {
    const n = ReactDOM.createPortal(children,
      // @ts-ignore-line
      document.querySelector(parent || root)
    );

    // @ts-ignore-line
    setNode(n);
  }, [parent, children]);

  return (
    <>
      {open && <div
        role="presentation"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 2,
          overflow: "hidden",
          background: shadow || ""
        }}
        onClick={e => safeFun(onClick)(e)}
      >
        {node}
      </div>
      }
    </>
  );
};
