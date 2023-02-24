// import react from "react";
// import { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";



const NoteState = (props) => {
  const host = "http://localhost:5000";
  const rnotes = [];

  const [notes, setNotes] = useState(rnotes)

  //Get all Note
  const getNote = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);

  }
  //Add Note
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    // console.log("Adding a new node!!");
    
  }

  //Delete Note
  const delNote = async (id) => {
      //Api call
     
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: 'DELETE',
  
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
  
      });
    
      // const json = await response.json();
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit Note
  const edtNote = async (id, title, description, tag) => {
    //Api call

    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json();


    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes,getNote ,setNotes, addNote, delNote, edtNote }}>
      {props.children}
    </noteContext.Provider>

  )
}


export default NoteState;