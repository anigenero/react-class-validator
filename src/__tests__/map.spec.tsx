import 'reflect-metadata';
import React from "react";
import {act, create} from "react-test-renderer";
import {ValidatorProvider} from "../index";
import {ContactForm} from "./ContactForm";

describe('context', () => {

    it('provider should mount correctly', () => {

        const tree = create(
            <ValidatorProvider options={{resultType: 'map'}}>
                <ContactForm/>
            </ValidatorProvider>
        ).toJSON();

        expect(tree).toMatchSnapshot();

    });

    it('validation success on form submit', async () => {

        const wrapper = create(
            <ValidatorProvider options={{resultType: 'map'}}>
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
            <ValidatorProvider options={{resultType: 'map'}}>
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
            <ValidatorProvider options={{resultType: 'map'}}>
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
                },
                resultType: 'map',
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
