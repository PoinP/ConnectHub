import { Button } from "../Button";
import { Logo } from "../navigation/Logo";
import { FormInput } from "./FormInput";

import { Validator } from "../../services/Validator";
import { useState } from "react";
import { ValidationSchema } from "../../services/ValidationSchema";
import { Condition } from "../../services/Condition";
import { PureButton } from "../PureButton";

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

export function SignIn({ onRegister, onLogin }) {
    const [validator, setValidator] = useState(new Validator(validationSchema))

    function handleLogin(e) {
      e.preventDefault();
      if (validator.isValid()) 
        onLogin(true);
    }

    return (
        <section className="form-container" onSubmit={handleLogin}>
            <Logo/>
            <form className="form">
                <h1 className="form-header">Sign in</h1>
                <FormInput id="username" type="text" label="Username" validator={validator} setValidator={setValidator}></FormInput>
                <FormInput id="password" type="password" label="Password" validator={validator} setValidator={setValidator}></FormInput>
                <Button>Log in</Button>
                <PureButton onClick={() => onRegister(true)}>Register instead</PureButton>
            </form>
        </section>
    )
}