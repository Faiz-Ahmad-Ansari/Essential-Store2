import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Common/Header/Header';
import Button from '../Reusable/Button/Button';
import Input from '../Reusable/Input/Input';

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


    renderTable = () => {

        let order ={...this.state.data}

        return (        
        <>
            <div className='col-12 col-md-6'>
                <table className="table">
                    <thead>
                        <tr className='bg-secondary text-white'>
                            <th scope="col"></th>
                            <th scope="col">U.K</th>                                                                
                            <th scope="col"></th>                                                                
                        </tr>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Qty.</th>
                            <th scope="col">Price</th>                                
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Mask</th>
                            <td>{order.ukInventory.maskQty.value}</td>
                            <td>{order.ukInventory.maskPrice.value} £</td>                            
                        </tr>
                        <tr>
                            <th scope="row">Gloves</th>
                            <td>{order.ukInventory.glovesQty.value}</td>
                            <td>{order.ukInventory.glovesPrice.value} £</td>                            
                        </tr>            
                    </tbody>
                </table>                    
            </div>
            <div className='col-12 col-md-6'>
                <table className="table">
                    <thead>
                        <tr className='bg-secondary text-white'>
                            <th scope="col"></th>
                            <th scope="col">Germany</th>                                                                
                            <th scope="col"></th>                                                                
                        </tr>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Qty.</th>
                            <th scope="col">Price</th>                                
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Mask</th>
                            <td>{order.germanyInventory.maskQty.value}</td>
                            <td>{order.germanyInventory.maskPrice.value} £</td>
                            
                        </tr>
                        <tr>
                            <th scope="row">Gloves</th>
                            <td>{order.germanyInventory.glovesQty.value}</td>
                            <td>{order.germanyInventory.glovesPrice.value} £</td>                            
                        </tr>            
                    </tbody>
                </table>
            </div>
        
            <Input fieldName={order.shippingCharge.mask.fieldName} value={`${order.shippingCharge.mask.value}${order.shippingCharge.mask.additional}`} /> 
            <Input fieldName={order.shippingCharge.gloves.fieldName} value={`${order.shippingCharge.gloves.value}${order.shippingCharge.gloves.additional}`} /> 
            <Input fieldName={order.totalPrice.totalPrice.fieldName} value={`${order.totalPrice.totalPrice.value}${order.totalPrice.totalPrice.additional}`} labelClass='font-weight-bold' inputClass='hasRequired' /> 
            
        </>
        
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
               <div className='text-center font-weight-bold border'>Order Details</div>                
                <div className='row p-0 m-3 '>
                    {this.renderTable()}
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
                            <Link to={{ pathname:'/', state:this.props.location.state }}>
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