import { Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({auth}) {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  function enter(e){
    if(e.key === "Enter") login();
  }

  async function login() {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(""); setPassword("");
       navigate("/",{replace: true});
       setLoginError(false);
    } catch(error){
      console.log(error.code)
      setLoginError(true);
    }
  }

  return (
    <div className='login' onKeyDown={e => enter(e)}>
        
        <TextField
        error={loginError}
        required
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          helperText={loginError ? "Hibás felhasználónév vagy jelszó" : ""}
        />
        <TextField
        error={loginError}
          required
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button 
        variant="contained" 
        color='success'
        onClick={login}
        >Login</Button>
    </div>
  )
}
