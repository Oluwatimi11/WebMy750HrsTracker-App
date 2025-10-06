import React, { useCallback, useMemo, useState } from "react";
import TopSection from "../../../components/molecules/top-section/top-section.component";
import styles from "./record-time.module.scss";
import FileUpload from "../../../components/atoms/file-upload/file-upload.component";
import Button, {
    BUTTON_TYPE_CLASSES,
} from "../../../components/atoms/button/button.component";
import styled from "styled-components";
import FormDropDown from "../../../components/atoms/form-dropdown/form-dropDown.component";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import FormInput from "../../../components/atoms/form-input/form-input.component";
import { useStore } from "../../../../store";
import {
    useCreateRecord,
    useGetLogActivities,
    useGetLogCategories,
} from "../../../../hooks/activity-log";
import { recordCategoryKeys, propertyType } from "../../../constants";
import { useGetTeamMembers } from "../../../../hooks/team-members";
import { useGetProperties } from "../../../../hooks/properties";
import { mapOptions } from "./utils";
import { useUserDetail } from "../../../../hooks/user";

var topContent = {
    dashboardPage: "Record Time",
    searchComponent: false,
    searchTitle: null,
    filterButton: false,
    timer: true,
};

var myform = [
    {
        label: "Date",
        type: "date",
        name: "activityDate",
    },
    {
        label: "Time Spent",
        type: "time",
        name: "timeSpent",
    },
];

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

