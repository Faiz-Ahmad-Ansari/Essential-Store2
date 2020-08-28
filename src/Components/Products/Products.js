import React from 'react';

const Products = props => {
    return ( 
        <div className='col-12 col-md-6 '>
            <div className="card">                    
                <div className="card-body">
                    <h5 className="card-title">{props.data.name}</h5>
                    <p className="card-text">{props.data.description}</p>

                </div>
            </div>
        </div>
     );
}
 
export default Products;
