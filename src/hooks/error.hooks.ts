import { useEffect, useState } from "react";


export function useErrorParser(form: any, mutationResult: any): any[] {
    const [errorOverFlow, setErrors] = useState([]);

    useEffect(() => {
        let message: any = [];
        console.log(mutationResult)
        const response = mutationResult.error?.response.data

        if (response === undefined) {
            setErrors([]);
            return;
        }

        if (response.statusCode >= 400) {
            if (response.message) {
                message.push(response.message);
            }
            const errors = response.errors ? response.errors : null;
            if (errors !== null) {
                const formFields: any[] = []
                Object.keys(errors).map((fname: string) => {
                    if (form.getFieldInstance(fname)) {
                        formFields.push({
                            name: fname,
                            errors: [...errors[fname]]
                        })
                    } else {
                        message.push(errors[fname][0]);
                    }
                })
                if (formFields.length > 0) {
                    form.setFields(formFields)
                }
            }
        }
        setErrors(message);
    }, [mutationResult.error?.response]); // Ensure the effect runs whenever response changes

    return errorOverFlow;
}
