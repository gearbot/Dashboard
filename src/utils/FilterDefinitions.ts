import {FilterOptions} from "./Interfaces";
import NumberInput from "../components/infractions/filters/NumberInput";

const numberValidator = (value: string): boolean => {
    const converted = parseInt(value);
    return converted != null && converted.toString() == value
};

export const FILTER_TYPES = {
    GREATER_THEN: {
        type: "number",
        validator: numberValidator
    },

    GREATER_OR_EQUAL_THEN: {
        type: "number",
        validator: numberValidator
    },

    SMALLER_THEN: {
        type: "number",
        validator: numberValidator
    },

    SMALLER_OR_EQUAL_THEN: {
        type: "number",
        validator: numberValidator
    },
    "EQUALS": {
        type: "text",
        validator: numberValidator
    }
};

export const FILTER_OPTIONS: FilterOptions = {
    "id": [
        "GREATER_THEN",
        "GREATER_OR_EQUAL_THEN",
        "SMALLER_THEN",
        "SMALLER_OR_EQUAL_THEN",
        "EQUALS"
    ]
};
