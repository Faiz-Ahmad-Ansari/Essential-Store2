import React, { Component } from 'react';
import Header from '../Common/Header/Header';
import Products from '../Products/Products';
import Form from '../Form/Form';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products : [
                {
                    name : 'Mask',
                    description : 'A mask is an object normally worn on the face, typically for protection. ',                
                },
                {
                    name : 'Gloves',
                    description : 'A glove is a garment covering the whole hand, typically for protection.',                    
                },
            ],
            // Inventory
            inventory : {
                ukInventory : {
                    maskQty : 100,
                    maskPrice : 65,
                    glovesQty : 100,
                    glovesPrice : 100,
                },
                germanyInventory : {
                    maskQty : 100,
                    maskPrice : 100,
                    glovesQty : 50,
                    glovesPrice : 150,
                },
                shippingCharge : 400
            },

         }
    }

    componentDidMount(){
        if(this.props.location.state === undefined){
            return false
        }
        let stateObj = {...this.state}
        let prevOrder = this.props.location.state
        let inventory = stateObj.inventory

        inventory.ukInventory.maskQty =  prevOrder.ukInventory.maskQty 
        inventory.ukInventory.glovesQty =  prevOrder.ukInventory.glovesQty 
        inventory.germanyInventory.maskQty =  prevOrder.germanyInventory.maskQty 
        inventory.germanyInventory.glovesQty =  prevOrder.germanyInventory.glovesQty 
    
        this.setState({...stateObj})
    }

    render() { 
        return ( 
            <>
                <Header />
                <div className='row justify-content-center m-2'>
                    { this.state.products.map((e,i) => <Products key={i} data={this.state.products[i]} />) }
                </div>
                <Form inventory={this.state.inventory}/>
            </>
         );
    }
}
 
export default Homepage;