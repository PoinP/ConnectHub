import { useState } from "react";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

export function UserAccess({ onFinish }) {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      {isRegistering ? (
        <SignUp onLogin={setIsRegistering} onRegister={onFinish}></SignUp>
      ) : (
        <SignIn onRegister={setIsRegistering} onLogin={onFinish}></SignIn>
      )}
    </>
  );
}
