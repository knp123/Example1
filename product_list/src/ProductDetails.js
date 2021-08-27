import React, { useState } from "react";
import { Label } from '@fluentui/react/lib/Label';
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
                    <Label>ProductName: {selectedProduct.description}</Label>
                    <Label>ProductHeight: {selectedProduct.height}</Label>
                    <Label>ProductWidth: {selectedProduct.width}</Label>
                    <Label>ProductPrice: {selectedProduct.price}</Label>
                    <input type='button' onClick={() => setOnEdit(true)} value='EDIT'/>
                </div>
            )
        }
        else {
            return (
                <div className = 'formdiv'>
                <form onSubmit={handleSubmit} >
                    <Label>ProductName:  <input type='text' name='height' value={selectedProduct.description} disabled /> </Label>
                    <Label>Product Height:
                        <input type='text' name='height' value={selectedProduct.height} onChange={handleOnChange} /> </Label>
                    <Label>Product Width:
                        <input type='text' name='width' value={selectedProduct.width} onChange={handleOnChange} /> </Label> 
                    <Label> Product Price:
                        <input type='text' name='price' value={selectedProduct.price} onChange={handleOnChange} /> </Label>
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