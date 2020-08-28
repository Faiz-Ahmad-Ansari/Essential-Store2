import React from 'react';
import './Button.css'

const Button = props => {
    return ( 
        <button type="button" onClick={props.onClick} className={`btn btn-primary w-100 ${props.className}`}
                data-toggle={props.dataToggle} data-target={props.dataTarget} data-dismiss={props.dataDismiss}
        >
            {props.name}
        </button>
     );
}
 
export default Button;