import React, { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./InternalServerError.scss";

import { StoreContext } from "../../../store/StoreProvider";

const InternalServerError = () => {
  const { errorServerMsg } = useContext(StoreContext);

  const history = useHistory();
  const timeOutClear = useRef();

  const handleReloadPage = () => {
    if (history.location.pathname !== "/") {
      history.push("/");
      timeOutClear.current = setTimeout(() => window.location.reload(), 100);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeOutClear.current);
  }, []);

  return (
    <section>
      {errorServerMsg.statusCode === 500 ? (
        <div className="server-error">
          <div className="server-error__wrapper">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/products-courses.appspot.com/o/no-remove-error-500.jpg?alt=media&token=5f582b95-eae3-44ba-a030-d1779afe467e"
              alt=""
              className="server-error__image"
            />
            {history.location.pathname !== "/" && (
              <button
                className="server-error__button"
                onClick={() => handleReloadPage()}
              >
                Back home
              </button>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default InternalServerError;
