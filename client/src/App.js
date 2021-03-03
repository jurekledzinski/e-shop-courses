import React, { useContext, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { NavContext } from "./store/NavProvider";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/others/errorFallback/ErrorFallback";

import MobileMenu from "./components/others/mobileMenu/MobileMenu";
import AsideMobileMenu from "./components/others/asideMobileMenu/AsideMobileMenu";

import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";

import StoreProvider from "./store/StoreProvider";
import CartProvider from "./store/CartProvider";
import InventoryProvider from "./store/InventoryProvider";
import ErrorHandler from "./errorHandler/ErrorHandler";
import AsideNavHamburgerMenu from "./components/others/asideMobileMenu/AsideNavHamburgerMenu";

import "./App.scss";

const App = () => {
  const {
    appWrapperrActive,
    checkWhichMenu,
    setAppWrapperrActive,
    setIsHamburgerRotate,
    setHamburgerVisible,
    setsHowHideMobileMenu,
    setShowMenuAside,
  } = useContext(NavContext);
  const appWrapperRef = useRef(null);
  const handleCloseMobileMenu = () => {
    const { current } = appWrapperRef;
    const classAppWrapperActive = "app-wrapper--active";

    if (current.className === classAppWrapperActive) {
      setTimeout(() => setAppWrapperrActive(false), 1160);
      setHamburgerVisible(false);
      setIsHamburgerRotate(false);
      setsHowHideMobileMenu(false);
      setShowMenuAside(false);
    }
  };

  return (
    <div className="app-container">
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <StoreProvider>
            <CartProvider>
              <InventoryProvider>
                <ErrorHandler>
                  {checkWhichMenu ? <MobileMenu /> : <AsideMobileMenu />}
                  <div
                    className={
                      appWrapperrActive ? "app-wrapper--active" : "app-wrapper"
                    }
                    ref={appWrapperRef}
                    onClick={handleCloseMobileMenu}
                  >
                    <AsideNavHamburgerMenu />
                    <Header />
                    <Content />
                    <Footer />
                  </div>
                </ErrorHandler>
              </InventoryProvider>
            </CartProvider>
          </StoreProvider>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default App;
