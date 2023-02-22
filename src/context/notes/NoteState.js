// import react from "react";
// import { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";



const NoteState = (props) =>{
    // const stt = {
    //     // "name" : "Abinash",
    //     // "Class" : "18"
    // }
    // const [state,setState] = useState(stt);
    const rnotes = [
        {
          "_id": "63f3b7c623bd2a7bb5f5c8b8",
          "user": "63f24b30dd4fe00fee7a466d",
          "title": "I love to join It",
          "description": "hehe how are you",
          "tag": "its ok!",
          "date": "2023-02-20T18:11:18.362Z",
          "__v": 0
        },
        {
          "_id": "63f49494519b345096ae0862",
          "user": "63f24b30dd4fe00fee7a466d",
          "title": "123 I love to join Ithehe",
          "description": "123 hehe how are you Ithehe",
          "tag": "its ok!",
          "date": "2023-02-21T09:53:24.675Z",
          "__v": 0
        }
      ]
      
      const [notes,setNotes] = useState(notesInitial)



    return(
        <noteContext.Provider value={{rnotes,setNotes}}>
            {props.children}
        </noteContext.Provider>

    )
}


export default NoteState;