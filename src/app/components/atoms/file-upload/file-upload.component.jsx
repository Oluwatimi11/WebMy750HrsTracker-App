import React, { useState } from "react";
import styles from "./file-upload.module.scss";
import { LuUploadCloud } from "react-icons/lu";

const FileUpload = ({ fileType, className, icnName, name, fileMax, onFileUpload, handleChange }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [fileCount, setFileCount] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onprogress = (event) => {
      const { loaded, total } = event;
      const progress = Math.round((loaded / total) * 100);
      setUploadProgress(progress);
    };

    reader.onload = () => {
      setFileCount((prevCount) => prevCount + 1);

      if (fileCount <= fileMax) {
        setUploadStatus("Upload successful!");
        onFileUpload(fileCount + 1);
        handleChange({ target: { name, value: file } });
      } else {
        setUploadStatus("Upload Failed, Max Upload Reached!");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div id={className} className={styles["uploader"]}>
        <input
          id="file-upload"
          type="file"
          name={name}
          accept="image/*"
          onChange={(e) => handleFileUpload(e, fileMax)}
        />

        <label htmlFor="file-upload" id="file-drag">
          <div id="start">
            <div className={styles["upload__icon--div"]} id={icnName}>
              <i className={styles["fa fa-download"]} aria-hidden="true">
                <LuUploadCloud />
              </i>
            </div>
            <div className={styles["upload__text--div"]}>
              <h3 className={styles["upload__text--head"]}>Click to upload</h3>
              <span id="notimage" className={styles["hidden"]}>
                {" "}
                or drag and drop
              </span>
            </div>
            <span id="file-upload-btn" className={styles["btn btn-primary"]}>
              {fileType}
            </span>
          </div>
          <div id="response" className={styles["hidden"]}>
            <div id="messages">{uploadStatus && <div>{uploadStatus}</div>}</div>
            <progress
              className={styles["progress"]}
              id="file-progress"
              value={uploadProgress}
            >
              <span>{uploadProgress}%</span>
            </progress>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
