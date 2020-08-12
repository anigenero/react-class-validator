import {ValidationError} from "class-validator";
import React, {createContext, FunctionComponent} from "react";

export type OnErrorMessageHandler = (error: ValidationError) => string[];
export type ValidatorContextOptions = {
    onErrorMessage: OnErrorMessageHandler;
};

const _getDefaultContextOptions = (): ValidatorContextOptions => ({
    onErrorMessage: (error) => Object.keys(error.constraints).map((key) => error.constraints[key])
});

export const ValidatorContext = createContext<ValidatorContextOptions>(null);

export const ValidatorProvider: FunctionComponent<{ options?: ValidatorContextOptions }> =
    ({options = _getDefaultContextOptions(), children}) => (
        <ValidatorContext.Provider value={options}>
            {children}
        </ValidatorContext.Provider>
    );
