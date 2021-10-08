import { useRef, useEffect } from "react";
import { isAuthenticated, register } from "../helpers/userAuth";
import { RegisterForm } from "../styles/registerFormStyles";

export default function Register() {
  const username = useRef("");
  const pass = useRef("");
  const err_msg = useRef("");
  const retypedPass = useRef("");

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <RegisterForm
      onSubmit={(e) => register(e, username, pass, retypedPass, err_msg)}
    >
      <h2>Create an Account</h2>
      <form>
        <div className="err_msg" ref={err_msg}></div>
        <div>
          <label>Username</label>
          <input type="text" ref={username} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={pass} required />
        </div>
        <div>
          <label>Retype Password</label>
          <input type="password" ref={retypedPass} required />
        </div>
        <button type="submit">Create an Account</button>
        <p>
          <a href="/login">Create Here</a> to login
        </p>
      </form>
    </RegisterForm>
  );
}
