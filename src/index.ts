import {validate} from 'class-validator';
import {useState} from 'react';

type Newable<T> = {
    new(): T;
} | Function;

type ValidationErrorMap<T, K extends keyof T> = { [key in K]?: string };
type ValidationPayload<T, K extends keyof T> = { [key in K]?: T[K] };
type ValidationFunction<T, K extends keyof T> = (payload: ValidationPayload<T, K>, filter?: K[]) => Promise<boolean>;
type UseValidationResult<T, K extends keyof T> = { validate: ValidationFunction<T, K>, errors: ValidationErrorMap<T, K> };

export const useValidation = <T, K extends keyof T>(validationClass: Newable<T>): UseValidationResult<T, K> => {

    const [validationErrors, setErrors] = useState<ValidationErrorMap<T, K>>({});

    const validateCallback: ValidationFunction<T, K> = async (payload, filter: K[] = []) => {

        let errors = await validate(Object.assign(new (validationClass as any)(), payload));
        if (errors.length === 0) {

            setErrors({});
            return true;

        } else {

            if (filter.length > 0) {
                errors = errors.filter((err) => filter.includes(err.property as K));
            }

            const validation: ValidationErrorMap<T, K> = errors.reduce(
                (acc, value) => ({
                    ...acc,
                    [value.property as K]: Object.keys(value.constraints).map((key) => value.constraints[key])[0]
                }),
                {} as ValidationErrorMap<T, K>
            );

            if (filter.length > 0) {
                setErrors({
                    ...validationErrors,
                    ...validation
                });
            } else {
                setErrors(validation);
            }

            return false;

        }

    };

    return {
        validate: validateCallback,
        errors: validationErrors
    };

};
