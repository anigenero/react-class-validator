import {IsNotEmpty} from 'class-validator';
import {FunctionComponent, useState} from 'react';
import {useValidation} from '../index.js';

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

    const {
        validate,
        errors
    } = useValidation(ContactFormValidation);

    return (
        <form id="form" onSubmit={async (evt) => {
            evt.preventDefault();
            await validate({firstName, lastName});
        }}>
            <input id="fname-input" value={firstName} onChange={({target: {value}}) => setFirstName(value)}
                   onBlur={() => validate({firstName}, ['firstName'])}/>
            {errors?.firstName && errors.firstName.map((error, index) => (
                <strong key={index}>{error}</strong>
            ))}
            <input id="lname-input" value={lastName} onChange={({target: {value}}) => setLastName(value)}
                   onBlur={() => validate({lastName}, ['lastName'])}/>
            {errors?.lastName && errors.lastName.map((error, index) => (
                <strong key={index}>{error}</strong>
            ))}
        </form>
    );

};
