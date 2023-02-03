import React from "react";
import "./Navbar.css";
import { signOut } from 'firebase/auth' 
import {auth } from '../../firebase'

const Navbar = () => {
  return (
    <>
      <h4 className="signOut" onClick={() => signOut(auth)}>Sign Out</h4>
      <header className="navbar">
        <h2 className="heading">📓 Rachael and Friends Notebook </h2>
        
      </header>
    </>
  );
};

export default Navbar;
