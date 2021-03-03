import React, { useEffect, useRef, useState } from "react";
import { storageInProject } from "../firebase/configfirebase";

const useUploadStorage = (file) => {
  const [progressUpload, setProgressUpload] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [urlLink, setUrlLink] = useState(null);

  const isMounted = useRef();

  useEffect(() => {
    isMounted.current = true;
    const storageRef = storageInProject.ref(file.name).put(file);

    storageRef.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressUpload(progress);
      },
      (err) => {
        setErrorMsg(err);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          if (isMounted.current) {
            setUrlLink(downloadURL);
          }
        });
      }
    );

    return () => {
      isMounted.current = false;
    };
  }, [file]);

  return { errorMsg, progressUpload, urlLink };
};

export default useUploadStorage;
