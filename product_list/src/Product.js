import React, {useEffect, useState} from 'react';
import {ProductDetails} from './ProductDetails';
import {getProductList} from './ProductService';
export function Product() {
    const [productList, setproductList] = useState([]);
    const [style,] = useState({
        productList:{
        },
        productItem:{
            background: '#cce5ff',
            margin: '5px'
        },
      });
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
         getProductList().then(data => {
             setproductList(data);
         }) 
    }, [])

    const handleClick = (index) => {
       setSelectedProduct(productList[index]);
    }

    const updateProductDetails = (updatedDetails, item) => {
      Object.keys(item).forEach(key => {
        if(updatedDetails[key]){
          item[key] = updatedDetails[key]
        }
      });
      const productListCopy = [...productList];
      const productChangedIndex = productListCopy.findIndex(product => product.description === item.description);
      productListCopy[productChangedIndex] = item;
      setproductList(productListCopy);
    };

    return (
        <>
        <h1>Product List and select each product to find its details and edit</h1>
        <div style = {{display: 'flex'}}>
          <ProductList
            ResultList={productList}
            listStyle={style.productList}
            listItemStyle={style.productItem}
            onClick={handleClick}
          />
          <ProductDetails selectedProduct = {selectedProduct} updateProductDetails = {updateProductDetails} setSelectedProductDetails = {(item) => setSelectedProduct(item)}/>
        </div>
        </>
    )
}

const ProductList = ({ResultList, listStyle, listItemStyle, onClick}) => (
    <div style = {{border: '1px solid', borderRadius: '2px', width: '30%'}}>
    <ul style={listStyle}>
    {
      ResultList.map((item,idx) =>
        <ProductItem
          key={idx}
          style={listItemStyle}
          text={item.description}
          onClick={() => onClick(idx)}
          />
      )
    }
    </ul>
    </div>
  );
  
  
  // productItem Component
  const ProductItem = ({ onClick, text, style}) => (
    <li
      style={style}
      onClick={onClick}
      >
      {text}
    </li>
  );