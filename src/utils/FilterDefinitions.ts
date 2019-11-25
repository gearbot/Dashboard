import {Filter as F, FilterOptions} from "./Interfaces";
import NumberFilter from "../components/infractions/NumberFilter";

const numberValidator = (value: string): boolean => {
    const converted = parseInt(value);
    return converted && converted.toString().length == value.length
};

export const FILTER_TYPES = {
    GREATER_THAN: {
        Component: NumberFilter,
        validator: numberValidator
    },

    GREATER_OR_EQUAL_THAN: {
        Component: NumberFilter,
        validator: numberValidator
    },

    SMALLER_THAN: {
        Component: NumberFilter,
        validator: numberValidator
    },

    SMALLER_OR_EQUAL_THAN: {
        Component: NumberFilter,
        validator: numberValidator
    },
    EQUALS: {
        Component: NumberFilter,
        validator: numberValidator
    },
    NOT: {
        Component: NumberFilter,
        validator: numberValidator
    }
};

export const FILTER_OPTIONS: FilterOptions = {
    id: [
        "GREATER_THAN",
        "GREATER_OR_EQUAL_THAN",
        "SMALLER_THAN",
        "SMALLER_OR_EQUAL_THAN",
        "EQUALS"
    ],
    user_id: [
        "EQUALS",
        "NOT"
    ],
    mod_id: [
        "EQUALS",
        "NOT"
    ],
    type: [
        "EQUALS",
        "NOT"
    ]
};

export const BLANK_FILTER: F = {
    mode: "AND",
    set: [],
    subFilters: [],
} as const;