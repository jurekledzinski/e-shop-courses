import React from "react";

import "./AddCourseForm.scss";

import ProgressBar from "../../../../../../../progressBar/progressBar";
import ReturnMsgAlertSuccess from "../../../../../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

const AddCourseForm = ({
  authorCourse,
  checkIsImageLoaded,
  description,
  fileImg,
  handleAddImage,
  handleChange,
  handleSubmit,
  handleValidateMsg,
  imagePath,
  inputFileRef,
  onStock,
  partClass,
  priceCourse,
  setCheckIsImageLoaded,
  setFileImg,
  setImageUrl,
  setIsAddAdvert,
  setpartClass,
  showHideImgDiv,
  titleCourse,
  validationMsg,
}) => {
  const showProgressBar = Boolean(fileImg) && (
    <ProgressBar
      handleValidateMsg={handleValidateMsg}
      setCheckIsImageLoaded={setCheckIsImageLoaded}
      uploadFile={fileImg}
      setFileImg={setFileImg}
      setImageUrl={setImageUrl}
      setIsAddAdvert={setIsAddAdvert}
      setpartClass={setpartClass}
    />
  );

  const messageValidation = validationMsg ? (
    <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
  ) : null;

  return (
    <form className="add-course__form" onSubmit={handleSubmit}>
      {messageValidation}
      {showProgressBar}
      <div className="add-course__wrap-input">
        <input
          type="text"
          className="add-course__input"
          name="title"
          onChange={handleChange}
          value={titleCourse}
          placeholder="Title"
          required
        />
        <label className="add-course__label">Course title:</label>
        <span className="add-course__border" />
      </div>
      <div
        className={
          showHideImgDiv
            ? "add-course__wrap-input--inactive"
            : "add-course__wrap-input"
        }
      >
        <input
          type="text"
          className="add-course__input"
          name="imagePath"
          onChange={handleChange}
          value={imagePath}
          placeholder="Image url address"
          required={showHideImgDiv === true ? false : true}
        />
        <label className="add-course__label">Image url address:</label>
        <span className="add-course__border" />
      </div>
      <div
        className={
          imagePath
            ? "add-course__wrap-input-file--inactive"
            : "add-course__wrap-input-file"
        }
      >
        <input
          className="add-course__add-input-file"
          name="file"
          onChange={handleAddImage}
          type="file"
          required={Boolean(imagePath) === true ? false : true}
          ref={inputFileRef}
        />
        <span className="add-course__border" />
      </div>
      <div className="add-course__wrap-input">
        <textarea
          type="text"
          className="add-course__input add-course__input-textarea"
          name="description"
          onChange={handleChange}
          value={description}
          placeholder="Description"
          required
        />
        <label className="add-course__label">Description:</label>
        <span className="add-course__border" />
      </div>
      <div className="add-course__wrap-input">
        <input
          type="number"
          className="add-course__input"
          min="0"
          name="price"
          onChange={handleChange}
          value={priceCourse}
          placeholder="Price"
          required
        />
        <label className="add-course__label">Price:</label>
        <span className="add-course__border" />
      </div>
      <div className="add-course__wrap-input">
        <input
          type="text"
          className="add-course__input"
          name="author"
          onChange={handleChange}
          value={authorCourse}
          placeholder="Author"
          required
        />
        <label className="add-course__label">Author:</label>
        <span className="add-course__border" />
      </div>
      <div className="add-course__wrap-input">
        <input
          type="number"
          className="add-course__input"
          min="0"
          name="onStock"
          onChange={handleChange}
          value={onStock}
          placeholder="On Stock"
          required
        />
        <label className="add-course__label">On stock:</label>
        <span className="add-course__border" />
      </div>
      <button
        className="add-course__btn"
        type="submit"
        disabled={imagePath ? false : checkIsImageLoaded}
      >
        Add course
      </button>
    </form>
  );
};

export default AddCourseForm;
