import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function onSubmit(e){
    e.preventDefault();
    if(email !== "" && password !== ""){
      let json2 = JSON.stringify({email, password});

      const response = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: json2,
      });
      const data = await response.json(); 
      if(data.status === "ok"){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logged In!',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {window.location.href = "/LoggedIn";},1500);
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Invalid Credentials!',
          showConfirmButton: false,
          timer: 1000
        })
      }
    }
  }

  useEffect(() => {
    import ("../CSS/Login.css");
  }, []);

  return (
    <div>
        <link rel="stylesheet" href="../CSS/Login.css" />
        <div className="wrapper">
          <div className="title">Login Form</div>
          <form onSubmit={onSubmit}>
            <div className="field">
              <input type="text" onChange={(e) => {setEmail(e.target.value)}} required />
              <label>Email Address</label>
            </div>
            <div className="field">
              <input type="password" onChange={(e) => {setPassword(e.target.value)}} required />
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
