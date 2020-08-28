import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Common/Header/Header';
import Button from '../Reusable/Button/Button';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data : {
                ukInventory : {
                    maskQty : {
                        fieldName : 'Quantity of Mask from U.K inventory',
                        value : '',
                        additional : '',
                        },
                    maskPrice : { 
                        fieldName : 'Price of Mask from U.K inventory',
                        value : '',
                        additional : ' £ ',
                        },
                    glovesQty : {  
                        fieldName : 'Quantity of Gloves from U.K inventory',
                        value : '',
                        additional : '',
                        },
                    glovesPrice: {  
                        fieldName : 'Price of Glove from U.K inventory',
                        value : '',
                        additional : ' £ ',
                        },
                },
                germanyInventory : {
                    maskQty : {
                            fieldName : 'Quantity of Mask from Germany inventory',
                            value : '',
                            additional : '',
                        },
                    maskPrice :{ 
                            fieldName : 'Price of Mask from Germany inventory',
                            value : '',
                            additional : ' £ ',
                        },
                    glovesQty :{    
                            fieldName : 'Quantity of Gloves from Germany inventory',
                            value : '',
                            additional : '',
                    },
                    glovesPrice : { 
                        fieldName : 'Price of Gloves from Germany inventory',
                            value : '',
                            additional : ' £ ',
                        },
                            
                },
                shippingCharge:{
                    mask : {   
                        fieldName : 'Shipping Charge of Mask',
                        value : '',
                        additional : ' £ ',
                        },
                    gloves : { 
                        fieldName : 'Shipping Charge of Gloves',
                            value : '',
                            additional : ' £ ',
                        }
                },
                totalPrice:{
                    totalPrice: { 
                        fieldName : 'Total Price',
                        value : '',
                        additional : ' £ (GBP)',
                    }
                },
            },
            ordered : false
         }
    }

    static getDerivedStateFromProps(props,state) {
        
        if(props.location.state === undefined){
            return false
        }

        let stateObj = {...state.data}
        let propsObj = props.location.state

        Object.entries(propsObj).map(
            ([key,val]) => {
                let x = stateObj[key]
               return Object.entries(val).map(
                    ([key,val]) => {

                       return x[key].value = val
    
                    }
                )
            }
        )

        return {...stateObj}        
    }

    renderOutputs = () => {
        let stateObj = {...this.state.data}

       return Object.values(stateObj).map(
            (e) => {
             return Object.values(e).map(
                    (val,i) => {
                        return(
                                <div className='col-12 col-md-6 mt-2 mb-3' key={i}>
                                    <div className='row'>
                                        <div className='col-12 col-md-4 d-flex align-items-end'>
                                            <label >{val.fieldName}</label>
                                        </div>
                                        <div className='col-12 col-md-8'>
                                            <div className="form-group mb-0">                                   
                                                <input 
                                                    type='text' className={`form-control `}
                                                    value={`${val.value}${val.additional}`} disabled={true} />                                                                   
                                            </div>
                                        </div>
                                    </div>
                                </div>        
                         )
                    }
                )
            }
        )

    }

    buyNow = () => {
        let totalPriceValue = this.state.data.totalPrice.totalPrice.value
        if(totalPriceValue === 0 || totalPriceValue === '' ){    
            alert(`Please Add Atleast 1 item to Buy
            Click on "Home Page" to Order`)
        }else {
            this.setState({ordered:true})
        alert(`CONGRATULATIONS!!! Orders Placed Succesfully
Click on "Home Page" to Order Again`)
    }
}
    
    render() { 
        return ( 
            <>
                <Header />
                <div className='row p-0 m-3 '>
                    {this.renderOutputs()}                        
                </div>
                <div className='row p-0 m-3 '>
                    <div className='col-12 col-md-6 p-1'>
                        {this.state.totalPrice.totalPrice.value === 0 || this.state.totalPrice.totalPrice.value === '' || this.state.ordered ?
                        <Button className=' disabled not-allowed' name='Buy Now' />
                        :
                        <Button name='Buy Now' onClick={this.buyNow}/>                        
                    }
                    </div>                        
                    <div className='col-12 col-md-6 p-1'>
                        {this.state.ordered ?
                        <Link to={{
                            pathname:'/',
                            state:this.props.location.state
                        }}>
                            <Button  name='Home Page'/>
                        </Link> :
                        <Link to='/'>
                            <Button  name='Home Page'/>
                        </Link>
                        }
                    </div>                        
                </div>
            </>
         );
    }
}
 
export default Checkout;