import React, { useEffect, useRef, useState } from "react";
import "./TickIcon.scss";

const TickIcon = ({
  checkIsSignIn,
  checkIsShippingCheckout,
  drawIcon,
  isInActive,
}) => {
  const circleRef = useRef(null);
  const lineLongRef = useRef(null);
  const lineShortRef = useRef(null);

  const [sizeAngleCircle, setSizeAngleCircle] = useState(0);
  const incrementCircle = 12;

  const [sizeLongLine, setSizeLongLine] = useState(53);
  const decrementLongLine = 2;
  const longLineTimeout = useRef(null);
  const timeOutIntervalLongLine = useRef(null);

  const [sizeShortLine, setSizeShortLine] = useState(0);
  const incrementShortLine = 1;
  const shortLineTimeout = useRef(null);
  const timeOutIntervalShortLine = useRef(null);

  const requestRef = useRef(null);

  const showCircle = () => {
    setSizeAngleCircle((prevValue) => prevValue + incrementCircle);
    requestRef.current = requestAnimationFrame(showCircle);
  };

  useEffect(() => {
    if (
      (circleRef.current && checkIsSignIn) ||
      (circleRef.current && checkIsShippingCheckout)
    ) {
      requestRef.current = requestAnimationFrame(showCircle);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [circleRef.current, drawIcon]);

  useEffect(() => {
    if (
      (lineShortRef.current && checkIsSignIn) ||
      (lineShortRef.current && checkIsShippingCheckout)
    ) {
      const showShortLineInterval = () => {
        timeOutIntervalShortLine.current = window.setInterval(() => {
          setSizeShortLine((prevValue) => prevValue + incrementShortLine);
        });
      };
      shortLineTimeout.current = window.setTimeout(showShortLineInterval, 900);

      return () => {
        clearTimeout(shortLineTimeout.current);
        clearInterval(timeOutIntervalShortLine.current);
      };
    }
  }, [drawIcon, lineShortRef.current]);

  useEffect(() => {
    if (
      (lineLongRef.current && checkIsSignIn) ||
      (lineLongRef.current && checkIsShippingCheckout)
    ) {
      const showLongLineInterval = () => {
        timeOutIntervalLongLine.current = window.setInterval(() => {
          setSizeLongLine((prevValue) => prevValue - decrementLongLine);
        });
      };

      longLineTimeout.current = window.setTimeout(showLongLineInterval, 1000);

      return () => {
        clearTimeout(longLineTimeout.current);
        clearInterval(timeOutIntervalLongLine.current);
      };
    }
  }, [drawIcon, lineLongRef.current]);

  useEffect(() => {
    if (
      (circleRef.current && checkIsSignIn) ||
      (circleRef.current && checkIsShippingCheckout)
    ) {
      if (sizeAngleCircle >= 372) {
        return () => cancelAnimationFrame(requestRef.current);
      }
      circleRef.current.setAttribute(
        "stroke-dasharray",
        `${sizeAngleCircle},360`
      );
    }
  }, [sizeAngleCircle]);

  useEffect(() => {
    if (
      (lineShortRef.current && checkIsSignIn) ||
      (lineShortRef.current && checkIsShippingCheckout)
    ) {
      if (sizeShortLine >= 53) {
        clearInterval(timeOutIntervalShortLine.current);
        clearTimeout(shortLineTimeout.current);
      }
      lineShortRef.current.setAttribute(
        "stroke-dasharray",
        `${sizeShortLine},53`
      );
    }
  }, [lineShortRef.current, sizeShortLine]);

  useEffect(() => {
    if (
      (lineLongRef.current && checkIsSignIn) ||
      (lineLongRef.current && checkIsShippingCheckout)
    ) {
      if (sizeLongLine <= 0) {
        clearInterval(timeOutIntervalLongLine.current);
        clearTimeout(longLineTimeout.current);
      }
      lineLongRef.current.setAttribute("stroke-dashoffset", `-${sizeLongLine}`);
    }
  }, [lineLongRef.current, sizeLongLine]);

  return (
    <div className="svg-tick">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 124 125"
        style={{ enableBackground: "new 0 0 124 125" }}
        xmlSpace="preserve"
      >
        <circle
          className={
            isInActive ? "svg-tick__circle--inActive" : "svg-tick__circle"
          }
          cx="62.6"
          cy="65.7"
          r="57"
          fill="white"
          strokeDasharray={
            checkIsSignIn || checkIsShippingCheckout ? "0,360" : "360,360"
          }
          transform="rotate(-90,62.6,65.7)"
          ref={circleRef}
        />
        <path
          className={
            isInActive ? "svg-tick__path-1--inActive" : "svg-tick__path-1"
          }
          d="M89.4,44.9C79.1,58.3,68.9,72.7,58.6,87.2"
          strokeDasharray="53,53"
          strokeDashoffset={
            checkIsSignIn || checkIsShippingCheckout ? "-53" : "0"
          }
          ref={lineLongRef}
        />
        <line
          className="svg-tick__line"
          x1="-338.9"
          y1="-71.7"
          x2="-338.9"
          y2="-72.5"
        />
        <path
          className={
            isInActive ? "svg-tick__path-2--inActive" : "svg-tick__path-2"
          }
          d="M38.2,69.7c7.9,5.7,15.9,11.4,23.9,17.1"
          strokeDasharray={
            checkIsSignIn || checkIsShippingCheckout ? "0,53" : "53,53"
          }
          ref={lineShortRef}
        />
      </svg>
    </div>
  );
};
export default TickIcon;
