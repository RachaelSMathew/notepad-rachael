// components/Notebook/NoteAdd.js
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./Notebook.css";
import ShowMoreText from "react-show-more-text";
import {useAuthValue} from '../../AuthContext'

const Notebook = (props) => {
 
  const {currentUser} = useAuthValue()
  const [notebookData, setNotebook] = useState(props.notebook);
  const emailExists = (notes, email) => {
    return notes.includes(email)
  };
  const handleData = (e, id, notePublic) => {
    var result = [...notebookData];
    result = result.map((x) => { //x == note 
      
      if (x.id === id) {
        if(!x.heart) {
          x.heart = [currentUser?.email]
          return x;
        } else {
          if(emailExists(x.heart, currentUser?.email)) {
            x.heart = x.heart.filter((email) => email !== currentUser?.email)
            return x;
          } else {
            x.heart.push(currentUser?.email)
            /*
            if(notePublic) {
              firebase.database().ref("notebook/public/"+id).update({heart: x.heart})
            } else {
              firebase.database().ref("notebook/"+currentUser?.email+id).update({heart: x.heart})
            }
            */
            return x;
          }
        }
      } return x;
    });
    setNotebook(result);
  };
  return (
    <>
      <section className="notebook-container">
        <div className="notebook">
          {props.notebook.map((note, index) => (
            <React.Fragment key={index}>
              <div className={`${note.public ? "notebookInfo publicPost" : "notebookInfo"}`} key={note.id}>
              {note.public  && note.email !== currentUser?.email ? (
                  <div className="notebookInfo-user">
                    <h3 className="tooltip">{note.avatar} <span class="tooltiptext">{note.email}</span></h3>
                    
                  </div>
                ) : (
                  null
                )}
                <div className="notebookInfo-title">
                  <h3><ShowMoreText lines={3} width={340} keepNewLines={true}>{note.title}</ShowMoreText></h3>
                </div>
                <div className="notebookInfo-description">
                  <p><ShowMoreText lines={3} width={340} keepNewLines={true}>{note.description}</ShowMoreText></p>
                </div>
                <div className="extraNotes">
                {note.public ? (
                  <h3 className="public-text">🌎</h3> 
                ) : (<h3 className="public-text">🔒</h3>)}
                <input
                  type="button"
                  className="checkmark"
                  value={emailExists(note.heart, currentUser?.email) ? "❤️":"🤍"}
                  onClick={(e) => handleData(e, note.id, note.public)} />    
                </div>            
              </div>
            </React.Fragment> 
          ))}
        </div>
      </section>
    </>
  );
};

export default Notebook;