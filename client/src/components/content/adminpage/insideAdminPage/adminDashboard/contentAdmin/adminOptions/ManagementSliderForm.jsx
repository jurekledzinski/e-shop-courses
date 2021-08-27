import React from "react";

import "./ManagementSliderForm.scss";

import ProgressBar from "../../../../../../../progressBar/progressBar";
import ReturnMsgAlertSuccess from "../../../../../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

const ManagementSliderForm = ({
  advertOptions,
  checkIsImageLoaded,
  chooseOption,
  colorDescription,
  colorTitle,
  description,
  handleAddAdvertise,
  handleAddImage,
  handleAddOwnImage,
  handleChangeColorDescription,
  handleChangeColorTitle,
  handleChooseAdvertiseOption,
  handleChooseOptions,
  handleDescription,
  handleTitleImage,
  handleValidateMsg,
  image,
  imageOwn,
  inputFileRef,
  isAddAdvert,
  partClass,
  setCheckIsImageLoaded,
  setImageOwn,
  setImageUrl,
  setIsAddAdvert,
  setpartClass,
  showHideImgDiv,
  title,
  validationMsg,
}) => {
  const showProgressBar = Boolean(imageOwn) && (
    <ProgressBar
      handleValidateMsg={handleValidateMsg}
      setIsAddAdvert={setIsAddAdvert}
      setCheckIsImageLoaded={setCheckIsImageLoaded}
      setFileImg={setImageOwn}
      setImageUrl={setImageUrl}
      setpartClass={setpartClass}
      uploadFile={imageOwn}
    />
  );

  const validateAddAdvertMsg =
    validationMsg && isAddAdvert ? (
      <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
    ) : null;

  return (
    <div className="management-slider__management-slider-form management-slider-form__wrapper">
      <div className="management-slider-form__options-slider">
        <form
          className="management-slider-form__form"
          onSubmit={handleChooseOptions}
        >
          <div className="management-slider-form__wrap-input-label">
            <label
              className="management-slider-form__label"
              htmlFor="lastProducts"
            >
              <input
                checked={chooseOption === "Latest Products"}
                className="management-slider-form__input"
                id="lastProducts"
                name="advertise"
                onChange={handleChooseAdvertiseOption}
                type="radio"
                value="Latest Products"
              />
              3 the latest products
            </label>
          </div>
          <div className="management-slider-form__wrap-input-label">
            <label
              className="management-slider-form__label"
              htmlFor="topProducts"
            >
              <input
                checked={chooseOption === "Top Rated Products"}
                className="management-slider-form__input"
                id="topProducts"
                name="advertise"
                onChange={handleChooseAdvertiseOption}
                type="radio"
                value="Top Rated Products"
              />
              3 top rated products
            </label>
          </div>
          <div className="management-slider-form__wrap-input-label">
            <label
              className="management-slider-form__label"
              htmlFor="addAdvert"
            >
              <input
                checked={chooseOption === "Added own adverts"}
                className="management-slider-form__input"
                id="addAdvert"
                name="advertise"
                onChange={handleChooseAdvertiseOption}
                type="radio"
                value="Added own adverts"
              />
              Turn on own adverts
            </label>
          </div>
          <button
            className="management-slider-form__choose-option-btn"
            disabled={chooseOption === advertOptions}
          >
            Submit
          </button>
        </form>
      </div>
      <div
        className={
          chooseOption === "Added own adverts"
            ? "management-slider-form__add-advertise"
            : "management-slider-form__add-advertise--inactive"
        }
      >
        <h2 className="management-slider-form__title">
          Add own advertise to slider:
        </h2>
        {validateAddAdvertMsg}
        {showProgressBar}
        <form
          className="management-slider-form__form-add-advertise"
          onSubmit={handleAddAdvertise}
        >
          <div className="management-slider-form__wrap-details-with-color">
            <div className="management-slider-form__wrap-details-title">
              <input
                className="management-slider-form__add-input"
                name="title"
                onChange={handleTitleImage}
                placeholder="Title"
                type="text"
                required
                value={title}
                maxLength="120"
              />
              <label className="management-slider-form__add-label">Title</label>
              <span className="management-slider-form__border" />
            </div>
            <div className="management-slider-form__wrap-details-color-picker">
              <label
                className="management-slider-form__color-label"
                htmlFor="favcolor"
              >
                Color title:
              </label>
              <input
                className="management-slider-form__color-input"
                id="favcolor"
                name="colorTitle"
                onChange={handleChangeColorTitle}
                type="color"
                value={colorTitle}
              />
            </div>
          </div>
          <div className="management-slider-form__wrap-details-with-color">
            <div className="management-slider-form__wrap-details-description">
              <textarea
                className="management-slider-form__add-input management-slider-form__add-input--textarea"
                name="description"
                onChange={handleDescription}
                placeholder="Description"
                type="text"
                required
                value={description}
              />
              <label className="management-slider-form__add-label">
                Description
              </label>
              <span className="management-slider-form__border" />
            </div>
            <div className="management-slider-form__wrap-details-color-picker">
              <label
                className="management-slider-form__color-label management-slider-form__color-label--description"
                htmlFor="colorDesc"
              >
                Color description:
              </label>
              <input
                className="management-slider-form__color-input"
                id="colorDesc"
                name="colorDescription"
                onChange={handleChangeColorDescription}
                type="color"
                value={colorDescription}
              />
            </div>
          </div>
          <div
            className={
              showHideImgDiv
                ? "management-slider-form__wrap-details--inactive"
                : "management-slider-form__wrap-details"
            }
          >
            <input
              className="management-slider-form__add-input management-slider-form__add-input--active"
              name="image"
              onChange={handleAddImage}
              placeholder="Image url"
              type="text"
              required={showHideImgDiv === true ? false : true}
              value={image}
            />
            <label className="management-slider-form__add-label">
              Image url
            </label>
            <span className="management-slider-form__border" />
          </div>
          <div
            className={
              Boolean(image)
                ? "management-slider-form__wrap-details--inactive"
                : "management-slider-form__wrap-details"
            }
          >
            <input
              className="management-slider-form__add-input management-slider-form__add-input--file"
              name="imageOwn"
              onChange={handleAddOwnImage}
              type="file"
              required={Boolean(image) === true ? false : true}
              ref={inputFileRef}
            />
          </div>
          <button
            className="management-slider-form__add-adveritse-btn"
            disabled={checkIsImageLoaded}
          >
            Add Advertise
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagementSliderForm;
