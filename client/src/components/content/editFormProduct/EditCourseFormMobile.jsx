import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { NavContext } from "../../../store/NavProvider";
import { StoreContext } from "../../../store/StoreProvider";
import { updateCourse } from "../../../utils/sessions";
import { storageInProject } from "../../../firebase/configfirebase";

import EditForm from "../adminpage/insideAdminPage/adminDashboard/contentAdmin/adminOptions/EditForm";

const EditCourseFormMobile = () => {
  const { checkSizeWindow } = useContext(NavContext);
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
  const productData = history.location.state.product;

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
      imagePath !== productData.imagePath &&
      productData.imagePath.indexOf(word) !== -1
    ) {
      try {
        const image = storageInProject.refFromURL(productData.imagePath);
        image
          .delete()
          .then((response) => response)
          .catch((err) => {
            handleValidateMsg("Something went wrong,please try again");
          });
      } catch (err) {
        handleValidateMsg("Something went wrong,please try again");
      }
    }

    let dateMilliseconds = new Date().getTime();
    let dateString = new Date().toISOString().slice(0, 10);

    const newCourse = {
      _id: productData._id,
      title,
      imagePath: imagePath ? imagePath : imageUrl,
      price,
      author,
      amount: parseInt(amount),
      description,
      averageRate: productData.averageRate,
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
      setTimeout(() => history.push("/admin/edit-course"), 400);
    } else {
      handleValidateMsg(data.alert);
    }
  };

  useEffect(
    () =>
      history.listen(() => {
        const urlFireBaseStorage = "firebasestorage";
        if (
          history.location.pathname !== "/admin/edit-course" &&
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

  useEffect(() => {
    setTitleCourse(productData.title);
    setImagePath(productData.imagePath);
    setPriceCourse(productData.price);
    setAuthorCourse(productData.author);
    setAmount(productData.amount);
    setDescription(productData.description);
  }, []);

  useEffect(() => {
    if (checkSizeWindow) {
      history.push("/admin/edit-course");
    }
  }, [checkSizeWindow]);

  return (
    <EditForm
      amount={amount}
      author={author}
      checkIsImageLoaded={checkIsImageLoaded}
      description={description}
      editFormRef={editFormRef}
      fileImg={fileImg}
      handleAddImage={handleAddImage}
      handleChange={handleChange}
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
  );
};

export default EditCourseFormMobile;
