import React from 'react';
import './Button.css'

const Button = props => {
    return ( 
        <button type="button" onClick={props.onClick} className={`btn btn-primary w-100 ${props.className}`}>
            {props.name}
        </button>
     );
}
 
export default Button;