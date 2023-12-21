/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const {currentUser}=useContext(AuthContext)
  return (
    <div className="navbar">
        <span className="logo">
            FIPI CHAT
        </span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={() =>signOut(auth)}>LogOut</button>
        </div>
    </div>
  )
}
