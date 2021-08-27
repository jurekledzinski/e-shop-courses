import React, { useContext, useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";

import "./AddCourse.scss";

import { StoreContext } from "../../../../../../../store/StoreProvider";
import { storageInProject } from "../../../../../../../firebase/configfirebase";
import { addNewCourse } from "../../../../../../../utils/sessions";

import AddCourseForm from "./AddCourseForm";

const AddCourse = ({ history }) => {
  const {
    adjustValidationMsg,
    courses,
    setCourses,
    setIsloadFirstTimePage,
    validationMsg,
  } = useContext(StoreContext);

  const [authorCourse, setAuthorCourse] = useState("");
  const [checkIsImageLoaded, setCheckIsImageLoaded] = useState(true);
  const [description, setDescription] = useState("");
  const [fileImg, setFileImg] = useState(null);
  const [isAddAdvert, setIsAddAdvert] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [onStock, setOnStock] = useState("");
  const [partClass, setpartClass] = useState("");
  const [priceCourse, setPriceCourse] = useState("");
  const [showHideImgDiv, setShowHideImgDiv] = useState(false);
  const [titleCourse, setTitleCourse] = useState("");

  const inputFileRef = useRef();

  const fileType = ["image/jpeg", "image/png"];

  const clearForm = () => {
    setTitleCourse("");
    setImagePath("");
    setPriceCourse("");
    setAuthorCourse("");
    setOnStock("");
    setDescription("");
    inputFileRef.current.value = "";
  };

  const handleValidateMsg = (message) => {
    if (message) {
      adjustValidationMsg(message);
      setTimeout(() => {
        adjustValidationMsg("");
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitleCourse(value);
    } else if (name === "imagePath") {
      setImagePath(value);
    } else if (name === "price") {
      setPriceCourse(value);
    } else if (name === "author") {
      setAuthorCourse(value);
    } else if (name === "onStock") {
      setOnStock(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleAddImage = (e) => {
    let currentAddCourseTime = new Date();
    let timeMilliseconds = currentAddCourseTime.getTime().toString();
    let file = e.target.files[0];
    Object.defineProperty(file, "name", {
      value: file.name,
      writable: true,
    });

    file.name = `${file.name}-${timeMilliseconds}`;

    if (file && fileType.includes(file.type)) {
      setFileImg(file);
      setShowHideImgDiv(true);
    } else {
      setFileImg(null);
      setShowHideImgDiv(false);
      setpartClass("alert");
      handleValidateMsg("Please choose image valid format, like jpeg or png");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dateMilliseconds = new Date().getTime();
    let dateString = new Date().toISOString().slice(0, 10);

    const newCourse = {
      titleCourse,
      imagePath: imagePath ? imagePath : imageUrl,
      priceCourse,
      authorCourse,
      onStock: parseInt(onStock),
      description,
      averageRate: 0,
      dateMilliseconds,
      dateString,
    };

    const { data, status } = await addNewCourse(newCourse);

    setpartClass(Object.keys(data)[0]);

    if (status === 200) {
      handleValidateMsg(data.success);
      setCourses([...courses, data.course]);
      setImageUrl(null);
      setIsloadFirstTimePage(true);
      clearForm();
    } else {
      handleValidateMsg(data.alert);
    }
  };

  useEffect(
    () =>
      history.listen(() => {
        const urlFireBaseStorage = "firebasestorage";
        if (
          history.location.pathname !== "/admin/add-course" &&
          Boolean(imageUrl)
        ) {
          if (
            Boolean(imageUrl) &&
            imageUrl.indexOf(urlFireBaseStorage) !== -1
          ) {
            const image = storageInProject.refFromURL(imageUrl);
            image
              .delete()
              .then((response) => response)
              .catch((err) => {
                console.warn(err);
              });
          }
        }
      }),
    [imageUrl]
  );

  return (
    <section>
      <div className="admin-content__add-course add-course">
        <h2 className="add-course__title">
          Fill in all fields to add new course
        </h2>
        <AddCourseForm
          authorCourse={authorCourse}
          checkIsImageLoaded={checkIsImageLoaded}
          description={description}
          fileImg={fileImg}
          handleAddImage={handleAddImage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleValidateMsg={handleValidateMsg}
          imagePath={imagePath}
          inputFileRef={inputFileRef}
          onStock={onStock}
          partClass={partClass}
          priceCourse={priceCourse}
          setCheckIsImageLoaded={setCheckIsImageLoaded}
          setFileImg={setFileImg}
          setImageUrl={setImageUrl}
          setIsAddAdvert={setIsAddAdvert}
          setpartClass={setpartClass}
          titleCourse={titleCourse}
          showHideImgDiv={showHideImgDiv}
          validationMsg={validationMsg}
        />
      </div>
    </section>
  );
};

export default withRouter(AddCourse);
