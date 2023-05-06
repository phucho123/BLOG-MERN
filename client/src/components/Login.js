import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const history = useNavigate();
  const handleOnSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include'
    })
    if(response.status === 200){
      alert("Login Successful");
      response.json().then(res => {
        setUserInfo(res);
        setRedirect(true);
      })
      
    }else{
      alert("Login Failed");
    }
  }

  if(redirect){
    history('/');
  }
  return (
    <form className='login' onSubmit={handleOnSubmit}>
        <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
    </form>
  )
}
