import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { TweenMax, Power3 } from "gsap";

import { StoreContext } from "../../../../../../../store/StoreProvider";
import { updateCourse } from "../../../../../../../utils/sessions";
import { storageInProject } from "../../../../../../../firebase/configfirebase";

import Modal from "../../../../../../others/modal/Modal";

import EditForm from "./EditForm";

const EditCourseForm = ({
  currentValueCourse,
  handleCloseEditModal,
  isEditModalOpen,
  isTurnOnEditForm,
  isPossibleToCloseModalOnDiv,
}) => {
  const {
    adjustValidationMsg,
    courses,
    setCourses,
    validationMsg,
  } = useContext(StoreContext);

  const [author, setAuthorCourse] = useState("");
  const [amount, setAmount] = useState("");
  const [checkIsImageLoaded, setCheckIsImageLoaded] = useState(true);
  const [description, setDescription] = useState("");
  const [fileImg, setFileImg] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isAddAdvert, setIsAddAdvert] = useState(false);
  const [title, setTitleCourse] = useState("");
  const [price, setPriceCourse] = useState("");
  const [partClass, setpartClass] = useState("");
  const [showHideImgDiv, setShowHideImgDiv] = useState(false);

  const editFormRef = useRef(null);
  const fileRefInput = useRef();

  const history = useHistory();

  const urlChecker = history.location.pathname;
  const isUrlEdit = urlChecker === "/edit-product";

  const typeFile = ["image/jpeg", "image/png"];

  const clearForm = () => {
    setTitleCourse("");
    setImagePath("");
    setPriceCourse("");
    setAuthorCourse("");
    setAmount("");
    setDescription("");
    fileRefInput.current.value = "";
  };

  const handleValidateMsg = (message) => {
    if (message) {
      adjustValidationMsg(message);
      setTimeout(() => {
        adjustValidationMsg("");
      }, 1500);
    } else {
      return adjustValidationMsg(message);
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
      setAmount(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleAddImage = (e) => {
    let currentEditTime = new Date();
    let timeEditMilliseconds = currentEditTime.getTime().toString();
    let fileImage = e.target.files[0];
    Object.defineProperty(fileImage, "name", {
      value: fileImage.name,
      writable: true,
    });

    fileImage.name = `${fileImage.name}-${timeEditMilliseconds}`;

    if (fileImage && typeFile.includes(fileImage.type)) {
      setFileImg(fileImage);
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

    const word = "firebasestorage";

    if (
      imagePath !== currentValueCourse.imagePath &&
      currentValueCourse.imagePath.indexOf(word) !== -1
    ) {
      try {
        const image = storageInProject.refFromURL(currentValueCourse.imagePath);
        image
          .delete()
          .then((response) => response)
          .catch((err) => {
            handleValidateMsg("Something went wrong,please try again");
          });
      } catch (err) {
        console.warn(err);
      }
    }

    let dateMilliseconds = new Date().getTime();
    let dateString = new Date().toISOString().slice(0, 10);

    const newCourse = {
      _id: currentValueCourse._id,
      title,
      imagePath: imagePath ? imagePath : imageUrl,
      price,
      author,
      amount: parseInt(amount),
      description,
      averageRate: currentValueCourse.averageRate,
      dateMilliseconds,
      dateString,
    };

    const { data, status } = await updateCourse(newCourse);

    setpartClass(Object.keys(data)[0]);

    if (status === 200) {
      handleValidateMsg(data.success);
      const copyCourses = [...courses];

      let editedCourse = copyCourses.map((item) => {
        if (item._id === data.course._id) {
          return {
            ...item,
            title: data.course.title,
            imagePath: data.course.imagePath,
            price: data.course.price,
            author: data.course.author,
            amount: data.course.amount,
            description: data.course.description,
            averageRate: data.course.averageRate,
          };
        }
        return item;
      });

      setCourses(editedCourse);

      clearForm();
      setTimeout(() => {
        isUrlEdit ? null : handleCloseEditModal();
      }, 1000);
    } else {
      handleValidateMsg(data.alert);
    }
  };

  const handleCloseModalByButtonX = () => {
    const fireBaseStorageUrl = "firebasestorage";
    if (Boolean(imageUrl) && imageUrl.indexOf(fireBaseStorageUrl) !== -1) {
      const image = storageInProject.refFromURL(imageUrl);
      image
        .delete()
        .then((response) => response)
        .catch((err) => {
          console.warn(err);
        });
    }
    isUrlEdit ? null : handleCloseEditModal();
  };

  useEffect(() => {
    setTitleCourse(currentValueCourse.title);
    setImagePath(currentValueCourse.imagePath);
    setPriceCourse(currentValueCourse.price);
    setAuthorCourse(currentValueCourse.author);
    setAmount(currentValueCourse.amount);
    setDescription(currentValueCourse.description);
  }, []);

  useEffect(() => {
    if (editFormRef.current) {
      TweenMax.to(editFormRef.current, 0.8, {
        opacity: 1,
        y: 0,
        ease: Power3.easeOut,
      });
    }
  }, [isTurnOnEditForm]);

  return (
    <Modal
      handleClose={handleCloseEditModal}
      isOpen={isEditModalOpen}
      unavailableToCloseModalClickOnDiv={isPossibleToCloseModalOnDiv}
    >
      <EditForm
        amount={amount}
        author={author}
        checkIsImageLoaded={checkIsImageLoaded}
        description={description}
        editFormRef={editFormRef}
        fileImg={fileImg}
        handleAddImage={handleAddImage}
        handleChange={handleChange}
        handleCloseModalByButtonX={handleCloseModalByButtonX}
        handleSubmit={handleSubmit}
        handleValidateMsg={handleValidateMsg}
        imagePath={imagePath}
        inputFileRef={fileRefInput}
        partClass={partClass}
        price={price}
        setCheckIsImageLoaded={setCheckIsImageLoaded}
        setFileImg={setFileImg}
        showHideImgDiv={showHideImgDiv}
        setIsAddAdvert={setIsAddAdvert}
        setImageUrl={setImageUrl}
        setpartClass={setpartClass}
        title={title}
        validationMsg={validationMsg}
      />
    </Modal>
  );
};

export default EditCourseForm;
