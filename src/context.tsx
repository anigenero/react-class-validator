import {ValidationError} from "class-validator";
import React, {createContext, FunctionComponent, PropsWithChildren} from "react";

export type ValidatorResultType = 'map' | 'boolean';

export type OnErrorMessageHandler = (error: ValidationError) => string[];
export type ValidatorContextOptions = {
    onErrorMessage?: OnErrorMessageHandler;
    resultType?: ValidatorResultType;
};

const defaultOnErrorMessage: OnErrorMessageHandler = (error) =>
    Object.keys(error.constraints).map((key) => error.constraints[key]);

const getDefaultContextOptions = (): ValidatorContextOptions => ({
    onErrorMessage: defaultOnErrorMessage,
    resultType: 'boolean',
});

export const ValidatorContext = createContext<ValidatorContextOptions>(null);

export const ValidatorProvider: FunctionComponent<PropsWithChildren<{ options?: ValidatorContextOptions }>> =
    ({options = getDefaultContextOptions(), children}) => (
        <ValidatorContext.Provider value={{
            onErrorMessage: options.onErrorMessage || defaultOnErrorMessage,
            resultType: options.resultType || 'boolean'
        }}>
            {children}
        </ValidatorContext.Provider>
    );
