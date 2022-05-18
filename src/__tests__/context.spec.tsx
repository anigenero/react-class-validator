import 'reflect-metadata';

import React, {FunctionComponent, useState} from "react";
import {act, create} from "react-test-renderer";
import {useValidation, ValidatorProvider} from "../index";
import {IsNotEmpty} from "class-validator";

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

        const wrapper = create(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        const firstNameInput = wrapper.root.findByProps({id: 'fname-input'});
        await act(() =>
            firstNameInput.props.onChange({target: {value: 'Nick'}})
        );

        const lastNameInput = wrapper.root.findByProps({id: 'lname-input'});
        await act(() =>
            lastNameInput.props.onChange({target: {value: 'Fury'}})
        );

        const form = wrapper.root.findByType('form');
        await act(() =>
            form.props.onSubmit({
                preventDefault: jest.fn()
            })
        );

        expect(wrapper.toJSON()).toMatchSnapshot();

    });

    it('validation error on form submit', async () => {

        const wrapper = create(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        const firstNameInput = wrapper.root.findByProps({id: 'fname-input'});
        await act(() =>
            firstNameInput.props.onChange({target: {value: 'Nick'}})
        );

        const form = wrapper.root.findByType('form');
        await act(() =>
            form.props.onSubmit({
                preventDefault: jest.fn()
            })
        );

        expect(wrapper.toJSON()).toMatchSnapshot();

    });

    it('validation error on blur field', async () => {

        const wrapper = create(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        const firstNameInput = wrapper.root.findByProps({id: 'fname-input'});
        await act(() =>
            firstNameInput.props.onBlur()
        );

        expect(wrapper.toJSON()).toMatchSnapshot();

    });

    it('validation error custom handler', async () => {

        const wrapper = create(
            <ValidatorProvider options={{
                onErrorMessage() {
                    return ['this is a custom error']
                }
            }}>
                <ContactForm/>
            </ValidatorProvider>
        );

        const form = wrapper.root.findByType('form');
        await act(() =>
            form.props.onSubmit({
                preventDefault: jest.fn()
            })
        );

        expect(wrapper.toJSON()).toMatchSnapshot();

    });

});
