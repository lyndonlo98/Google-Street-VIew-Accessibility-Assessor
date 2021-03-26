import React, { useState, useEffect, useRef, useContext } from "react";
import { Auth } from 'aws-amplify';

async function signUp(username, password, email, phoneNumber) {

    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phoneNumber,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function confirmSignUp(username, code) {
    await Auth.confirmSignUp(username, code)
        .then(() => {
            console.log(username);            
        })
        .catch(error => {
            console.log('error signing up:', error);
        });
}

async function signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password)
        .then((response) => {
          console.log("sign in successful", response);
        });
    } catch (error) {
        console.log('error signing in', error);
    }
}

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

const SignInInput = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
       
    return (
      <div>
        <div className="signIn_username_input">
          <input
            onChange={event => {
              const payload = event.target.value; // payload = the actual input
              setUsername(payload);
            }}
  
            placeholder={"Username"}
            value={username}
          />
        </div>
        <div className="signIn_password_input" >
          <input
            type="password"
            onChange={event => {
              const payload = event.target.value;
              setPassword(payload);
            }}
            placeholder={"Password"}
            value={password}
          />
        </div>
        <button 
          className="plan-trip-button"
          onClick={event => (
            signIn(username, password)
          )}
        >
          <span>Sign In</span>
        </button>
      </div>
    );
}

export default SignInInput;