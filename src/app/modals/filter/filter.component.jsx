import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./filter.module.scss";
import FormDropDown from "../../components/atoms/form-dropdown/form-dropDown.component";
import PopupLayout from "../../layouts/popup.layout/property-modal/popup-modal.component";
import { DateValidator } from "../../../utils/validation/validation.utils";
import { filterCheckBoxData, filterModalData } from "../../assets/data/popup";

var formContent = {
  heading: "Filter Logs",
  buttonText: "Filter",
  personalGrid: null,
  form: [
    {
      label: "Start Date: ",
      placeholder: "yyyy/MM/dd",
      type: "date",
      name: "startDate",
    },
    {
      label: "End Date: ",
      placeholder: "yyyy/MM/dd",
      type: "date",
      name: "endDate",
    },
  ],
};

const defaultFormFields = {
  startDate: "",
  endDate: "",
};

const validate = Yup.object({
  startDate: DateValidator,
  endDate: DateValidator,
});

const FilterModal = ({handleClose}) => {
  const navigate = useNavigate();

  const handleNextPage = async (values, { setSubmitting }) => {
    navigate("/logs");
    setTimeout(() => {
      setSubmitting(false);
    }, 4000);
  };

  return (
    <div className={styles["container"]}>
      <PopupLayout
        postChildren={
          <div>
            <div>
              {filterModalData.map((el, i) => {
                const { optionList, initial } = el;
                return (
                  <FormDropDown
                    key={optionList.id}
                    optionList={optionList}
                    labelName=""
                    initialName={initial}
                    className={styles["filter__dropdown--form"]}
                  />
                );
              })}
            </div>
            <div className={styles["filter__btm--checkbox"]}>
              {filterCheckBoxData.map((el, i) => {
                const { value, checkBoxIndex } = el;
                return (
                  <div
                    key={checkBoxIndex}
                    className={styles["filter__btm--check"]}
                  >
                    <input
                      className={styles["filter__btm--check-inp"]}
                      type="checkbox"
                      id="agreement"
                      name="agreement"
                    />
                    <label
                      className={styles["filter__btm--check-lab"]}
                      htmlFor="agreement"
                    >
                      {value}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        }
        content={formContent}
        validationSchema={validate}
        initialValue={defaultFormFields}
        handleSubmit={handleNextPage}
        handleClose={handleClose}
        // error={authStore.errorMessage}
      />
    </div>
  );
};

export default FilterModal;