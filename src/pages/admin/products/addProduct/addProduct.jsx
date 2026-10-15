import { useDispatch, useSelector } from "../../../../context/AppContext.jsx";
//AddProducts.jsx 
import React, { useState } from 'react'
import { addProduct } from '../../../../features/products/productsSlice.js'
import { PRODUCT_CATEGORIES } from '../../../../data/defaultProducts.js'
import './addProduct.css'

const AddProducts = () => {
    const dispatch = useDispatch();
    const getProducts = useSelector((state) => state.products.items);

    const [productName,setProductName] = useState('');
    const [productImage,setProductImage] = useState('');
    const [productDescription,setProductDescription] = useState('');
    const [productPrice,setProductPrice] = useState('');
    const [productCategory,setProductCategory] = useState(PRODUCT_CATEGORIES[0]);

    //addProductsHandler 
    const addProductsHandler = (e)=>{
        e?.preventDefault?.();

        if (!productName.trim() || !productPrice.trim()) {
            alert('Product name and price are required');
            return;
        }
        if (productName.trim().length < 2) { alert('Product name must be at least 2 characters'); return; }
        if (isNaN(Number(productPrice)) || Number(productPrice) <= 0) { alert('Product price must be a positive number'); return; }

        let obj = {
            productId : Date.now().toString(),
            productName,
            productImage,
            productDescription,
            productPrice,
            quantity : 1,
            category: productCategory
        }

        dispatch(addProduct(obj));

        // clear states 
        setProductName('');
        setProductImage('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory(PRODUCT_CATEGORIES[0]);
        alert('Product added successfully');
    }

    return (
   <div className="add-product-page">
    <h1>Add Products Page</h1>
    <div> 
        <label>
            ProductName : 
            <input
            type='text'
            placeholder='Enter product name' 
            value={productName}
            autoComplete='new-productName'
            onChange={(e)=>setProductName(e.target.value)}/>
        </label><br/>

         <label>
            Product Image : 
            <input
            type='text'
            placeholder='upload Image' 
            value={productImage}
            autoComplete='new-productImage'
            onChange={(e)=>setProductImage(e.target.value)}/>
        </label><br/>

         <label>
            Product Description : 
            <input
            type='text'
            placeholder='Enter product description' 
            value={productDescription}
            autoComplete='new-productDescription'
            onChange={(e)=>setProductDescription(e.target.value)}/>
        </label><br/>

         <label>
            Product Price : 
            <input
            type='text'
            placeholder='Enter product price' 
            value={productPrice}
            autoComplete='new-productPrice'
            onChange={(e)=>setProductPrice(e.target.value)}/>
        </label><br/>

        <label>
             Product Category :
             <select
             value={productCategory}
             onChange={(e)=>setProductCategory(e.target.value)}
             >
             {PRODUCT_CATEGORIES.map((c) => (
                 <option key={c} value={c}>{c}</option>
             ))}
             </select>
         </label><br/>

         {productImage && (
          <img
            src={productImage}
            alt="preview"
            style={{ height: 100, objectFit: "contain", display: "block", margin: "8px 0" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}

        <button onClick={addProductsHandler}>Add product</button>
    </div>

    <hr />
    <h3>Existing Products ({getProducts.length})</h3>
    <ul>
        {getProducts.map((p) => (
            <li key={p.productId}>{p.productName} — {p.productPrice}</li>
        ))}
    </ul>
   </div>
    )
}

export default AddProducts
