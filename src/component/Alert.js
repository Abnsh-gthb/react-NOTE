import React from 'react'

export default function Alert(props) {
    const capword = (word)=>{
        if(word==="danger"){word="error"}
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
    return (
        <div style={{height:'60px'}}>
       {props.Alert && <div className={`alert alert-${props.Alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capword(props.Alert.type)}{"!! "}</strong> {props.Alert.msg}
           
        </div>}
        </div>
        

    )
}

