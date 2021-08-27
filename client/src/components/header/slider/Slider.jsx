import React, { useContext, useEffect, useRef, useState } from "react";

import "./Slider.scss";

import { NavContext } from "../../../store/NavProvider";
import { StoreContext } from "../../../store/StoreProvider";

const Slider = ({ location }) => {
  const { appWrapperrActive } = useContext(NavContext);
  const {
    allAdvertsSlider,
    advertOptions,
    courses,
    isloadFirstTimePage,
    setIsloadFirstTimePage,
    setIsOwnAdverts,
    isOwnAdverts,
  } = useContext(StoreContext);

  const [countCard, setCountCard] = useState(1);
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [productsLatest, setProductsLatest] = useState([]);
  const [slides, setSlides] = useState(allAdvertsSlider);

  const [widthSlider, setWidthSlider] = useState(1200);
  const [heightSlider, setHeightSlider] = useState(500);

  const [visibilityArrows, SetVisibilityArrows] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const idInterval = useRef(null);
  const isMounted = useRef(null);
  const slidesContainer = useRef(null);
  const [scrollDiff, setScrollDiff] = useState(0);
  const [heightSizeSlider, setHeighSizetSlider] = useState(0);

  const events = {
    swipeUp: new Event("swipeUp"),
    swipeDown: new Event("swipeDown"),
    swipeLeft: new Event("swipeLeft"),
    swipeRight: new Event("swipeRight"),
  };

  const handleRightMove = () => {
    if (countCard <= 0) {
      return;
    } else {
      setCountCard((prevValue) => prevValue - 1);
      clearInterval(idInterval.current);
    }
  };

  const handleLeftMove = () => {
    if (countCard >= slidesContainer.current.children.length - 1) {
      return;
    } else {
      setCountCard((prevValue) => prevValue + 1);
      clearInterval(idInterval.current);
    }
  };

  const handleClickDot = (dotIndex) => {
    setCountCard(dotIndex);
  };

  useEffect(() => {
    if (slides.length > 0) {
      let firstElement = slidesContainer.current.children[0].cloneNode(true);
      let lastElement = slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].cloneNode(true);

      slidesContainer.current.insertBefore(
        lastElement,
        slidesContainer.current.children[0]
      );
      slidesContainer.current.append(firstElement);

      slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].children[0].className = "slider__overlay";

      slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].children[0].children[0].className = "slider__title";

      slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].children[0].children[1].className = "slider__description";

      slidesContainer.current.style.transitionDuration = "0s";
      slidesContainer.current.style.transform = `translateX(-${100}%)`;
    }
  }, [slides]);

  useEffect(() => {
    slidesContainer.current.style.transitionDuration = "0.5s";
    slidesContainer.current.style.transform = `translateX(-${
      100 * countCard
    }%)`;

    if (countCard === slidesContainer.current.children.length - 1) {
      setTimeout(() => {
        slidesContainer.current.style.transitionDuration = "0.0s";
        slidesContainer.current.style.transform = `translateX(-${100}%)`;
        setTimeout(() => {
          setCountCard(1);
        }, 15);
        return;
      }, 502);
    } else if (countCard <= 0) {
      setTimeout(() => {
        slidesContainer.current.style.transitionDuration = "0.0s";
        slidesContainer.current.style.transform = `translateX(-${
          100 * slides.length
        }%)`;
        setTimeout(() => {
          setCountCard(slides.length);
        }, 15);
        return;
      }, 502);
    }
  }, [countCard]);

  const removeCloneNodes = () => {
    if (slides.length > 0) {
      slidesContainer.current.children[0].remove();
      slidesContainer.current.children[
        slidesContainer.current.children.length - 1
      ].remove();
      setCountCard(1);
      setIsloadFirstTimePage(false);
      setIsOwnAdverts(false);
    }
  };

  const deepCopyCourses = () => {
    let products = [];
    courses.forEach((item) => {
      const singleProduct = { ...item };
      products = [...products, singleProduct];
    });
    return products;
  };

  useEffect(() => {
    if (advertOptions === "Added own adverts") {
      setSlides(allAdvertsSlider);
      removeCloneNodes();
    }
  }, [advertOptions, allAdvertsSlider]);

  useEffect(() => {
    switch (advertOptions) {
      case "Latest Products":
        setSlides(productsLatest);
        removeCloneNodes();
        break;
      case "Top Rated Products":
        let copyCourses = deepCopyCourses();
        let sortedCoursByRate = copyCourses.sort(function (a, b) {
          return b.averageRate - a.averageRate;
        });
        let threeTopRatedProducts = sortedCoursByRate.slice(0, 3);
        setSlides(threeTopRatedProducts);
        removeCloneNodes();
        break;
    }
  }, [advertOptions]);

  const playIntervalSlider = () => {
    if (slides.length > 1) {
      idInterval.current = setInterval(() => {
        setCountCard((prevValue) => prevValue + 1);
      }, 8000);
    }
  };

  useEffect(() => {
    if (advertOptions === "Added own adverts" && allAdvertsSlider.length > 1) {
      isOwnAdverts && setSlides(allAdvertsSlider);
      isOwnAdverts ? removeCloneNodes() : null;
    }
  }, [isOwnAdverts]);

  useEffect(() => {
    switch (advertOptions) {
      case "Latest Products":
        isloadFirstTimePage && setSlides(productsLatest);
        isloadFirstTimePage ? removeCloneNodes() : null;
        break;
      case "Top Rated Products":
        let copyCourses = deepCopyCourses();
        let sortedCoursByRate = copyCourses.sort(function (a, b) {
          return b.averageRate - a.averageRate;
        });
        let threeTopRatedProducts = sortedCoursByRate.slice(0, 3);

        isloadFirstTimePage && setSlides(threeTopRatedProducts);
        isloadFirstTimePage ? removeCloneNodes() : null;
        break;
    }
  }, [isloadFirstTimePage]);

  useEffect(() => {
    if (location === "/") {
      playIntervalSlider();
    } else {
      clearInterval(idInterval.current);
    }

    return () => {
      return clearInterval(idInterval.current);
    };
  }, [countCard, location, slides]);

  useEffect(() => {
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const sizeSliderDefaultAndResizeLess1200 = (ratioHeight) => {
    let diff2 = (1200 * 100) / window.innerWidth - (1200 * 100) / 1200;
    let px = (window.innerWidth / 100) * 100 - diff2 - 40;
    setWidthSlider(px + "px");
    setHeightSlider(ratioHeight + "px");
  };

  const sizeSliderDefaultAndResizeLess768 = (heightratio) => {
    setWidthSlider(100 + "%");
    setHeightSlider(heightratio + "px");
  };

  useEffect(() => {
    const widthInnerWindow = window.innerWidth;
    const heightInnerWindow = window.innerHeight;
    const ratio = Math.min(widthInnerWindow / heightInnerWindow);

    setHeighSizetSlider(slidesContainer.current.offsetHeight);

    const sizePrecent = (1200 * 100) / window.innerWidth;
    setWidthSlider(sizePrecent + "%");
    SetVisibilityArrows(true);

    if (window.innerWidth < 1200 && isMounted.current) {
      let ratioHeight = (heightInnerWindow * ratio) / 2.5;
      sizeSliderDefaultAndResizeLess1200(ratioHeight);
      SetVisibilityArrows(true);
    }

    if (window.innerWidth < 768 && isMounted.current) {
      let heightSliderWrapper = window.innerHeight;
      let heightratio = (heightSliderWrapper * ratio) / 2;
      sizeSliderDefaultAndResizeLess768(heightratio);
      SetVisibilityArrows(false);
    }

    if (window.innerWidth <= 411 && isMounted.current) {
      let heightSliderWrapper = window.innerHeight;
      let heightratio = (heightSliderWrapper * ratio) / 1.6;
      sizeSliderDefaultAndResizeLess768(heightratio);
      SetVisibilityArrows(false);
    }
  }, [window.innerWidth, heightSlider, widthSlider]);

  useEffect(() => {
    const resizeSlider = () => {
      setWindowSize(window.innerWidth);
      setWidthSlider(1200 + "px");
      setHeightSlider(500 + "px");

      let sizePrecent = (1200 * 100) / window.innerWidth;

      let widthWindowInner = window.innerWidth;
      let heightWindowInner = window.innerHeight;

      let ratio = Math.min(widthWindowInner / heightWindowInner);

      setWidthSlider(sizePrecent + "%");

      if (window.innerWidth < 1200 && isMounted.current) {
        let ratioHeight = (heightWindowInner * ratio) / 2.5;
        sizeSliderDefaultAndResizeLess1200(ratioHeight);
        SetVisibilityArrows(true);
      }

      if (window.innerWidth < 768 && isMounted.current) {
        let heightInnerWindow = window.innerHeight;
        let heightRatio = (heightInnerWindow * ratio) / 2;
        sizeSliderDefaultAndResizeLess768(heightRatio);
        SetVisibilityArrows(false);
      }

      if (window.innerWidth <= 411 && isMounted.current) {
        let heightInnerWindow = window.innerHeight;
        let heightRatio = (heightInnerWindow * ratio) / 1.6;
        sizeSliderDefaultAndResizeLess768(heightRatio);
        SetVisibilityArrows(false);
      }
    };
    window.addEventListener("resize", resizeSlider);

    return function cleanupListenerSlider() {
      window.removeEventListener("resize", resizeSlider);
    };
  }, []);

  useEffect(() => {
    const minusMargin = window.innerWidth / 8;
    if (window.innerWidth - 17 < 760) {
      setWidthSlider(window.innerWidth - 17);
      SetVisibilityArrows(false);
    } else {
      setWidthSlider(window.innerWidth - minusMargin);
      SetVisibilityArrows(true);
    }
  }, []);

  const startTouchDisplay = (e) => {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    setInitialX(touchX);
    setInitialY(touchY);
  };

  const moveTouchDisplay = (e) => {
    e.preventDefault();

    if (!initialX || !initialY) {
      return;
    }

    const currenTouchX = e.touches[0].clientX;
    const currenTouchY = e.touches[0].clientY;

    const diffrenceX = initialX - currenTouchX;
    const diffrenceY = initialY - currenTouchY;

    setScrollDiff(diffrenceY);

    if (Math.abs(diffrenceX) > Math.abs(diffrenceY)) {
      if (diffrenceX > 0) {
        slidesContainer.current.dispatchEvent(events.swipeLeft);
      } else {
        slidesContainer.current.dispatchEvent(events.swipeRight);
      }
    } else {
      if (diffrenceY > 0) {
        slidesContainer.current.dispatchEvent(events.swipeUp);
      } else {
        slidesContainer.current.dispatchEvent(events.swipeDown);
      }
    }

    setInitialX(null);
    setInitialY(null);
  };

  useEffect(() => {
    slidesContainer.current.addEventListener("touchstart", startTouchDisplay);
    slidesContainer.current.addEventListener("touchmove", moveTouchDisplay);
    return () => {
      slidesContainer.current.removeEventListener(
        "touchstart",
        startTouchDisplay
      );
      slidesContainer.current.removeEventListener(
        "touchmove",
        moveTouchDisplay
      );
    };
  }, [initialX, initialY]);

  useEffect(() => {
    slidesContainer.current.addEventListener("swipeUp", () => {
      if (window.innerWidth > 767) {
        window.scrollTo({
          top: heightSizeSlider + 20,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: heightSizeSlider,
          behavior: "smooth",
        });
      }
    });

    slidesContainer.current.addEventListener("swipeDown", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, [scrollDiff, window.innerWidth]);

  useEffect(() => {
    slidesContainer.current.addEventListener("swipeLeft", () =>
      handleLeftMove()
    );
    slidesContainer.current.addEventListener("swipeRight", () =>
      handleRightMove()
    );
  }, []);

  useEffect(() => {
    let copyCourses = deepCopyCourses();
    let sortedCoursesByDate = copyCourses.sort(function (a, b) {
      return b.dateMilliseconds - a.dateMilliseconds;
    });
    const threeLatestProducts = sortedCoursesByDate.slice(0, 3);
    setProductsLatest(threeLatestProducts);
  }, [courses]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("reloaded") != null) {
      setIsloadFirstTimePage(false);
      setIsOwnAdverts(false);
    } else {
      setIsloadFirstTimePage(false);
      setIsOwnAdverts(false);
    }
  }, []);

  const dotsSlider = slides.map((item, index) => (
    <li
      key={item._id}
      className={
        countCard === index + 1 ? "slider__dots--active " : "slider__dots"
      }
      onClick={() => handleClickDot(index + 1)}
    ></li>
  ));

  return (
    <div
      className={
        windowSize < 768
          ? appWrapperrActive
            ? "slider--mobile-position1"
            : "slider--mobile-smaller"
          : appWrapperrActive
          ? "slider--mobile-position2"
          : "slider"
      }
      style={{ width: widthSlider, height: heightSlider }}
    >
      {visibilityArrows ? (
        <span className="slider__arrow-right" onClick={handleRightMove}>
          <i className="fas fa-chevron-right"></i>
        </span>
      ) : null}
      {visibilityArrows ? (
        <span className="slider__arrow-left" onClick={handleLeftMove}>
          <i className="fas fa-chevron-left"></i>
        </span>
      ) : null}
      <ul className="slider__dots-list ">{dotsSlider}</ul>
      <div className="slider__content" ref={slidesContainer}>
        {slides.map((item, index) => (
          <div className="slider__img-wrapper" key={item._id}>
            <div
              className={
                countCard === index + 1
                  ? "slider__overlay--active"
                  : "slider__ovarlay"
              }
            >
              <p className="slider__title" style={{ color: item.colorTitle }}>
                {item.title}
              </p>
              <p
                className={
                  countCard === index + 1
                    ? "slider__description--active"
                    : "slider__description"
                }
                style={{ color: item.colorDescription }}
              >
                {item.description}
              </p>
            </div>
            <img className="slider__image" src={item.imagePath} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
