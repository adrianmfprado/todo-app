import { useCallback, useEffect, useRef, useState } from "react";

export const Form = () => {
  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');

  const emailInput = useRef();

  useEffect(() => {
    console.log(emailInput.current);

    if (validateEmail(email)) {
      setEmailHelper('o email é válido.');
    } else {
      setEmailHelper('o email é inválido');
    }
  }, [email]);

  const validateEmail = useCallback(function (email) {
    if (email.indexOf('@') >= 0)
      return true;
    return false;
  }, []);

  return (
    <div>
      <div>
        <input
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailInput}
        />
        <span>{emailHelper}</span>
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
        />
      </div>
      <div>
        <button onClick={() => {
          emailInput.current.focus()
        }}>Focus</button>
      </div>
    </div>
  );
}