import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isLogin, setisLogin] = useState(true);

  useEffect(() => {
    setisLogin(localStorage.getItem('isLogin'));
  }, [localStorage.getItem('isLogin')]);
  return (
    <div className="navbar">
      <a href="/">Home</a>
      <a href="/upload">Upload</a>
      {isLogin === true ? (
        <>
          <a href="/profile">Profile</a>
          <span>Logout</span>
        </>
      ) : (
        <>
          <a href="/register">Register</a>
          <a href="/login">Log In</a>
        </>
      )}
    </div>
  );
};

export default Navbar;
