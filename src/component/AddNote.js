import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote } = context;
    const [note,setNote] = useState({title: "",description: "",tag:""})
    const addclick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "",description: "",tag:""});
        props.showAlert("Note has been added Succesfully!!","success")
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }


    return (
        <div>
            <h1>Add a Note</h1>
            <form>
                <div className="mt-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"  name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}  minLength={5} required/>
                </div>
                <div className="my-1">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag"  name="tag" value={note.tag} aria-describedby="emailHelp" onChange={onChange}  minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <textarea rows={6} type="text" className="form-control" name="description" value={note.description} id="description" onChange={onChange} minLength={5} required/>
                </div>

                <button disabled={note.title.length<5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={addclick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
