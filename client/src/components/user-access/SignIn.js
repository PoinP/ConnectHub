import { Button } from "../Button";
import { Logo } from "../navigation/Logo";
import { FormInput } from "./FormInput";

import { Validator } from "../../services/Validator";
import { useState } from "react";
import { ValidationSchema } from "../../services/ValidationSchema";
import { Condition } from "../../services/Condition";
import { PureButton } from "../PureButton";
import { clientLogin } from "../../services/UserAuth";

function emptyString(str) {
    return str.length !== 0;
}

const validationSchema = new ValidationSchema({
  username: {
    status: false,
    conditions: [
      new Condition(emptyString, "Username is required!")
    ],
  },
  password: {
    status: false,
    conditions: [
      new Condition(emptyString, "Password is required!")
    ]
  },
});

export function SignIn({ onChangePage, onSuccess }) {
    const [error, setError] = useState(null);
    const [validator, setValidator] = useState(new Validator(validationSchema))

    function handleLogin(e) {
      e.preventDefault();
      if (validator.isValid()) {
        const username = e.target[0].value;
        const password = e.target[1].value;

        clientLogin(username, password, onSuccess, setError);
      }
    }

    return (
        <section className="form-container">
            <Logo/>
            <form className="form" onSubmit={handleLogin}>
                <h1 className="form-header">Sign in</h1>
                <FormInput id="username" type="text" label="Username" validator={validator} setValidator={setValidator}></FormInput>
                <FormInput id="password" type="password" label="Password" validator={validator} setValidator={setValidator}></FormInput>
                {error && <span className="form-error">{error}</span>}
                <Button>Log in</Button>
                <PureButton onClick={() => onChangePage(true)}>Register instead</PureButton>
            </form>
        </section>
    )
}