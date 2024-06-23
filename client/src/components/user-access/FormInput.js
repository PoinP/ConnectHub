import { useState } from "react";

import { ValidationResult } from "../../services/ValidationResult";
import "./user-access.css"

export function FormInput({ id, type, label, placeholder, validator, setValidator, exportInput, validateWith, validateWithMessage }) {

  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [result, setResult] = useState(new ValidationResult(true));

    function handleInput(e) {
      setInput((input) => {
        input = e.target.value;
        const res = validator.validate(id, input);

        if (exportInput)
            exportInput(input);

        if (validateWith) {
          if (input !== validateWith) {
            res.isValid = false;
            res.message = validateWithMessage;
          }
        }

        setResult(res);
        setValidator((validator) => {
          validator.validateSchema(id, res.getIsValid());
          return validator;
        });
      });
    }

  return (
    <div className="form-input-container">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={input}
        className={`form-input ${focused && "form-input-focused"}`}
        placeholder={placeholder}
        onChange={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
      <span className={`form-error ${result.getIsValid() && "hidden"}`}>{result.getMessage()}</span>
    </div>
  );
}
