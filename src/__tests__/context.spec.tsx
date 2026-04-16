import { act, fireEvent, render } from '@testing-library/react';
import { ValidatorProvider } from '../index';
import { ContactForm } from './ContactForm';

describe('context', () => {

    it('provider should mount correctly', () => {

        const { container } = render(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        expect(container.firstChild).toMatchSnapshot();

    });

    it('validation success on form submit', async () => {

        const { container } = render(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        fireEvent.change(container.querySelector('#fname-input')!, { target: { value: 'Nick' } });
        fireEvent.change(container.querySelector('#lname-input')!, { target: { value: 'Fury' } });

        await act(async () => {
            fireEvent.submit(container.querySelector('form')!);
        });

        expect(container.firstChild).toMatchSnapshot();

    });

    it('validation error on form submit', async () => {

        const { container } = render(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        fireEvent.change(container.querySelector('#fname-input')!, { target: { value: 'Nick' } });

        await act(async () => {
            fireEvent.submit(container.querySelector('form')!);
        });

        expect(container.firstChild).toMatchSnapshot();

    });

    it('validation error on blur field', async () => {

        const { container } = render(
            <ValidatorProvider>
                <ContactForm/>
            </ValidatorProvider>
        );

        await act(async () => {
            fireEvent.blur(container.querySelector('#fname-input')!);
        });

        expect(container.firstChild).toMatchSnapshot();

    });

    it('validation error custom handler', async () => {

        const { container } = render(
            <ValidatorProvider options={{
                onErrorMessage() {
                    return ['this is a custom error'];
                }
            }}>
                <ContactForm/>
            </ValidatorProvider>
        );

        await act(async () => {
            fireEvent.submit(container.querySelector('form')!);
        });

        expect(container.firstChild).toMatchSnapshot();

    });

});
