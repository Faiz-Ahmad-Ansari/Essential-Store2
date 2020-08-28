import React from 'react';
import './Button.css'

const Button = props => {
    return ( 
        <button type="button" onClick={props.onClick} className={`btn ${props.className}`}>
            {props.name}
        </button>
     );
}
 
export default Button;