import React from 'react'

const noteItem = (props) => {
    const { notes,index } = props;
    return (
        <>
           <tr>
            <td>{index+1}</td>
            <td>{notes.title}</td>
            <td>{notes.description}</td>
           </tr>

        </>
    )
}

export default noteItem
