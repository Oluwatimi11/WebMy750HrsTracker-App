import React, { useCallback, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import {
    FormDiv,
    FormLabel,
    FormOption,
    FormSelect,
} from "./form-dropDown.styles";
import { useField } from "formik";

const FormDropDown = observer(({ optionList, labelName, initialName }) => {
    const [meta, , helpers] = useField(initialName);

    const handleBlur = useCallback(() => helpers.setTouched(true), [helpers]);

    const handleChange = useCallback(
        (e) => {
            helpers.setValue(e.target.value);
        },
        [helpers]
    );

    const isDisabled = useMemo(() => {
        const option = optionList.find((el) => el.myValue === meta.value);
        return !!option;
    }, [optionList, meta.value]);

    const getKey = useCallback((id, index) => `${id}-${index}`, []);

    useEffect(() => {
        // reset formik value when dropdown changes
        if (meta.value) {
            const option = optionList.find((el) => el.myValue === meta.value);
            if (!option) helpers.setValue("");
        }
    
    }, [meta.value, optionList, helpers])
    

    return (
        <FormDiv className="form__dropdown--div">
            <FormLabel
                htmlFor="addresses"
                className="form__dropdown--textlabel"
            >
                {labelName}
            </FormLabel>
            <FormSelect
                name={initialName}
                id="addresses"
                className="form__dropdown--select"
                onChange={handleChange}
                onBlur={handleBlur}
            >
                <FormOption
                    value=""
                    className="form__dropdown--option"
                    disabled={isDisabled}
                >
                    Select an option
                </FormOption>
                {optionList?.map((el, i) => {
                    const { id, address, myValue } = el;
                    return (
                        <FormOption
                            key={getKey(id, i)}
                            value={myValue}
                            className={`form__dropdown--option`}
                        >
                            {address}
                        </FormOption>
                    );
                })}
            </FormSelect>
        </FormDiv>
    );
});

export default React.memo(FormDropDown);