import React, { useEffect, useState } from "react";
import { storageInProject } from "../firebase/configfirebase";

const useDeleteImage = (fileUrl) => {
  const urlWordFireBase = "firebasestorage";
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("");

  const deleteImageInFirebase = () => {
    setActive((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (Boolean(fileUrl) && fileUrl.indexOf(urlWordFireBase) !== -1) {
      const image = storageInProject.refFromURL(fileUrl);
      image
        .delete()
        .then(() => {
          setMsg("Image removed succesfully");
        })
        .catch((err) => {
          setMsg(err);
        });
    }
  }, [active]);

  return { deleteImageInFirebase };
};
export default useDeleteImage;
