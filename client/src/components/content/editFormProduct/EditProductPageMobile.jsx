import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import EditCourseFormMobile from "./EditCourseFormMobile";

import ButtonGoBack from "../../others/buttonGoBack/ButtonGoBack";

const EditProductPageMobile = () => {
  const history = useHistory();
  return (
    <Fragment>
      <ButtonGoBack history={history} />
      <EditCourseFormMobile />
    </Fragment>
  );
};
export default EditProductPageMobile;
