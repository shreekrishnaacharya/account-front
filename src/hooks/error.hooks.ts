import { useEffect, useState } from "react";

interface ErrorResponse {
    errors: { [key: string]: string } | null,
    message: string[]
}
const initialError: ErrorResponse = {
    message: [],
    errors: null
};
export function useErrorParser(response: any): ErrorResponse {
    const [error, setErrors] = useState(initialError);

    useEffect(() => {
        let { message, errors } = initialError;
        message = [];

        if (response === undefined) {
            setErrors(initialError);
            return;
        }

        if (response.statusCode >= 400) {
            if (response.message) {
                message.push(response.message);
            }
            errors = response.error ? response.error : null;
        }

        setErrors({
            message: message,
            errors: errors
        });
    }, [response]); // Ensure the effect runs whenever response changes

    return error;
}
