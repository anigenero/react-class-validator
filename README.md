# react-class-validator
Easy-to-use React hook for validating forms with the [class-validator](https://github.com/typestack/class-validator) library.

[![Build Status](https://github.com/anigenero/react-class-validator/actions/workflows/build.yml/badge.svg)](https://github.com/anigenero/react-class-validator/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/anigenero/react-class-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/anigenero/react-class-validator)

## Installation

```bash
npm install --save react-class-validator
```

Peer dependencies: `react >= 17.0.0`

## Usage

Create a class using validation decorators from `class-validator`.

```typescript
import { IsNotEmpty } from "class-validator";

class LoginValidation {

    @IsNotEmpty({
        message: 'Username cannot be empty'
    })
    public username: string;

    @IsNotEmpty({
        message: 'Password cannot be empty'
    })
    public password: string;

}
```

Use the `useValidation` hook in your component.

```tsx
import { useValidation } from "react-class-validator";

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { validate, errors } = useValidation(LoginValidation);

    return (
        <form onSubmit={async (evt) => {
            evt.preventDefault();
            if (!(await validate({ username, password }))) {
                // no validation errors — handle valid submission
            }
        }}>

            <input
                value={username}
                onChange={({ target: { value } }) => setUsername(value)}
                onBlur={() => validate({ username }, ['username'])}
            />
            {errors?.username && errors.username.map((message, i) => (
                <strong key={i}>{message}</strong>
            ))}

            <input
                type="password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                onBlur={() => validate({ password }, ['password'])}
            />
            {errors?.password && errors.password.map((message, i) => (
                <strong key={i}>{message}</strong>
            ))}

            <button type="submit">Login</button>

        </form>
    );

};
```

## API

### `useValidation(validationClass)`

Returns an object with:

| Property   | Type | Description |
|------------|------|-------------|
| `validate` | `(payload, filter?) => Promise<errors \| undefined>` | Validates the payload against the class. Returns `undefined` when valid. |
| `errors`   | `{ [key]: string[] } \| undefined` | Current validation errors keyed by property name. Each value is an array of error messages. |

**Parameters:**

- `payload` — an object with the fields to validate (keys should match the validation class properties)
- `filter` (optional) — an array of property names to exclude from the error result, useful for single-field validation on blur

## Usage with Formik

The `validate` function can be passed directly to Formik's `validate` prop. Since it returns an error map keyed by property name (or `undefined` when valid), it integrates seamlessly.

```tsx
import { useValidation } from "react-class-validator";
import { Field, Form, Formik } from "formik";

const LoginForm = () => {

    const { validate } = useValidation(LoginValidation);

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validate={validate}
            onSubmit={(values) => {
                // handle valid submission
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field name="username" placeholder="Username" />
                    {errors.username && touched.username && (
                        <div>{errors.username}</div>
                    )}

                    <Field name="password" type="password" placeholder="Password" />
                    {errors.password && touched.password && (
                        <div>{errors.password}</div>
                    )}

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );

};
```

## Contributors
Library built and maintained by [Robin Schultz](http://anigenero.com)

If you would like to contribute (aka buy me a beer), you can send funds via PayPal at the link below.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SLT7SZ2XFNEUQ)
