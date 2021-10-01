import { useEffect, useRef } from "react";
import { login } from "../helpers/userAuth";
import { LoginForm } from "../styles/loginFormStyles";
import { isAuthenticated } from "../helpers/userAuth";

export default function Login() {
  const username = useRef("");
  const pass = useRef("");
  const err_msg = useRef();

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <LoginForm onSubmit={(e) => login(e, username, pass, err_msg)}>
      <h2>Login to TopChats</h2>
      <form>
        <div className="err_msg" ref={err_msg}>
          Username or Password is wrong!
        </div>
        <div>
          <label>Username</label>
          <input type="text" ref={username} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={pass} required />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an Account? <a href="/register">Create Here</a>
        </p>
      </form>
    </LoginForm>
  );
}
