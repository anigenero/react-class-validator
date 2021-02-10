import 'reflect-metadata';
import React, {FunctionComponent, useState} from "react";
import {create} from "react-test-renderer";
import {useValidation, ValidatorProvider} from "../index";
import {mount} from "enzyme";
import {IsNotEmpty} from "class-validator";
import toJson from "enzyme-to-json";

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

const ContactForm: FunctionComponent = () => {

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

describe('context', () => {

    it('provider should mount correctly', () => {

        const tree = create(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

    it('validation success on form submit', async () => {

        const wrapper = mount(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        const firstNameInput = wrapper.find('#fname-input');
        firstNameInput.simulate('change', {target: {value: 'Nick'}});

        const lastNameInput = wrapper.find('#lname-input');
        lastNameInput.simulate('change', {target: {value: 'Fury'}});

        const form = wrapper.find('#form');
        form.simulate('submit');

        expect(toJson(wrapper)).toMatchSnapshot();

    });

    it('validation error on form submit', async () => {

        const wrapper = mount(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        const firstNameInput = wrapper.find('#fname-input');
        firstNameInput.simulate('change', {target: {value: 'Nick'}});

        const form = wrapper.find('#form');
        form.simulate('submit');

        expect(toJson(wrapper)).toMatchSnapshot();

    });

    it('validation error on blur field', async () => {

        const wrapper = mount(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        const firstNameInput = wrapper.find('#fname-input');
        firstNameInput.simulate('blur');

        expect(toJson(wrapper)).toMatchSnapshot();

    });

    it('validation error custom handler', async () => {

        const wrapper = mount(
            <ValidatorProvider options={{
                onErrorMessage() {
                    return ['this is a custom error']
                }
            }}>
                <ContactForm/>
            </ValidatorProvider>
        );

        const form = wrapper.find('#form');
        form.simulate('submit');

        expect(toJson(wrapper)).toMatchSnapshot();

    });

});
