import React from "react";

import "./EditForm.scss";

import ProgressBar from "../../../../../../../progressBar/progressBar";
import ReturnMsgAlertSuccess from "../../../../../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

const EditForm = ({
  amount,
  author,
  checkIsImageLoaded,
  description,
  editFormRef,
  fileImg,
  handleAddImage,
  handleChange,
  handleCloseModalByButtonX,
  handleSubmit,
  handleValidateMsg,
  imagePath,
  inputFileRef,
  partClass,
  price,
  showHideImgDiv,
  setIsAddAdvert,
  setCheckIsImageLoaded,
  setFileImg,
  setImageUrl,
  setpartClass,
  title,
  validationMsg,
}) => {
  const displayProgressBar = Boolean(fileImg) && (
    <ProgressBar
      handleValidateMsg={handleValidateMsg}
      setCheckIsImageLoaded={setCheckIsImageLoaded}
      uploadFile={fileImg}
      setFileImg={setFileImg}
      setIsAddAdvert={setIsAddAdvert}
      setImageUrl={setImageUrl}
      setpartClass={setpartClass}
    />
  );

  const showMsgValidation = validationMsg ? (
    <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
  ) : null;

  return (
    <form className="modal-edit" onSubmit={handleSubmit} ref={editFormRef}>
      {displayProgressBar}
      <button
        className="modal-edit__close-btn"
        type="button"
        onClick={handleCloseModalByButtonX}
      >
        <i className="fas fa-times"></i>
      </button>
      {showMsgValidation}
      <h2 className="modal-edit__title">Edit course</h2>
      <div className="modal-edit__wrap-input">
        <input
          type="text"
          className="modal-edit__input"
          maxLength="40"
          name="title"
          onChange={handleChange}
          value={title}
          placeholder="Course title"
          required
        />
        <label className="modal-edit__label">Course title:</label>
        <span className="modal-edit__border" />
      </div>
      <div
        className={
          showHideImgDiv
            ? "modal-edit__wrap-input--inactive"
            : "modal-edit__wrap-input"
        }
      >
        <input
          type="text"
          className="modal-edit__input"
          name="imagePath"
          onChange={handleChange}
          value={imagePath}
          placeholder="Image url address"
          required={showHideImgDiv === true ? false : true}
        />
        <label className="modal-edit__label">Image url address:</label>
        <span className="modal-edit__border" />
      </div>
      <div
        className={
          imagePath
            ? "modal-edit__wrap-input-file--inactive"
            : "modal-edit__wrap-input-file"
        }
      >
        <input
          className="modal-edit__add-input-file"
          name="file"
          onChange={handleAddImage}
          type="file"
          required={Boolean(imagePath) === true ? false : true}
          ref={inputFileRef}
        />
        <span className="modal-edit__border" />
      </div>
      <div className="modal-edit__wrap-input">
        <textarea
          type="text"
          className="modal-edit__input modal-edit__input--textarea"
          name="description"
          onChange={handleChange}
          value={description}
          placeholder="Description"
          required
        />
        <label className="modal-edit__label">Description:</label>
        <span className="modal-edit__border" />
      </div>
      <div className="modal-edit__wrap-input">
        <input
          type="number"
          className="modal-edit__input"
          min="0"
          name="price"
          onChange={handleChange}
          value={price}
          placeholder="Price"
          required
        />
        <label className="modal-edit__label">Price:</label>
        <span className="modal-edit__border" />
      </div>
      <div className="modal-edit__wrap-input">
        <input
          type="text"
          className="modal-edit__input"
          name="author"
          onChange={handleChange}
          value={author}
          placeholder="Author"
          required
        />
        <label className="modal-edit__label">Author:</label>
        <span className="modal-edit__border" />
      </div>
      <div className="modal-edit__wrap-input">
        <input
          type="text"
          className="modal-edit__input"
          name="onStock"
          onChange={handleChange}
          value={amount}
          placeholder="On Stock"
          required
        />
        <label className="modal-edit__label">On Stock:</label>
        <span className="modal-edit__border" />
      </div>
      <button
        className="modal-edit__btn"
        type="submit"
        disabled={imagePath ? false : checkIsImageLoaded}
      >
        Edit course
      </button>
    </form>
  );
};

export default EditForm;
