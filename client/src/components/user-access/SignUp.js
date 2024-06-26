import { Button } from "../Button";
import { Logo } from "../navigation/Logo";
import { FormInput } from "./FormInput";

import { Validator } from "../../services/Validator";
import { useState } from "react";
import { ValidationSchema } from "../../services/ValidationSchema";
import { Condition } from "../../services/Condition";
import { PureButton } from "../PureButton";
import { clientRegister } from "../../services/UserAuth";

function emptyString(str) {
  return str.length !== 0;
}

function usernameLength(username) {
  return username.length >= 3;
}

function hasSpecialCharacters(username) {
  const pattern = /^[a-zA-Z0-9]*$/;
  const regEx = new RegExp(pattern);
  return regEx.test(username);
}

function isPasswordValid(password) {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const regEx = new RegExp(pattern);
  return regEx.test(password);
}

function isEmailValid(email) {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const regEx = new RegExp(pattern);
  return regEx.test(email);
}

const validationSchema = new ValidationSchema({
  username: {
    status: false,
    conditions: [
      new Condition(emptyString, "Username is required!"),
      new Condition(
        usernameLength,
        "Username must have at least 3 characters!"
      ),
      new Condition(
        hasSpecialCharacters,
        "Username should only contain letters and numbers!"
      ),
    ],
  },
  email: {
    status: false,
    conditions: [
      new Condition(emptyString, "Email is required!"),
      new Condition(isEmailValid, "Please enter a valid email address!"),
    ],
  },
  password: {
    status: false,
    conditions: [
      new Condition(emptyString, "Password is required!"),
      new Condition(
        isPasswordValid,
        "Password must have at least eight characters, at least one letter and one number!"
      ),
    ],
  },
  repeatPassword: {
    status: false,
    conditions: [],
  },
});

export function SignUp({ onChangePage, onSuccess}) {
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [validator, setValidator] = useState(new Validator(validationSchema));

  function handleRegister(e) {
    e.preventDefault();
    if (validator.isValid()) {
      const username = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;

      clientRegister(username, email, password, onSuccess, setError);
    }
  }

  return (
    <section
      className="form-container"
      onSubmit={handleRegister}
    >
      <Logo />
      <form className="form">
        <h1 className="form-header">Sign up</h1>
        <FormInput
          id="username"
          type="text"
          label="Username"
          validator={validator}
          setValidator={setValidator}
        ></FormInput>
        <FormInput
          id="email"
          type="text"
          label="E-mail"
          validator={validator}
          setValidator={setValidator}
        ></FormInput>
        <FormInput
          id="password"
          type="password"
          label="Password"
          validator={validator}
          setValidator={setValidator}
          exportInput={setPassword}
        ></FormInput>
        <FormInput
          id="repeatPassword"
          type="password"
          label="Repeat Password"
          validator={validator}
          setValidator={setValidator}
          validateWith={password}
          validateWithMessage={"Your passswords must match!"}
        ></FormInput>
        {error && <span className="form-error">{error}</span>}
        <Button>Register</Button>
        <PureButton onClick={() => onChangePage(false)}>Login instead</PureButton>
      </form>
    </section>
  );
}
