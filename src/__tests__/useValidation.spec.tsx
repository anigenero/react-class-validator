import {act, fireEvent, render} from '@testing-library/react';
import {ContactForm} from './ContactForm.js';

describe('context', () => {

    it('provider should mount correctly', () => {

        const {container} = render(
            <ContactForm/>
        );

        expect(container.firstChild).toMatchSnapshot();

    });

    it('validation success on form submit', async () => {

        const {container} = render(
            <ContactForm/>
        );

        fireEvent.change(container.querySelector('#fname-input')!, {target: {value: 'Nick'}});
        fireEvent.change(container.querySelector('#lname-input')!, {target: {value: 'Fury'}});

        await act(async () => {
            fireEvent.submit(container.querySelector('form')!);
        });

        expect(container.firstChild).toMatchSnapshot();

    });

    it('validation error on form submit', async () => {

        const {container} = render(
            <ContactForm/>
        );

        fireEvent.change(container.querySelector('#fname-input')!, {target: {value: 'Nick'}});

        await act(async () => {
            fireEvent.submit(container.querySelector('form')!);
        });

        expect(container.firstChild).toMatchSnapshot();

    });

    it('validation error on blur field', async () => {

        const {container} = render(
            <ContactForm/>
        );

        await act(async () => {
            fireEvent.blur(container.querySelector('#fname-input')!);
        });

        expect(container.firstChild).toMatchSnapshot();

    });

});
