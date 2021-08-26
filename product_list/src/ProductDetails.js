import React, { useState } from "react";
import './ProductDetails.css';
export function ProductDetails(props) {
    const { selectedProduct , updateProductDetails, setSelectedProductDetails} = props;
    const [onEdit, setOnEdit] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState(null);
    const handleOnChange = (event) => {
       const target = event.target;
       const property = target.name;
       setUpdatedDetails({...updatedDetails, [property]: target.value});
       setSelectedProductDetails({...selectedProduct, [property]: target.value});
    };

    const handleSubmit = (event) => {
        event?.preventDefault();
        if(updatedDetails){
          updateProductDetails(updatedDetails, selectedProduct);
        }
        setOnEdit(false);
    };
    if (selectedProduct) {
        if (!onEdit) {
            return (
                <div style = {{display: 'flex', flexDirection: 'column', width: '70%'}}>
                    <label>ProductName: {selectedProduct.description}</label>
                    <label>ProductHeight: {selectedProduct.height}</label>
                    <label>ProductWidth: {selectedProduct.width}</label>
                    <label>ProductPrice: {selectedProduct.price}</label>
                    <input type='button' onClick={() => setOnEdit(true)} value='EDIT'/>
                </div>
            )
        }
        else {
            return (
                <div className = 'formdiv'>
                <form onSubmit={handleSubmit} >
                    <label>ProductName:  <input type='text' name='height' value={selectedProduct.description} disabled /> </label>
                    <label>Height:
                        <input type='text' name='height' value={selectedProduct.height} onChange={handleOnChange} /> </label>
                    <label>Width:
                        <input type='text' name='width' value={selectedProduct.width} onChange={handleOnChange} /> </label> 
                    <label> Price:
                        <input type='text' name='price' value={selectedProduct.price} onChange={handleOnChange} /> </label>
                    <input type = 'submit' value = "Update" disabled = {!updatedDetails}/>
                </form>
                </div>
            );
        }
    }
    else {
        return '';
    }
}