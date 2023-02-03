// components/NoteAdd/NoteAdd.js
import React, { useState } from "react";
import {useAuthValue} from '../../AuthContext'
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./NoteAdd.css";
import Switch from "react-switch";


const NoteAdd = () => {
  const [avatar, setAvatar] = React.useState([]);
  const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤕", "🥳", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "💩", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"]
  const {currentUser} = useAuthValue()
  const [checked, setChecked] = React.useState(false);
  const [height, setHeight] = React.useState(40);

  const handleChange = () => {
    setChecked(!checked);
  };
  const avatarSet = () => {
    const emojiExists = avatar.filter((ava) => ava.startsWith(currentUser?.email))
    console.log("This"+emojiExists)
    if(emojiExists[0]) {
      return emojiExists[0].substring(emojiExists[0].indexOf(' ') + 1);
    }
    let emoji = emojis[Math.floor(Math.random() * emojis.length)]
    let avatarClone = avatar
    avatarClone.push(currentUser?.email + " " + emoji)
    setAvatar([...avatarClone])
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

  const addNote = () => {
    if (title !== "" && description !== "") {
        if(checked) {
            firebase.database().ref("notebook/public").push({
                title: title,
                email: currentUser?.email,
                public: true,
                description: description,
                avatar: avatarSet(),
                heart: []
              });
        } else {
        firebase.database().ref("notebook/"+currentUser?.email.toString().replace('.com', '').replace('.edu', '')).push({
            title: title,
            email: currentUser?.email,
            public: false,
            description: description,
            avatar: avatarSet(),
            heart: []
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
            maxlength = "30" 
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
          <button onClick={() => addNote()}>Add a Note</button>
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