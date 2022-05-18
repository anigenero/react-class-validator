# react-class-validator
Easy-to-use React hook for validating forms with the [class-validator](https://github.com/typestack/class-validator) library.

[![Build Status](https://travis-ci.org/anigenero/react-class-validator.svg?branch=master)](https://travis-ci.org/anigenero/react-class-validator)
[![codecov](https://codecov.io/gh/anigenero/react-class-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/anigenero/react-class-validator)

## Installation

```bash
npm install --save react-class-validator
```

```typescript jsx

const validatorOptions: ValidatorContextOptions = {
    onErrorMessage: (error): string => {
        // custom error message handling (localization, etc)
    },
    resultType: 'boolean' // default, can also be set to 'map'
}

render((
    <ValidatorProvider options={validatorOptions}>
        <MyComponent />
    </ValidatorProvider>
), document.getElementById('root'))
```

## Default onErrorMessage behavior
The default behavior is to flatten all error constraints for each attribute.
```typescript
const getDefaultContextOptions = (): ValidatorContextOptions => ({
    onErrorMessage: (error) => Object.keys(error.constraints).map((key) => error.constraints[key])
});
```

### react-intl
When using libraries such as [react-intl](https://github.com/formatjs/formatjs), you don't have to modify the existing 
`onErrorMessage` handler. Decorators are handled at source load, so you only need to include the `intl.formatMessage` in your message definition.

```typescript
class Person {

    @IsEmail({}, {
        message: intl.formatMessage(defineMessage({defaultMessage: 'Invalid email'}))
    })
    @IsNotEmpty({
        message: intl.formatMessage(defineMessage({defaultMessage: 'Email cannot be empty'}))
    })
    public email: string;
    
}

```

## Usage

Create a class using validation decorators from `class-validator`.

```typescript
import { IsNotEmpty } from "class-validator";

class LoginValidation {

    @IsNotEmpty({
        message: 'username cannot be empty'
    })
    public username: string;

    @IsNotEmpty({
        message: 'password cannot be empty'
    })
    public password: string;

}
```

Set up your form component to validate using your validation class.  

```typescript jsx
const MyComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [validate, errors] = useValidation(LoginValidation);

    return (
        <form onSubmit={async (evt) => {

            evt.preventDefault();

            // `validate` will return true if the submission is valid
            if (await validate({username, password})) {
                // ... handle valid submission
            }

        }}>

            {/* use a filter so that the onBlur function will only validate username */}
            <input value={username} onChange={({target: {value}}) => setUsername(value)}
                onBlur={() => validate({username}, ['username'])}/>

            {/* show error */}
            {errors.username && (
                <div className="error">
                    {errors.username.map((message) => <strong>message</strong>)}
                </div>
            )}

        </form>
    );

};
```

## Usage With Formik

`react-class-validator` easily integrates with [Formik](https://formik.org/). You can simply use the `validate` 
function returned from `useValidation`, so long as the Formik fields are named the same as the keys in your validation 
class. Individual fields will have to be validated with `onBlur` functionality.

### Formik error messages

To display error messages without custom handling, messages will need to be outputted as a map upon validation. 
Do this by overriding the default `resultType` (you can also do this at the component-level).

```typescript
const options: ValidatorContextOptions = {
    resultType: 'map'
};
```

Then you can simply integrate with the default Formik flow.

```typescript jsx
export const Login: FunctionComponent = () => {

    const [validate] = useValidation(LoginValidation);

    return (
        <Formik initialValues={{username: '', password: ''}}
                validateOnBlur
                validateOnChange
                validate={validate}>
            {({values, touched, errors, handleChange, handleBlur}) => (
                <Form>
                    
                    <label htmlFor="username">Username</label>
                    <Field id="username" name="username" placeholder="Username" />

                    {errors.username && touched.username ? (
                        <div>{errors.username}</div>
                    ) : null}
                    
                    {/* other fields */}
                    
                    <button type="submit">
                        Submit
                    </button>
                    
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
