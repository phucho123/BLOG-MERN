import React, { useState } from 'react';

export const Register = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/register',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        });
        if(response.status === 200){
            alert("Register Successful");
        }else{
            alert("Register Failed");
        }
    }
  return (
    <form className='register' onSubmit={handleOnSubmit}>
        <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Register</button>
    </form>
  )
}
