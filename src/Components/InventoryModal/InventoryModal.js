import React from 'react';
import Button from'../Reusable/Button/Button';

const InventoryModal = props => {
    const inventory = props.inventory
    return ( 
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="inventoryModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Inventory</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                    <table className="table">
                        <thead>
                            <tr className='bg-success text-white'>
                                <th scope="col"></th>
                                <th scope="col">U.K</th>                                                                
                                <th scope="col"></th>                                                                
                            </tr>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Qty.</th>
                                <th scope="col">Unit Price</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Mask</th>
                                <td>{inventory.ukInventory.maskQty}</td>
                                <td>{inventory.ukInventory.maskPrice} £</td>
                                
                            </tr>
                            <tr>
                                <th scope="row">Gloves</th>
                                <td>{inventory.ukInventory.glovesQty}</td>
                                <td>{inventory.ukInventory.glovesPrice} £</td>
                                
                            </tr>
                
                        </tbody>
                    </table>
                    <table className="table">
                        <thead>
                            <tr className='bg-success text-white'>
                                <th scope="col"></th>
                                <th scope="col">Germany</th>                                                                
                                <th scope="col"></th>                                                                
                            </tr>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Qty.</th>
                                <th scope="col">Unit Price</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Mask</th>
                                <td>{inventory.germanyInventory.maskQty}</td>
                                <td>{inventory.germanyInventory.maskPrice} £</td>
                                
                            </tr>
                            <tr>
                                <th scope="row">Gloves</th>
                                <td>{inventory.germanyInventory.glovesQty}</td>
                                <td>{inventory.germanyInventory.glovesPrice} £</td>
                                
                            </tr>
                
                        </tbody>
                    </table>
                    
                  </div>
                  <div className="modal-footer">
                      <Button name='Ok' dataDismiss='modal' />
                      {/* <button type="button" className="btn btn-primary w-100" data-dismiss="modal">Ok</button> */}
                  </div>
                  </div>
              </div>
          </div>
        </>
     );
}
 
export default InventoryModal;