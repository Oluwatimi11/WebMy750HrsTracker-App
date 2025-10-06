import React, { useState } from "react";
import TopSection from "../../../components/molecules/top-section/top-section.component";
import FileUpload from "../../../components/atoms/file-upload/file-upload.component";
import styles from "./import-hours.module.scss";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../components/atoms/button/button.component";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { useStore } from "../../../../store";
import { useCreateImportHours } from "../../../../hooks/import-hours";

var topContent = {
  dashboardPage: "Import Hours",
  searchComponent: null,
  searchTitle: null,
  filterButton: false,
  timer: null,
};

export const UploadButton = styled(Button)`
  width: 213px;
  height: 49px;
  border-radius: 50px;
  align-self: left;
  margin-top: 3rem;
  margin-left: 25%;
  font-size: 18px;
  font-weight: 500;
`;

const ImportHours = () => {
  const { isPending, mutate: createImportHours } = useCreateImportHours();

  const [uploadedFileCount, setUploadedFileCount] = useState(0);

  const handleFileUpload = (count) => {
    setUploadedFileCount(count);
  };


  const handleImport = async (values, { setSubmitting, resetForm }) => {
   const { name, type, size } = values.upload;
   const nameSplit = name.split(".");
   const fileName = name;
   const contentType = type;
   const fileExtension = nameSplit[1];
   const dataSize = size;
 
   try {
     if (!isPending) {
       await createImportHours({
         ...values,
         supportingDocuments: [
           {
             fileName: fileName,
             fileExtension: fileExtension,
             contentType: contentType,
             data: btoa(dataSize.toString())
           }
         ],
       });
       resetForm();
     }
   } catch (error) {
       throw error;
     } finally {
       setSubmitting(false);
     }
   };



  return (
    <div className={styles["import__main--div"]}>
      <TopSection content={topContent} />
      <div className={styles["import__div"]}>
        <Formik initialValues={{ upload: "" }} onSubmit={handleImport}>
          {({ values, isSubmitting, handleChange }) => (
            <Form className={styles["entry__form"]}>
              <div>
                <h4>Upload hours</h4>
              </div>
              <div className={styles["import__upload--div"]}>
                <FileUpload
                  fileType=".CSV format"
                  onFileUpload={handleFileUpload}
                  name="upload"
                  fileMax={1}
                  handleChange={handleChange}
                />
                <UploadButton
                  buttonType={BUTTON_TYPE_CLASSES.curved}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Save
                </UploadButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ImportHours;