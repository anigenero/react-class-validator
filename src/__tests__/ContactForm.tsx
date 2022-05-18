import {IsNotEmpty} from "class-validator";
import React, {FunctionComponent, useState} from "react";
import {useValidation} from "../index";

class ContactFormValidation {

    @IsNotEmpty({
        message: 'First name cannot be empty'
    })
    public firstName: string;

    @IsNotEmpty({
        message: 'Last name cannot be empty'
    })
    public lastName: string;

}

export const ContactForm: FunctionComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [validate, errorMessages] = useValidation(ContactFormValidation);

    return (
        <form id="form" onSubmit={async (evt) => {
            evt.preventDefault();
            await validate({firstName, lastName});
        }}>
            <input id="fname-input" value={firstName} onChange={({target: {value}}) => setFirstName(value)}
                   onBlur={() => validate({firstName}, ['firstName'])}/>
            {errorMessages.firstName && errorMessages.firstName.map((error, index) => (
                <strong key={index}>{error}</strong>
            ))}
            <input id="lname-input" value={lastName} onChange={({target: {value}}) => setLastName(value)}
                   onBlur={() => validate({lastName}, ['lastName'])}/>
            {errorMessages.lastName && errorMessages.lastName.map((error, index) => (
                <strong key={index}>{error}</strong>
            ))}
        </form>
    );

};
