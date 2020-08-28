import React from 'react';

const Input = props => {
    return ( 
        <div className='col-12 col-md-6 mt-2 mb-3'>
                <div className='row'>
                    <div className={`${props.labelClass} col-12 col-md-6 d-flex align-items-end`} >
                        <label >{props.fieldName}</label>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className="form-group mb-0">                                   
                            <input 
                                type='text' className={`${props.inputClass} form-control `}
                                value={props.value} disabled={true} />                                                                   
                        </div>
                    </div>
                </div>
            </div>
     );
}
 
export default Input;