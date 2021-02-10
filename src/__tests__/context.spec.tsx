import React, {FunctionComponent, useState} from "react";
import {create} from "react-test-renderer";
import {ValidatorProvider} from "../context";
import {useValidation} from "../index";


class ContactFormValidation {
    public firstName: string;
    public lastName: string;
}

const ContactForm: FunctionComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [validate, errorMessages] = useValidation(ContactFormValidation);

    return (
        <form id="form" onSubmit={async (evt) => {
            evt.preventDefault();
            await validate({firstName, lastName});
        }}>
            <input id="fname-input" value={firstName} onChange={({target: {value}}) => setFirstName(value)}/>
            <input id="lname-input" value={lastName} onChange={({target: {value}}) => setLastName(value)}/>
        </form>
    );

};

describe('context', () => {

    it('provider should mount correctly', () => {

        const tree = create(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

    it('provider should mount correctly', () => {

        const tree = create(
            <ValidatorProvider/>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

});
