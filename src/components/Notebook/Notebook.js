// components/Notebook/NoteAdd.js
import { Textfit } from 'react-textfit';

import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./Notebook.css";
import ShowMoreText from "react-show-more-text";
import {useAuthValue} from '../../AuthContext'

const Notebook = (props) => {

  const [heart, setHeart] = React.useState(false);
  const [publicFilt, setPublicFilt] = React.useState(true);
  const [privateFilt, setPrivateFilt] = React.useState(true);
  const {currentUser} = useAuthValue()
  const [notebookData, setNotebook] = useState(props.notebook);
  const emailExists = (notes, email) => {
    if(!notes) return false 
    return notes.includes(email)
  };
  const clickFilter = (e, filter) => {
    if(filter === "heart") {
      setHeart(!heart)
    } 
    if(filter === "private") {
      setPrivateFilt(!privateFilt)
    } 
    if(filter === "public") {
      setPublicFilt(!publicFilt)
    }
  }
  const handleData = (e, id, notePublic) => {
    var result = notebookData;
    result = result.map((x) => { //x == note 
      if (x.id === id) {
        if(!x.heart) {
          x.heart = [currentUser?.email]
        } else {
          if(emailExists(x.heart, currentUser?.email)) {
            x.heart = x.heart.filter((email) => email !== currentUser?.email)
          } else {
            x.heart.push(currentUser?.email)
          }
        }
        if(notePublic) {
          firebase.database().ref("notebook/public/"+id).update({heart: x.heart})
        } else {
          firebase.database().ref("notebook/"+currentUser?.email.toString().replace('.com', '').replace('.edu', '')+"/"+id).update({heart: x.heart})
        }
      } 

      x.heartCount = x.heart ? x.heart.length : 0
      console.log("This is the heart learned" + x.heartCount)
      return x;
    });
    setNotebook([...result]);
  };

  return (
    <>
    <div className="extraNotes">
    <div className="icons-filter-show-text">show</div>
<div onClick={(e) => clickFilter(e, "heart")} className={`icons-filter ${heart ? "opacity" : ""}`} >❤️</div>
<div onClick={(e) => clickFilter(e, "private")} className={`icons-filter ${privateFilt ? "opacity" : ""}`}>🔒</div>
<div onClick={(e) => clickFilter(e, "public")} className={`icons-filter ${publicFilt ? "opacity" : ""}`}>🌎</div>
</div>
      <section className="notebook-container">
        <div className="notebook">
          {props.notebook.map((note, index) => (
            (heart && emailExists(note.heart, currentUser?.email)) || (publicFilt || privateFilt) && (publicFilt === note.public || privateFilt === !note.public) ?
            <React.Fragment key={index}>
              <div className={`${note.public ? "notebookInfo publicPost" : "notebookInfo"}`} key={note.id}>
                <div className="notebookInfo-user">
                  <h3 className="tooltip">{note.avatar} <Textfit max="20" forceSingleModeWidth={true} mode="single" class={`tooltiptext ${note.public ? "tip-public" : "tip-private"}`}>{note.email === currentUser?.email ? "my tweet" : note.email.split('@')[0] }</Textfit> </h3>
                </div>
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
                <h3 className="heartCountText">{note.heartCount} </h3> 
                <input
                  type="button"
                  className="checkmark"
                  value={emailExists(note.heart, currentUser?.email) ? "❤️":"🤍"}
                  onClick={(e) => handleData(e, note.id, note.public)} />   
                
                </div>            
              </div>
            </React.Fragment> : null
          ))}
        </div>
      </section>
    </>
  );
};

export default Notebook;
