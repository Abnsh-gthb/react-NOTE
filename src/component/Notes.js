import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';
import {useNavigate} from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const { notes, getNote, edtNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote();
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const ref = useRef(null);

    const refClose = useRef(null);

    const updateclick = (e) => {
        e.preventDefault();
        // console.log("updating note",note)
        edtNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Succesfully!!","success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary" style={{ display: "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mt-4">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="my-1">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea rows={6} type="text" className="form-control" name="edescription" value={note.edescription} id="edescription" onChange={onChange} minLength={5} required />
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button disabled={note.etitle.length<5 || note.edescription.length <5} type="button" onClick={updateclick} className="btn btn-primary" >Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sl No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col" className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {notes.length === 0 &&  <tr>
                        <td colSpan={4}>No Notes to Display</td>
                        </tr>}
                      
                        {notes.map((notes, index) => {
                            return <Noteitem key={index} notes={notes} index={index} updateNote={updateNote} showAlert={props.showAlert} />
                        })}

                    </tbody>
                </table>
            </div >
        </>
    )
}

export default Notes
