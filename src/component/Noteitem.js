import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {delNote } = context;
    const { notes,index,updateNote } = props;
    return (
        <>
           <tr>
            <td>{index+1}</td>
            <td>{notes.title}</td>
            <td>{notes.description}</td>
            <td className='text-center'><i className="far fa-trash-alt mx-4" onClick={()=>{delNote(notes._id)}}/><i className="far fa-edit mx-4" onClick={()=>{updateNote(notes)}}/></td>
           </tr>

        </>
    )
}

export default Noteitem
