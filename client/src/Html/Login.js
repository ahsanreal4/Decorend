import React, {useEffect} from 'react';

export default function Login() {
  
  useEffect(() => {
    import ("../CSS/Login.css");
  }, []);

  return (
    <div>
        <link rel="stylesheet" href="../CSS/Login.css" />
        <div className="wrapper">
          <div className="title">Login Form</div>
          <form action="/LoggedIn">
            <div className="field">
              <input type="text" required />
              <label>Email Address</label>
            </div>
            <div className="field">
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="content">
              <div className="checkbox">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <div className="pass-link"><a href="/ForgetPassword">Forgot password?</a></div>
            </div>
            <div className="field">
              <input type="submit" defaultValue="Login" />
            </div>
            <div className="signup-link">Not a member? <a href="/signup">Signup now</a></div>
          </form>
        </div>
      </div>
  )
}
