import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Form.css';
import validations from '../Reusable/Validations';
import Button from '../Reusable/Button/Button';
const requiredError = 'This field is mandatory';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data : {
// Inputs Fields                 
                purchaseCountry : {
                    fieldName : 'Purchase Country',
                    value : '',
                    validation: validations.lettersSpace,
                    isError : false,
                    errorMsg : 'Purchase Country should contain only letters and spaces ',
                    isRequired : true,
                    isDisabled : false,
                },
                passportNumber : {
                    fieldName : 'Passport Country',
                    value : '',
                    validation : '' ,
                    // validation : /^[B]\d{3}/ ,
                    isError : false,
                    errorMsg : 'error',
                    isRequired : false,
                    isDisabled : false
                },
                mask : {
                    fieldName : 'No. of Mask',
                    value : '',
                    validation : validations.numbers,
                    isError : false,
                    errorMsg : 'Please Enter a Valid No. of Mask or Zero',
                    isRequired : true,
                    isDisabled : false
                },
                gloves : {
                    fieldName : 'No. of Gloves',
                    value : '',
                    validation : validations.numbers,
                    isError : false,
                    errorMsg : 'Please Enter a Valid No. of Gloves or Zero',
                    isRequired : true,
                    isDisabled : false
                },
            },

              redirectToCheckout :false,
              orderObj : ''
         }
    }

    validation = (e) => {

        let {name,value} = e.target
        let stateObj = {...this.state.data}
        let validation = stateObj[name].validation
        let isRequired = stateObj[name].isRequired
        let isError = false
        let RegEx = new RegExp(validation)

        if(isRequired){
            if(value === ''){
                 isError = true
            }else{
                if(validation !== ''){
                    if(!value.match(RegEx)){
                        isError = true
                    }
                }
            }
        }else{
            if(value !== '' & validation !== ''){
                if(!value.match(RegEx)){
                     isError = true
                }
            }
        }

        return stateObj[name].isError = isError
    }

    changeHandler = (e) => {
    
        let {name,value} = e.target
        let stateObj = {...this.state.data}
    
        this.validation(e)
    
        stateObj[name].value = value
    
        this.setState({...stateObj})
    
        }
    
    renderInputs = () => {
        let stateObj = {...this.state.data}

        return Object.entries(stateObj).map(
            ([key,val])=>{
                
                return(
                    <div className='col-12 col-md-6 mt-2 mb-3' key={key}>
                        <div className='row'>
                            <div className='col-12 col-md-4 d-flex align-items-end'>
                                <label >{val.fieldName}</label>
                            </div>
                            <div className='col-12 col-md-8'>
                                <div className="form-group mb-0">
                                   {
                                       key === 'purchaseCountry' || key === 'passportNumber' ?
                                       <select 
                                            className={`form-control ${val.isRequired?'hasRequired':''} ${val.isError?'hasError':''}`}
                                            name={key}   onChange={this.changeHandler} value={val.value} disabled={val.isDisabled}>
                                                <option value=''>select</option>
                                                <option value='UK'>UK</option>
                                                <option value='Germany'>Germany</option>
                                            </select>:
                                        <input 
                                            type='text' className={`form-control ${val.isRequired?'hasRequired':''} ${val.isError?'hasError':''}`}
                                            name={key}   onChange={this.changeHandler} value={val.value} disabled={val.isDisabled}/>
                                   }
                                    { val.isError &&
                                     <> 
                                       { 
                                        val.value==='' ? 
                                            <div className='text-danger small position-absolute'>{requiredError}</div> 
                                            :
                                            <div className='text-danger small position-absolute'>{val.errorMsg}</div>
                                        }
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>        
                )
            }
        )
    }

    calculations = (stateObj) => {
        
    const inventory = {...this.props.inventory}
    
    const order = {
        ukInventory : {
            maskQty : 0,
            maskPrice : 0,
            glovesQty : 0,
            glovesPrice : 0,
        },
        germanyInventory : {
            maskQty : 0,
            maskPrice : 0,
            glovesQty : 0,
            glovesPrice : 0,
        },
        shippingCharge:{
            mask : 0,
            gloves : 0
        },
        totalPrice:{
            totalPrice:0
        }
    }

    if((stateObj.mask.value <= (inventory.ukInventory.maskQty + inventory.germanyInventory.maskQty)) && 
        stateObj.gloves.value <= (inventory.ukInventory.glovesQty + inventory.germanyInventory.glovesQty)){

        if(stateObj.purchaseCountry.value === 'UK'){

            if(stateObj.mask.value <= inventory.ukInventory.maskQty && 
                stateObj.gloves.value <= inventory.ukInventory.glovesQty){
                // Mask Price 
                order.ukInventory.maskQty = stateObj.mask.value
                order.ukInventory.maskPrice = order.ukInventory.maskQty * inventory.ukInventory.maskPrice
                // Gloves Price
                order.ukInventory.glovesQty = stateObj.gloves.value
                order.ukInventory.glovesPrice = order.ukInventory.glovesQty * inventory.ukInventory.glovesPrice
                
            }
            if(stateObj.mask.value > inventory.ukInventory.maskQty && 
                stateObj.gloves.value <= inventory.ukInventory.glovesQty){
                // Mask Price
                order.ukInventory.maskQty = inventory.ukInventory.maskQty
                order.ukInventory.maskPrice = inventory.ukInventory.maskQty * inventory.ukInventory.maskPrice
                order.germanyInventory.maskQty = stateObj.mask.value - inventory.ukInventory.maskQty
                order.germanyInventory.maskPrice = order.germanyInventory.maskQty * inventory.ukInventory.maskPrice
                // Gloves Price
                order.ukInventory.glovesQty = stateObj.gloves.value
                order.ukInventory.glovesPrice = order.ukInventory.glovesQty * inventory.ukInventory.glovesPrice 
                // Shipping Charges
                if(stateObj.passportNumber.value === 'Germany'){
                    order.shippingCharge.mask = ((((Math.ceil(order.germanyInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)-((((Math.ceil(order.germanyInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge) * 0.2))
                }else{
                    order.shippingCharge.mask = (((Math.ceil(order.germanyInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)
                }
            
                console.log('mask > 100 & gloves <=100')

            }
            if(stateObj.mask.value <= inventory.ukInventory.maskQty &&
                 stateObj.gloves.value > inventory.ukInventory.glovesQty){
                    // Mask Price
                    order.ukInventory.maskQty = stateObj.mask.value
                    order.ukInventory.maskPrice = order.ukInventory.maskQty * inventory.ukInventory.maskPrice
                    // Gloves Price
                    order.ukInventory.glovesQty = inventory.ukInventory.glovesQty
                    order.ukInventory.glovesPrice = order.ukInventory.glovesQty * inventory.ukInventory.glovesPrice 
                    order.germanyInventory.glovesQty = stateObj.gloves.value - inventory.ukInventory.glovesQty
                    order.germanyInventory.glovesPrice = order.germanyInventory.glovesQty * inventory.ukInventory.glovesPrice
                    // Shipping Charges
                    if(stateObj.passportNumber.value === 'Germany'){
                       order.shippingCharge.gloves = ((((Math.ceil(order.germanyInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)-((((Math.ceil(order.germanyInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)*0.2))
                    }else{
                        order.shippingCharge.gloves = (((Math.ceil(order.germanyInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)
                    }
                    console.log('mask <= 100 & gloves > 100')
            }
            if(stateObj.mask.value > inventory.ukInventory.maskQty && 
                stateObj.gloves.value > inventory.ukInventory.glovesQty){
                    // Mask Price
                    order.ukInventory.maskQty = inventory.ukInventory.maskQty
                    order.ukInventory.maskPrice = inventory.ukInventory.maskQty * inventory.ukInventory.maskPrice
                    order.germanyInventory.maskQty = stateObj.mask.value - inventory.ukInventory.maskQty
                    order.germanyInventory.maskPrice = order.germanyInventory.maskQty * inventory.ukInventory.maskPrice
                    // Gloves Price
                    order.ukInventory.glovesQty = inventory.ukInventory.glovesQty
                    order.ukInventory.glovesPrice = order.ukInventory.glovesQty * inventory.ukInventory.glovesPrice 
                    order.germanyInventory.glovesQty = stateObj.gloves.value - inventory.ukInventory.glovesQty
                    order.germanyInventory.glovesPrice = order.germanyInventory.glovesQty * inventory.ukInventory.glovesPrice    
                    // Shipping Charges
                    if(stateObj.passportNumber.value === 'Germany'){
                        order.shippingCharge.mask = ((((Math.ceil(order.germanyInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)-((((Math.ceil(order.germanyInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge) * 0.2))
                        order.shippingCharge.gloves = ((((Math.ceil(order.germanyInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)-((((Math.ceil(order.germanyInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)*0.2))
                    }else{
                        order.shippingCharge.mask = (((Math.ceil(order.germanyInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)
                        order.shippingCharge.gloves = (((Math.ceil(order.germanyInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)
                    }
               
                    console.log('mask > 100 & gloves > 100')
            }
        }

        if(stateObj.purchaseCountry.value === 'Germany'){

            if(stateObj.mask.value <= inventory.germanyInventory.maskQty && 
                stateObj.gloves.value <= inventory.germanyInventory.glovesQty){
                // Mask Price
                order.germanyInventory.maskQty = stateObj.mask.value
                order.germanyInventory.maskPrice = order.germanyInventory.maskQty * inventory.germanyInventory.maskPrice
                // Gloves Price
                order.germanyInventory.glovesQty = stateObj.gloves.value
                order.germanyInventory.glovesPrice = order.germanyInventory.glovesQty * inventory.germanyInventory.glovesPrice
                
            }
            if(stateObj.mask.value > inventory.germanyInventory.maskQty && 
                stateObj.gloves.value <= inventory.germanyInventory.glovesQty){
                // Mask Price
                order.germanyInventory.maskQty = inventory.germanyInventory.maskQty
                order.germanyInventory.maskPrice = inventory.germanyInventory.maskQty * inventory.germanyInventory.maskPrice
                order.ukInventory.maskQty = stateObj.mask.value - inventory.germanyInventory.maskQty
                order.ukInventory.maskPrice = order.ukInventory.maskQty * inventory.germanyInventory.maskPrice
                // Gloves Price
                order.germanyInventory.glovesQty = stateObj.gloves.value
                order.germanyInventory.glovesPrice = order.germanyInventory.glovesQty * inventory.germanyInventory.glovesPrice 
                // Shipping Charges
                if(stateObj.passportNumber.value === 'UK'){
                    order.shippingCharge.mask = ((((Math.ceil(order.ukInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)-((((Math.ceil(order.ukInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)*0.2))
                }else{
                    order.shippingCharge.mask = (((Math.ceil(order.ukInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)
                }
                console.log('mask > 100 & gloves <=100')
            }
            if(stateObj.mask.value <= inventory.germanyInventory.maskQty &&
                 stateObj.gloves.value > inventory.germanyInventory.glovesQty){
                    // Mask Price
                    order.germanyInventory.maskQty = stateObj.mask.value
                    order.germanyInventory.maskPrice = order.germanyInventory.maskQty * inventory.germanyInventory.maskPrice
                    // Gloves Price
                    order.germanyInventory.glovesQty = inventory.germanyInventory.glovesQty
                    order.germanyInventory.glovesPrice = order.germanyInventory.glovesQty * inventory.germanyInventory.glovesPrice 
                    order.ukInventory.glovesQty = stateObj.gloves.value - inventory.germanyInventory.glovesQty
                    order.ukInventory.glovesPrice = order.ukInventory.glovesQty * inventory.germanyInventory.glovesPrice
                    // Shipping Charges
                    if(stateObj.passportNumber.value === 'UK'){
                        order.shippingCharge.gloves = ((((Math.ceil(order.ukInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)-((((Math.ceil(order.ukInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)*0.2))
                    }else{
                        order.shippingCharge.gloves = (((Math.ceil(order.ukInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)
                    }
                    console.log('mask <= 100 & gloves > 100')
            }
            if(stateObj.mask.value > inventory.germanyInventory.maskQty && 
                stateObj.gloves.value > inventory.germanyInventory.glovesQty){
                    // Mask Price
                    order.germanyInventory.maskQty = inventory.germanyInventory.maskQty
                    order.germanyInventory.maskPrice = inventory.germanyInventory.maskQty * inventory.germanyInventory.maskPrice
                    order.ukInventory.maskQty = stateObj.mask.value - inventory.germanyInventory.maskQty
                    order.ukInventory.maskPrice = order.ukInventory.maskQty * inventory.germanyInventory.maskPrice
                    // Gloves Price
                    order.germanyInventory.glovesQty = inventory.germanyInventory.glovesQty
                    order.germanyInventory.glovesPrice = order.germanyInventory.glovesQty * inventory.germanyInventory.glovesPrice 
                    order.ukInventory.glovesQty = stateObj.gloves.value - inventory.germanyInventory.glovesQty
                    order.ukInventory.glovesPrice = order.ukInventory.glovesQty * inventory.germanyInventory.glovesPrice    
                    // Shipping Charges
                    if(stateObj.passportNumber.value === 'UK'){
                        order.shippingCharge.mask = ((((Math.ceil(order.ukInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)-((((Math.ceil(order.ukInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)*0.2))
                        order.shippingCharge.gloves = ((((Math.ceil(order.ukInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)-((((Math.ceil(order.ukInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)*0.2))
                    }else{
                        order.shippingCharge.mask = (((Math.ceil(order.ukInventory.maskQty / 10) * 10 )/10) * inventory.shippingCharge)
                        order.shippingCharge.gloves = (((Math.ceil(order.ukInventory.glovesQty / 10) * 10 )/10) * inventory.shippingCharge)
                    }
                    console.log('mask > 100 & gloves > 100')
            }
        }
        // Total Order Price
        order.totalPrice.totalPrice = (order.ukInventory.maskPrice + 
                            order.ukInventory.glovesPrice + 
                            order.germanyInventory.maskPrice + 
                            order.germanyInventory.glovesPrice + 
                            order.shippingCharge.gloves + order.shippingCharge.mask) 

        stateObj.redirectToCheckout = true
        stateObj.orderObj = order
    }else{        
        alert(`Total ${(inventory.ukInventory.maskQty + inventory.germanyInventory.maskQty)} Mask available in inventory 
Total ${(inventory.ukInventory.glovesQty + inventory.germanyInventory.glovesQty)} Gloves available in inventory`)
    }
    }

    submitHandler = (e) => {
        let stateObj = {...this.state.data}
        let isSubmit = true
        
        Object.values(stateObj).map(e  => {
           
            if((e.value === '' && e.isRequired) || e.isError){
                e.isError = true
                isSubmit = false
        }
        return this.setState({...stateObj})
        })
        if(!isSubmit){
            this.setState({...stateObj})
            return false    
        }
  
        this.calculations(stateObj)
        this.setState({...stateObj})
    }

    checkInventory = () => {
        const inventory = {...this.props.inventory}
        let stock = `
        - "${inventory.ukInventory.maskQty}" No. of Mask Available in U.K Inventory
        - ${inventory.ukInventory.maskPrice } £ Per Unit Price of Mask in U.K Inventory
        - "${ inventory.ukInventory.glovesQty }" No. Gloves available U.K Inventory
        - ${ inventory.ukInventory.glovesPrice } £ Per Unit Price of Gloves U.K Inventory
        - "${ inventory.germanyInventory.maskQty }" No. Mask available in Germany Inventory 
        - ${ inventory.germanyInventory.maskPrice } £ Per Unit Price Mask in Germany Inventory 
        - "${ inventory.germanyInventory.glovesQty }" No. Gloves available in Germany Inventory 
        - ${ inventory.germanyInventory.glovesPrice } £ Per Unit Price Gloves in Germany Inventory
        ` 

        alert(stock)
    }

     

    render() { 
        return (
            <> 
                <div className='row p-0 m-3 '>
                    {this.renderInputs()}                        
                </div>
                <div className='row p-0 m-3 '>
                   <div className='col-12 col-md-6 mt-1'>
                        <Button name='Checkout' onClick={this.submitHandler}/>                                                
                    </div>
                   <div className='col-12 col-md-6 mt-1'>
                        <Button name='Check Inventory' onClick={this.checkInventory}/>                                                
                    </div>
                </div>
                {this.state.redirectToCheckout && <Redirect to={{ pathname : "/checkout",state : this.state.orderObj}}/>}                        
            </>
         );
    }
}
 
export default Form;