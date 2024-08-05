import React from "react"

export default function MessageBox(props){
    return(
        <div>
            <div className="alert alert-danger" varient={props.varient || 'info'}>
                {props.children}
            </div>
        </div>
    )
};