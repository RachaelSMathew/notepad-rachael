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

  const emojis = ["๐", "๐", "๐", "๐", "๐", "๐", "๐คฃ", "๐", "๐", "๐", "๐", "๐", "๐", "๐ฅฐ", "๐", "๐คฉ", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "๐คช", "๐คจ", "๐ง", "๐ค", "๐", "๐คฉ", "๐ฅณ", "๐", "๐", "๐", "๐", "๐", "๐", "๐", "โน๏ธ", "๐ฃ", "๐", "๐ซ", "๐ฉ", "๐ฅบ", "๐ข", "๐ญ", "๐ค", "๐ ", "๐ก", "๐คฌ", "๐คฏ", "๐ณ", "๐ฅต", "๐ฅถ", "๐ฑ", "๐จ", "๐ฐ", "๐ฅ", "๐", "๐ค", "๐ค", "๐คญ", "๐คซ", "๐คฅ", "๐ถ", "๐", "๐", "๐ฌ", "๐", "๐ฏ", "๐ฆ", "๐ง", "๐ฎ", "๐ฒ", "๐ด", "๐คค", "๐ช", "๐ต", "๐ค", "๐ฅด", "๐คข", "๐คฎ", "๐ค", "๐ฅณ", "๐ท", "๐ค", "๐ค", "๐ค", "๐ค ", "๐", "๐ฟ", "๐น", "๐บ", "๐", "๐ป", "๐ฝ", "๐ค", "๐ฉ", "๐บ", "๐ธ", "๐น", "๐ป", "๐ผ", "๐ฝ", "๐", "๐ฟ", "๐พ"]
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
          <textarea
            className="noteadd-header"
            name="noteadd-header"
            placeholder="Note Title maxChar = 30"
            value={title}
            maxLength = "30" 
            onChange={(val) => handleTitleChange(val)}
            ></textarea>
        </div>
        <div className="form-group">
          <textarea
            name="noteadd-description"
            className="noteadd-description"
            placeholder="Note Description"
            value={description}
            onChange={(val) => handleDescriptionChange(val)}
          ></textarea>
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
                color: "orange",
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
              ๐
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
              ๐
            </div>
          }
          />
        </div>
      </div>
    </>
  );
};

export default NoteAdd;
