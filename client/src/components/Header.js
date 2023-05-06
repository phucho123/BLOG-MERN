import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';

export const Header = () => {
  const { userInfo,setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        setUserInfo(res);
      });
  },[]);
  const handleOnLogout = () =>{
    fetch('http://localhost:5000/logout',{
      credentials: 'include',
      method: "POST"
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
    <main>
      <header>
        <Link to="/" className="logo">MY BlOG</Link>
        <nav>
          {
            username && (
              <>
                <button><Link to="/create" className="createPost" >CreatePost</Link></button>
                <button><a href='/' className="logout" onClick={handleOnLogout}>Logout</a></button>
                <span><i class="fa-regular fa-user"></i> {userInfo?.username}</span>
              </>
            )
          }
          {
            !username && (
              <>
                <button><Link to="/login" className="login" >Login</Link></button>
                <button><Link to="/register" className="register">Register</Link></button>
              </>
            )
          }
        </nav>
      </header>
    </main>
  )
}
