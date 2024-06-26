import { useState } from "react";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

export function UserAccess({ onSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      {isRegistering ? (
        <SignUp onChangePage={setIsRegistering} onSuccess={onSuccess}></SignUp>
      ) : (
        <SignIn onChangePage={setIsRegistering} onSuccess={onSuccess}></SignIn>
      )}
    </>
  );
}
