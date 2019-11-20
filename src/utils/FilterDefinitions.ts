import {Filter as F, FilterOptions} from "./Interfaces";

const numberValidator = (value: string): boolean => {
    const converted = parseInt(value);
    return converted != null && converted.toString() == value
};

export const FILTER_TYPES = {
    GREATER_THAN: {
        type: "number",
        validator: numberValidator
    },

    GREATER_OR_EQUAL_THAN: {
        type: "number",
        validator: numberValidator
    },

    SMALLER_THAN: {
        type: "number",
        validator: numberValidator
    },

    SMALLER_OR_EQUAL_THAN: {
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
        "GREATER_THAN",
        "GREATER_OR_EQUAL_THAN",
        "SMALLER_THAN",
        "SMALLER_OR_EQUAL_THAN",
        "EQUALS"
    ]
};

export const BLANK_FILTER: F = {
    mode: "AND",
    set: [],
    subFilters: [],
} as const;