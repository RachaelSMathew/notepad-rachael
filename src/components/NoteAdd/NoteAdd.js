// components/NoteAdd/NoteAdd.js
import React, { useState, useEffect } from "react";
import {useAuthValue} from '../../AuthContext'
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./NoteAdd.css";
import Switch from "react-switch";


const NoteAdd = () => {
  const [avatar, setAvatar] = React.useState([])

  useEffect(()=>{
    getAvatars()
    console.log(avatar);//output 'sidebar'
  },[])

  const getAvatars = async () => {
    let results = []
    let exists = firebase
    .database()
    .ref("users/avatars")
    if(exists) {
      exists.orderByKey().once('value').then(function(snapshot)
        {
          snapshot.forEach(function(child) {
            results.push(child.val());
          })
          
        }) 
    }
    await delay(5000);
    setAvatar(results)
  };

  const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤕", "🥳", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "💩", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"]
  const {currentUser} = useAuthValue()
  const [checked, setChecked] = React.useState(false);
  const [height, setHeight] = React.useState(40);

  const handleChange = async () => {
    setChecked(!checked);
  };
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const avatarSet = () => {
    const emojiExists = avatar.find(ava => ava.includes(currentUser?.email))
    if(emojiExists) {
      return emojiExists.substring(emojiExists.indexOf(' ') + 1);
    }
    let emoji = emojis[Math.floor(Math.random() * emojis.length)]
    let avatarClone = avatar
    avatarClone.push(currentUser?.email + " " + emoji)
    setAvatar([...avatarClone])
    firebase.database().ref("users").set({"avatars" : avatar})
    return emoji
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => {
    setHeight({height: 500})
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addNote = async () => {
    document.getElementsByClassName("noteadd").getElementsByClassName("form-group").getElementsByClassName("noteadd-header noteadd-description").value = "";
    let avatarSign = avatarSet()
    if (title !== "" && description !== "") {
        if(checked) {
            firebase.database().ref("notebook/public").push({
                title: title,
                email: currentUser?.email,
                public: true,
                description: description,
                avatar: avatarSign,
                heart: [],
                heartCount : 0
              });
        } else {
        firebase.database().ref("notebook/"+currentUser?.email.toString().replace('.com', '').replace('.edu', '')).push({
            title: title,
            email: currentUser?.email,
            public: false,
            description: description,
            avatar: avatarSign,
            heart: [],
            heartCount : 0
        });
        }
    }
  };

  return (
    <>
      <div className="noteadd">
        <h1>Add a New Note</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder= "Note Title maxChar: 30"
            className="noteadd-header"
            name="noteadd-header"
            value={title}
            maxLength = "30" 
            onChange={(val) => handleTitleChange(val)}
            />
        </div>
        <div className="form-group">
          <textarea
            name="noteadd-description"
            className="noteadd-description"
            value={description}
            onChange={(val) => handleDescriptionChange(val)}
          >Note Description</textarea>
        </div>
        
        <div className="noteadd-button">
          <button onClick={addNote}>Add a Note</button>
          <Switch checked={checked} onChange={handleChange} 
          handleDiameter={28}
          offColor="#08f"
          onColor="#0ff"
          offHandleColor="#0ff"
          onHandleColor="#08f"
          height={40}
          width={110}
          borderRadius={6}
          activeBoxShadow="0px 0px 1px 2px #fffc35"
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "black",
                marginLeft: "5px",
                marginRight: "5px",
                paddingRight: 2
              }}
            >
            private
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "black",
                paddingRight: 2
              }}
            >
              public
            </div>
          }
          uncheckedHandleIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 20
              }}
            >
              🔒
            </div>
          }
          checkedHandleIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                color: "red",
                fontSize: 18
              }}
            >
              🌎
            </div>
          }
          />
        </div>
      </div>
    </>
  );
};

export default NoteAdd;
