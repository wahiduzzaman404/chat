/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Add from '../img/addAvatar.png';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate,Link } from 'react-router-dom';

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Upload profile picture to storage
      const storageRef = ref(storage, `avatars/${res.user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          console.error('Error uploading image:', error);
          setErr(true);
        },
        async () => {
          // Image upload successful, get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update user profile with display name and photo URL
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          // Save user data to Firestore
          await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'userChats', res.user.uid), {});
          navigate("/");

          console.log('Registration successful');
        }
      );
    } catch (error) {
      console.error('Registration error:', error.code, error.message);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">FIPI CHAT </span>
        <span className="title"> Register</span>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="file" id="file" style={{ display: 'none' }} />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign Up</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>You do have an account? <Link to='/login'>Login</Link> </p>
      </div>
    </div>
  );
};
