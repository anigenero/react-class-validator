import {validate} from 'class-validator';
import {useContext, useState} from 'react';
import {ValidatorContext, ValidatorContextOptions} from "./context";

export {ValidatorProvider, ValidatorContextOptions, OnErrorMessageHandler} from './context';

type Newable<T> = {
    new(): T;
} | Function;

type ValidationOptions = Pick<ValidatorContextOptions, 'resultType'>;
type ValidationErrorMap<T, K extends keyof T> = { [key in K]?: string[] };
type ValidationPayload<T, K extends keyof T> = { [key in K]?: T[K] };
type ValidationFunction<T, K extends keyof T> = (payload: ValidationPayload<T, K>, filter?: K[]) =>
    Promise<ValidationErrorMap<T, K> | boolean>;
type UseValidationResult<T, K extends keyof T> = [ValidationFunction<T, K>, ValidationErrorMap<T, K>];

export const useValidation = <T, K extends keyof T>(
    validationClass: Newable<T>,
    opts: ValidationOptions = {}
): UseValidationResult<T, K> => {

    const {onErrorMessage, resultType} = useContext(ValidatorContext);
    opts = {
        ...opts,
        resultType: opts.resultType || resultType
    }

    const [validationErrors, setErrors] = useState<ValidationErrorMap<T, K>>({});

    const resolveErrors = (errors: ValidationErrorMap<T, K>) => {
        if (errors && Object.keys(errors).length === 0 && errors.constructor === Object) {
            return opts.resultType === 'boolean' ? true : errors;
        } else {
            return opts.resultType === 'boolean' ? false : errors;
        }
    }

    const validateCallback: ValidationFunction<T, K> = async (payload, filter: K[] = []) => {

        let errors = await validate(Object.assign(new (validationClass as any)(), payload));
        if (errors.length === 0) {

            setErrors({});
            return resolveErrors({});

        } else {

            if (filter.length > 0) {
                errors = errors.filter((err) => filter.includes(err.property as K));
            }

            const validation: ValidationErrorMap<T, K> = errors.reduce(
                (acc, value) => ({
                    ...acc,
                    [value.property as K]: onErrorMessage(value)
                }),
                {} as ValidationErrorMap<T, K>
            );

            if (filter.length > 0) {

                const filteredErrors =
                    (Object.keys(validationErrors) as K[]).filter((key) =>
                        !filter.includes(key)
                    ).reduce((accum, key) => ({
                        ...accum,
                        [key]: validationErrors[key]
                    }), {});

                setErrors({
                    ...filteredErrors,
                    ...validation
                });

            } else {
                setErrors(validation);
            }

            return resolveErrors(validation);

        }

    };

    return [validateCallback, validationErrors];

};