const RecordTime = observer(() => {
    const { rentalType } = useStore();
    const { id } = useUserDetail();
    const [uploadedFileCount, setUploadedFileCount] = useState(0);

    const handleFileUpload = (count) => {
        setUploadedFileCount(count);
    };

    const { createRecord, isPending } = useCreateRecord();
    const {
        clientData: { teamMembers },
    } = useGetTeamMembers();
    const {
        clientData: { properties },
    } = useGetProperties();
    const {
        clientData: {
            categories,
            generalActivityCategories,
            materialParticipationCategories,
            attemptedPropertyAcquisitionGAT,
            generalNetworkingGAT,
            investorHoursGAT,
            leasingAndBrokerageGAT,
            propertyConstructionReconstructionMPT,
            propertyManagementAndOperationMPT,
            realEstateProfessionalEducationGAT,
            successfulPropertyAcquisitionMPT,
        },
    } = useGetLogCategories();
    const {
        clientData: { activities },
    } = useGetLogActivities();

    const teamMembersOptions = useMemo(
        () => mapOptions(teamMembers),
        [teamMembers]
    );
    const propertiesOptions = useMemo(
        () => mapOptions(properties),
        [properties]
    );
    const logActivitiesOptions = useMemo(
        () => mapOptions(activities),
        [activities]
    );

    const STRDropdownOptions = useMemo(
        () => [
            {
                category: "team members",
                initial: "activityById",
                optionList: teamMembersOptions,
            },
            {
                category: "activity",
                initial: "activityLogActivityId",
                optionList: logActivitiesOptions,
            },
            {
                category: "property",
                initial: "propertiesIds",
                optionList: propertiesOptions,
            },
        ],
        [teamMembersOptions, logActivitiesOptions, propertiesOptions]
    );

    const renderTaskOptions = useCallback(
        (values, setFieldValue) => {
            const { activity } = values;

            const isGeneralActivity =
                activity === recordCategoryKeys.attemptedPropertyAcquisitions ||
                activity === recordCategoryKeys.leasingAndBrokerage ||
                activity ===
                    recordCategoryKeys.realEstateProfessionalEducation ||
                activity === recordCategoryKeys.generalNetworking ||
                activity === recordCategoryKeys.investorHours;

            const isMaterialParticipation =
                activity === recordCategoryKeys.successfulPropertyAcquisition ||
                activity ===
                    recordCategoryKeys.propertyManagementAndOperations ||
                activity ===
                    recordCategoryKeys.propertyConstructionReconstruction;

            const getOptionsList = () => {
                if (isGeneralActivity) {
                    switch (activity) {
                        case recordCategoryKeys.attemptedPropertyAcquisitions:
                            return attemptedPropertyAcquisitionGAT;
                        case recordCategoryKeys.leasingAndBrokerage:
                            return leasingAndBrokerageGAT;
                        case recordCategoryKeys.realEstateProfessionalEducation:
                            return realEstateProfessionalEducationGAT;
                        case recordCategoryKeys.generalNetworking:
                            return generalNetworkingGAT;
                        case recordCategoryKeys.investorHours:
                            return investorHoursGAT;
                        default:
                            return null;
                    }
                } else if (isMaterialParticipation) {
                    switch (activity) {
                        case recordCategoryKeys.successfulPropertyAcquisition:
                            return successfulPropertyAcquisitionMPT;
                        case recordCategoryKeys.propertyManagementAndOperations:
                            return propertyManagementAndOperationMPT;
                        case recordCategoryKeys.propertyConstructionReconstruction:
                            return propertyConstructionReconstructionMPT;
                        default:
                            return null;
                    }
                }
                return null;
            };

            const optionsList = getOptionsList();

            if (isGeneralActivity || isMaterialParticipation) {
                return (
                    <FormDropDown
                        optionList={optionsList}
                        labelName="task"
                        initialName="task"
                        className={styles["entry__dropdown--form"]}
                    />
                );
            } else {
                resetFieldValue(setFieldValue, "task", values);
            }

        },
        [
            attemptedPropertyAcquisitionGAT,
            generalNetworkingGAT,
            investorHoursGAT,
            leasingAndBrokerageGAT,
            propertyConstructionReconstructionMPT,
            propertyManagementAndOperationMPT,
            realEstateProfessionalEducationGAT,
            successfulPropertyAcquisitionMPT,
        ]
    );

    const renderActivityCategoryOptions = useCallback(
        (values, setFieldValue) => {
            const showGeneralActivity =
                values.activityCategory === recordCategoryKeys.generalActivity;
            const showMaterialParticipation =
                values.activityCategory ===
                recordCategoryKeys.materialParticipation;

            if (showGeneralActivity || showMaterialParticipation) {
                return (
                    <>
                        <FormDropDown
                            optionList={
                                showGeneralActivity
                                    ? generalActivityCategories
                                    : materialParticipationCategories
                            }
                            labelName="activity"
                            initialName="activity"
                            className={styles["entry__dropdown--form"]}
                        />
                        {renderTaskOptions(values, setFieldValue)}
                    </>
                );
            }
            else {
                resetFieldValue(setFieldValue, "activity", values);
            }
        },
        [
            generalActivityCategories,
            materialParticipationCategories,
            renderTaskOptions,
        ]
    );

    const renderTimeCategoryOptions = useCallback(
        (values, setFieldValue) => {
            
            if (values.timeCategory === "Real Estate") {
                return (
                    <>
                        <FormDropDown
                            labelName="Property"
                            initialName="propertiesIds"
                            optionList={propertiesOptions}
                            className={styles["entry__dropdown--form"]}
                        />
                        <FormDropDown
                            optionList={categories}
                            labelName="activity category"
                            initialName="activityCategory"
                            className={styles["entry__dropdown--form"]}
                        />
                        {renderActivityCategoryOptions(values, setFieldValue)}
                    </>
                );
            } else {
                resetFieldValue(setFieldValue, "activityCategory", values);
            }
        },
        [propertiesOptions, categories, renderActivityCategoryOptions]
    );

    const handleSubmit = useCallback(
        async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            const { timeSpent, evidence, propertiesIds, } = values;

            const timeData = timeSpent.split(":");
            const hourSpent = timeData[0];
            const minSpent = timeData[1];

            const { name, type, size } = evidence;
            const nameSplit = name.split(".");
            const fileName = name;
            const contentType = type;
            const fileExtension = nameSplit[1];
            const dataSize = size;

            try {
                !isPending &&
                    await createRecord(rentalType, {
                        ...values,
                        hoursSpent: hourSpent,
                        minutesSpent: minSpent,
                        secondsSpent: "00",
                        propertiesIds: [propertiesIds],
                        propertyType: propertyType[rentalType],
                        name: id,
                        supportingDocuments: [
                            {
                                fileName,
                                fileExtension,
                                contentType,
                                data: btoa(dataSize.toString()),
                            },
                        ],
                    });
                resetForm();
            } finally {
                setSubmitting(false);
            }
        },
        [createRecord, rentalType, isPending, id]
    );

    const resetFieldValue = (setFieldValue, field, values) => {
        if (values[field]) {
            setFieldValue(field, "");
        }
    };

    return (
        <div className={styles["entry__main--div"]}>
            <TopSection content={topContent} />
            <div className={styles["entry__div"]}>
                <Formik
                    initialValues={{
                        activityDate: "",
                        timeSpent: "",
                        description: "",
                        activityById: "",
                        activityLogActivityId: "",
                        propertiesIds: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        isSubmitting,
                        handleChange,
                        setFieldValue,
                    }) => (
                        <Form className={styles["entry__form"]}>
                            <div className={styles["entry__field--form"]}>
                                {myform.map((el, i) => {
                                    const { label, name, type } = el;
                                    return (
                                        <FormInput
                                            label={label}
                                            name={name}
                                            type={type}
                                            key={i}
                                            className={
                                                styles[
                                                    "entry__field--form-input"
                                                ]
                                            }
                                        />
                                    );
                                })}
                            </div>
                            <div>
                                <div className={styles["entry__dropdown--div"]}>
                                    {rentalType === "ltr" ? (
                                        <>
                                            <FormDropDown
                                                optionList={[
                                                    {
                                                        id: 1,
                                                        myValue: "Real Estate",
                                                        address: "Real Estate",
                                                    },
                                                    {
                                                        id: 2,
                                                        myValue:
                                                            "Non Real Estate",
                                                        address:
                                                            "Non Real Estate",
                                                    },
                                                ]}
                                                labelName="time category"
                                                initialName="timeCategory"
                                                className={
                                                    styles[
                                                        "entry__dropdown--form"
                                                    ]
                                                }
                                            />
                                            {renderTimeCategoryOptions(
                                                values,
                                                setFieldValue
                                            )}
                                        </>
                                    ) : (
                                        STRDropdownOptions.map((el, i) => {
                                            const {
                                                optionList,
                                                category,
                                                initial,
                                            } = el;
                                            return (
                                                <FormDropDown
                                                    optionList={optionList}
                                                    labelName={category}
                                                    initialName={initial}
                                                    className={
                                                        styles[
                                                            "entry__dropdown--form"
                                                        ]
                                                    }
                                                />
                                            );
                                        })
                                    )}
                                </div>
                                <div className={styles["entry__textarea--div"]}>
                                    <label
                                        className={
                                            styles["entry__textarea--textlabel"]
                                        }
                                    >
                                        Description of activity
                                    </label>
                                    <textarea
                                        placeholder="Describe activity here"
                                        name="description"
                                        onChange={handleChange}
                                        rows="8"
                                        cols="55"
                                        className={
                                            styles["entry__textarea--area"]
                                        }
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <h4>
                                    Supporting Document {uploadedFileCount}/10
                                </h4>
                                <FileUpload
                                    className={styles["entry__upload--area"]}
                                    onFileUpload={handleFileUpload}
                                    fileType="SVG, PNG, JPG, or GIF(max. 800x400px) "
                                    name="evidence"
                                    fileMax={10}
                                    handleChange={handleChange}
                                />
                            </div>
                            <UploadButton
                                buttonType={BUTTON_TYPE_CLASSES.curved}
                                isLoading={isSubmitting}
                                type="submit"
                                className={styles["entry__bottom--btn"]}
                            >
                                Save
                            </UploadButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
});

export default RecordTime;
