import {validate} from 'class-validator';
import {useCallback, useState} from 'react';

type Newable<T> = new() => T;

type ValidationErrorMap<T, K extends keyof T> = { [key in K]?: string[] };
type ValidationPayload<T, K extends keyof T> = { [key in K]?: T[K] };
type ValidationFunction<T, K extends keyof T> = (payload: ValidationPayload<T, K>, filter?: K[]) =>
    Promise<ValidationErrorMap<T, K> | undefined>;

interface UseValidationResult<T, K extends keyof T> {
    readonly validate: ValidationFunction<T, K>;
    readonly errors: ValidationErrorMap<T, K> | undefined;
}

export const useValidation = <T, K extends keyof T>(
    validationClass: Newable<T>
): UseValidationResult<T, K> => {

    const [validationErrors, setErrors] = useState<ValidationErrorMap<T, K> | undefined>(void 0);

    const validateCallback: ValidationFunction<T, K> = useCallback(async (payload, filter: K[] = []) => {

        const errors = await validate(Object.assign(new (validationClass as any)(), payload));
        if (errors.length === 0) {

            setErrors(void 0);
            return void 0;

        } else {

            const filteredErrors =
                Object.entries(errors ?? {}).filter(([key]) =>
                    !filter.includes(key as K)
                ).reduce((accum, [key, error]) => ({
                    ...accum,
                    [key]: error
                }), {});

            setErrors({
                ...filteredErrors
            });

            return filteredErrors;

        }

    }, [validationClass, validationErrors]);

    return {
        validate: validateCallback,
        errors: validationErrors
    };

};
