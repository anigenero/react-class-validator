# react-class-validator
Easy-to-use React hook for validating forms with the [class-validator](https://github.com/typestack/class-validator) library.

[![Build Status](https://travis-ci.org/anigenero/react-class-validator.svg?branch=master)](https://travis-ci.org/anigenero/react-class-validator)
[![codecov](https://codecov.io/gh/anigenero/react-class-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/anigenero/react-class-validator)
[![dependencies](https://david-dm.org/anigenero/react-class-validator.svg)](https://david-dm.org/anigenero/react-class-validator.svg)

## Installation

```bash
npm install --save react-class-validator
```

```typescript

const validatorOptions: ValidatorContextOptions = {
    onErrorMessage: (error): string => {
        // custom error message handling (localization, etc)
    }
}

render((
    <ValidatorContext options={validatorOptions}>
        <MyComponent />
    </ValidatorContext>
), document.getElementById('root'))
```

## Usage

```typescript
import {IsNotEmpty} from "class-validator";

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

```typescript jsx
const MyComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {validate, errors} = useValidation(LoginValidation);

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

## Contributors
Library built and maintained by [Robin Schultz](http://anigenero.com)

If you would like to contribute (aka buy me a beer), you can send funds via PayPal at the link below.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SLT7SZ2XFNEUQ)
