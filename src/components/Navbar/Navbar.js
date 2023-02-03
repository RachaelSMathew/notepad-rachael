import React from "react";
import "./Navbar.css";
import { signOut } from 'firebase/auth' 
import {auth } from '../../firebase'

const Navbar = () => {
  return (
    <>
      <span className="signOut" onClick={() => signOut(auth)}>Sign Out</span>
      <header className="navbar">
        <h2 className="heading">📓 Rachael and Friends Notebook </h2>
        
      </header>
    </>
  );
};

export default Navbar;