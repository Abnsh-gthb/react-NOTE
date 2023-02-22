import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sl No.</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                         {notes.map((notes,index) => {
                            return <Noteitem key={index} notes={notes} index={index}/>
                        })}
                    
                </tbody>
            </table>
        </div >
    )
}

export default Notes
