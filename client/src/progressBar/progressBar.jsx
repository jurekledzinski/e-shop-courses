import React, { useEffect } from "react";

import "./ProgressBar.scss";

import useUploadStorage from "../customHooks/useUploadStorage";

const ProgressBar = ({
  handleValidateMsg,
  setIsAddAdvert,
  setCheckIsImageLoaded,
  setFileImg,
  setImageUrl,
  setpartClass,
  uploadFile,
}) => {
  const { progressUpload, urlLink } = useUploadStorage(uploadFile);

  useEffect(() => {
    if (urlLink) {
      setIsAddAdvert(true);
      setpartClass("success");
      handleValidateMsg("Image save successfully");
      setCheckIsImageLoaded(false);
      setFileImg(null);
      setImageUrl(urlLink);
    }
  }, [urlLink]);

  return (
    <div className="progress-bar">
      <span
        className="progress-bar__scale-upload"
        style={{ width: progressUpload + "%" }}
      >
        {Math.floor(progressUpload)}%
      </span>
    </div>
  );
};
export default ProgressBar;
