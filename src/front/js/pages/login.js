import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const resp = await fetch("https://3001-miguelubeda-jwtreactfla-xlmfibrzk3v.ws-eu54.gitpod.io/token",{ 
        mode: 'no-cors', 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: password}) 
    })

    if(!resp.ok) throw Error("There was a problem in the login request")

    if(resp.status === 401){
         throw("Invalid credentials")
    }
    else if(resp.status === 400){
         throw ("Invalid email or password format")
    }
    const data = await resp.json()
    // save your token in the localStorage
   //also you should set your user into the store using the setStore function
    localStorage.setItem("jwt-token", data.token);

    return data
}
  return (
    <form onSubmit={login}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={e => setEmail(e.target.value)}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={e => setPassword(e.target.value)}
          
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <Link to="/login">
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
          </Link>
    </form>
  );
};
