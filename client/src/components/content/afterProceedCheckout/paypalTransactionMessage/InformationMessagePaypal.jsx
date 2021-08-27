import React, {
  useEffect,
  useLayoutEffect,
  forwardRef,
  useRef,
  useState,
} from "react";

import "./InformationMessagePaypal.scss";

import Modal from "../../../others/modal/Modal";

const InformationMessagePaypal = forwardRef((props, ref) => {
  const {
    checkToClearTick,
    isOpen,
    isPay,
    handleClose,
    partTitle,
    setCheckToClearTick,
    title,
    subtitle,
  } = props;

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

  const resetTickTimout = useRef(null);

  const requestRef = useRef(null);

  const showCircle = () => {
    setSizeAngleCircle((prevValue) => prevValue + incrementCircle);
    requestRef.current = requestAnimationFrame(showCircle);
  };

  useEffect(() => {
    if (isPay && circleRef.current) {
      requestRef.current = requestAnimationFrame(showCircle);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [circleRef.current]);

  useLayoutEffect(() => {
    if (isPay && lineShortRef.current) {
      const showShortLineInterval = () => {
        timeOutIntervalShortLine.current = window.setInterval(() => {
          setSizeShortLine((prevValue) => prevValue + incrementShortLine);
        });
      };

      shortLineTimeout.current = window.setTimeout(showShortLineInterval, 900);

      return () => clearTimeout(shortLineTimeout.current);
    }
  }, [lineShortRef.current]);

  useLayoutEffect(() => {
    if (isPay && lineLongRef.current) {
      const showLongLineInterval = () => {
        timeOutIntervalLongLine.current = window.setInterval(() => {
          setSizeLongLine((prevValue) => prevValue - decrementLongLine);
        });
      };

      longLineTimeout.current = window.setTimeout(showLongLineInterval, 1000);

      return () => clearTimeout(longLineTimeout.current);
    }
  }, [lineLongRef.current]);

  useEffect(() => {
    if (isPay && circleRef.current) {
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
    if (isPay && lineShortRef.current) {
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
    if (isPay && lineLongRef.current) {
      if (sizeLongLine <= 0) {
        clearInterval(timeOutIntervalLongLine.current);
        clearTimeout(longLineTimeout.current);
      }
      lineLongRef.current.setAttribute("stroke-dashoffset", `-${sizeLongLine}`);
    }
  }, [lineLongRef.current, sizeLongLine]);

  const clearBackDefault = () => {
    circleRef.current.setAttribute("stroke-dasharray", `0,360`);
    lineShortRef.current.setAttribute("stroke-dasharray", `0,53`);
    lineLongRef.current.setAttribute("stroke-dashoffset", `-53`);

    clearTimeout(resetTickTimout.current);
  };

  useEffect(() => {
    if (checkToClearTick) {
      resetTickTimout.current = setTimeout(() => {
        clearBackDefault();
      }, 5100);
      setCheckToClearTick(false);
    }
  }, [checkToClearTick]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      {isPay ? (
        <div className="message-paypal-success" ref={ref}>
          <div className="message-paypal-success__svg-icon">
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
                className="message-paypal-success__svg-circle"
                cx="62.6"
                cy="65.7"
                r="57"
                fill="white"
                strokeDasharray="0,360"
                transform="rotate(-90,62.6,65.7)"
                ref={circleRef}
              />
              <path
                className="message-paypal-success__svg-path-1"
                d="M89.4,44.9C79.1,58.3,68.9,72.7,58.6,87.2"
                strokeDasharray="53,53"
                strokeDashoffset="-53"
                ref={lineLongRef}
              />
              <line
                className="message-paypal-success__svg-line"
                x1="-338.9"
                y1="-71.7"
                x2="-338.9"
                y2="-72.5"
              />
              <path
                className="message-paypal-success__svg-path-2"
                d="M38.2,69.7c7.9,5.7,15.9,11.4,23.9,17.1"
                strokeDasharray="0,53"
                ref={lineShortRef}
              />
            </svg>
          </div>
          <h3 className="message-paypal-success__title">{title}</h3>
          <p className="message-paypal-success__subTitle">{subtitle}</p>
        </div>
      ) : (
        <div className="message-paypal" ref={ref}>
          <h3 className="message-paypal__title">{title}</h3>
          {partTitle ? (
            <h3 className="message-paypal__error-part-title">{partTitle}</h3>
          ) : null}
          <p className="message-paypal__subTitle">{subtitle}</p>
        </div>
      )}
    </Modal>
  );
});

export default InformationMessagePaypal;
