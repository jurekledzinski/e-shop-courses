import React, { useContext, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";

import "./ManagementSlider.scss";

import { StoreContext } from "../../../../../../../store/StoreProvider";
import { storageInProject } from "../../../../../../../firebase/configfirebase";

import {
  advertOptionCreate,
  addAdvertSlider,
} from "../../../../../../../utils/sessions";

import ManagementSliderForm from "./ManagementSliderForm";
import ReturnMsgAlertSuccess from "../../../../../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

const ManagementSlider = ({ history }) => {
  const {
    adjustValidationMsg,
    advertOptions,
    allAdvertsSlider,
    setAllAdvertsSlider,
    setAdvertOptions,
    setErrorServerMsg,
    setIsOwnAdverts,
    user,
    validationMsg,
  } = useContext(StoreContext);

  const [checkIsImageLoaded, setCheckIsImageLoaded] = useState(true);
  const [chooseOption, setChooseOption] = useState("Latest Products");
  const [colorDescription, setColorDescription] = useState("#000000");
  const [colorTitle, setColorTitle] = useState("#000000");
  const [description, setDescription] = useState("");
  const [isAddAdvert, setIsAddAdvert] = useState(false);
  const [image, setImage] = useState("");
  const [imageOwn, setImageOwn] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [partClass, setpartClass] = useState("");
  const [showHideImgDiv, setShowHideImgDiv] = useState(false);
  const [title, setTitle] = useState("");

  const refInputFile = useRef();
  const isMount = useRef(null);
  const timeOutClear = useRef(null);

  const typeFileImage = ["image/jpeg", "image/png"];

  const handleTitleImage = ({ target: { value } }) => {
    setTitle(value);
  };
  const handleDescription = ({ target: { value } }) => {
    setDescription(value);
  };
  const handleAddImage = ({ target: { value } }) => {
    setImage(value);
    setCheckIsImageLoaded(false);
  };

  const handleChangeColorTitle = ({ target: { value } }) => {
    setColorTitle(value);
  };

  const handleChangeColorDescription = ({ target: { value } }) => {
    setColorDescription(value);
  };

  const handleValidateMsg = (message) => {
    if (message) {
      adjustValidationMsg(message);
      timeOutClear.current =
        isMount.current &&
        setTimeout(() => {
          adjustValidationMsg("");
          setIsAddAdvert(false);
        }, 1500);
    }
  };

  const handleAddOwnImage = (e) => {
    let currentAddAdvertDate = new Date();
    let currentMilliseconds = currentAddAdvertDate.getTime().toString();
    let choosedFile = e.target.files[0];

    if (choosedFile) {
      Object.defineProperty(choosedFile, "name", {
        value: choosedFile.name,
        writable: true,
      });

      choosedFile.name = `${choosedFile.name}-${currentMilliseconds}`;
    }

    if (choosedFile && typeFileImage.includes(choosedFile.type)) {
      setImageOwn(choosedFile);
      setShowHideImgDiv(true);
    } else {
      setImageOwn(null);
      setShowHideImgDiv(false);
      setpartClass("alert");
      handleValidateMsg("Please choose image valid format, like jpeg or png");
    }
  };

  const handleChooseOptions = async (e) => {
    e.preventDefault();

    const advertOption = {
      option: chooseOption,
      userId: user.userId,
    };

    const { data, status } = await advertOptionCreate(advertOption);

    setpartClass(Object.keys(data)[0]);

    if (status === 200 && isMount.current) {
      setAdvertOptions(data.option);
      handleValidateMsg(data.success);
    } else {
      setErrorServerMsg(data);
    }
  };

  const claerForm = () => {
    setCheckIsImageLoaded(true);
    setDescription("");
    setTitle("");
    setImage("");
    setImageOwn(null);
    setShowHideImgDiv(false);
    refInputFile.current.value = "";
  };

  const handleAddAdvertise = async (e) => {
    e.preventDefault();

    const advertOption = {
      option: chooseOption,
      userId: user.userId,
    };

    if (advertOption) {
      const { data, status } = await advertOptionCreate(advertOption);
      if (status === 200 && isMount.current) {
        setAdvertOptions(data.option);
      }
    }

    const advertImage = {
      title: title,
      description: description,
      imagePath: image ? image : imageUrl,
      colorDescription,
      colorTitle,
    };

    const { data, status } = await addAdvertSlider(advertImage);

    setpartClass(Object.keys(data)[0]);

    if (status === 200 && isMount.current) {
      setIsAddAdvert(true);
      setImageUrl(null);
      handleValidateMsg(data.success);
      setAllAdvertsSlider([...allAdvertsSlider, data.advert]);
      setIsOwnAdverts(true);
      claerForm();
    }

    status !== 200 && isMount.current ? setErrorServerMsg(data) : null;
  };

  const handleChooseAdvertiseOption = ({ target: { value } }) => {
    setChooseOption(value);
  };

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeOutClear.current);
  }, []);

  useEffect(
    () =>
      history.listen(() => {
        const fireBaseUrlStorage = "firebasestorage";
        if (
          history.location.pathname !== "/admin/management-shop" &&
          Boolean(imageUrl)
        ) {
          if (
            Boolean(imageUrl) &&
            imageUrl.indexOf(fireBaseUrlStorage) !== -1
          ) {
            const image = storageInProject.refFromURL(imageUrl);
            image
              .delete()
              .then((responese) => responese)
              .catch((err) => {
                console.warn(err);
              });
          }
        }
      }),
    [imageUrl]
  );

  const validateChoosedOption =
    validationMsg && !isAddAdvert ? (
      <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
    ) : null;

  return (
    <section>
      <div className="admin-content__management-slider management-slider">
        <h2 className="management-slider__title">
          Choose options to add advertise to slider:
        </h2>
        <p className="management-slider__option">
          Your current adverts option: {advertOptions}
        </p>
        {validateChoosedOption}
        <ManagementSliderForm
          advertOptions={advertOptions}
          checkIsImageLoaded={checkIsImageLoaded}
          chooseOption={chooseOption}
          colorDescription={colorDescription}
          colorTitle={colorTitle}
          description={description}
          handleAddAdvertise={handleAddAdvertise}
          handleAddImage={handleAddImage}
          handleAddOwnImage={handleAddOwnImage}
          handleChangeColorDescription={handleChangeColorDescription}
          handleChangeColorTitle={handleChangeColorTitle}
          handleChooseAdvertiseOption={handleChooseAdvertiseOption}
          handleChooseOptions={handleChooseOptions}
          handleDescription={handleDescription}
          handleTitleImage={handleTitleImage}
          handleValidateMsg={handleValidateMsg}
          image={image}
          imageOwn={imageOwn}
          inputFileRef={refInputFile}
          isAddAdvert={isAddAdvert}
          partClass={partClass}
          setCheckIsImageLoaded={setCheckIsImageLoaded}
          setImageOwn={setImageOwn}
          setImageUrl={setImageUrl}
          setIsAddAdvert={setIsAddAdvert}
          setpartClass={setpartClass}
          showHideImgDiv={showHideImgDiv}
          title={title}
          validationMsg={validationMsg}
        />
      </div>
    </section>
  );
};

export default withRouter(ManagementSlider);
