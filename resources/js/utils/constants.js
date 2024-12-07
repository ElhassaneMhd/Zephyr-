import { DateTime } from "luxon";

export const PAGE_LIMIT = 10;

export const RULES = {
    email: {
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
        },
    },
    phone: {
        pattern: {
            value: /^(\+212\s?0?|0)(5|6|7)\d{8}$/,
            message:
                "Invalid phone number format. \n Ex: +212 0637814207 or 0637814207",
        },
    },
    password: {
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
                "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
        },
    },
    passwordConfirmation: {
        validate: (value, getValue) =>
            value === getValue("password") || "Passwords do not match",
    },
    endDate: {
        validate: (val, getValue) => {
            return (
                DateTime.fromISO(val) >
                    DateTime.fromISO(getValue("startDate")) ||
                "End date must be after start date"
            );
        },
    },
};

