import './profile.css'
import React, { useState, useEffect } from "react";
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import {firebase, auth } from './firebase'
import Navbar from "./components/Navbar";
import NoteAdd from "./components/NoteAdd";
import Notebook from "./components/Notebook";
import { async } from '@firebase/util';



function Profile() {


  const [noteBookData, setNoteBookData] = useState([]);
  const {currentUser} = useAuthValue()
  const updateNotes = () => {
    firebase
    .database()
    .ref("notebook/public")
    .on("child_added", (snapshot) => {
      let note = {
        email: snapshot.val().email,
        public: snapshot.val().public, 
        id: snapshot.key,
        title: snapshot.val().title,
        description: snapshot.val().description,
        avatar: snapshot.val().avatar,
        heart: snapshot.val().heart,
        heartCount : snapshot.val().heart ? snapshot.val().heart.length : 0
      };
      let notebook = noteBookData;
      notebook.push(note);
      setNoteBookData([...noteBookData]);
    });

    firebase
      .database()
      .ref("notebook/"+currentUser?.email.toString().replace('.com', '').replace('.edu', ''))
      .on("child_added", (snapshot) => {
        let note = {
          avatar: snapshot.val().avatar,
          email: snapshot.val().email,
          public: snapshot.val().public, 
          id: snapshot.key,
          title: snapshot.val().title,
          description: snapshot.val().description,
          heart: snapshot.val().heart,
          heartCount : snapshot.val().heart ? snapshot.val().heart.length : 0
        };
        let notebook = noteBookData;
        notebook.push(note);
        setNoteBookData([...noteBookData]);
      });

    firebase
      .database()
      .ref("notebook")
      .on("child_removed", (snapshot) => {
        let notebook = noteBookData;
        notebook = notebook.filter((note) => note.id !== snapshot.key);
        setNoteBookData(notebook);
      });
  };

  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="note-section">
        <NoteAdd />
        <Notebook notebook={noteBookData} />
      </div>
    </div>
  );
}

export default Profile
