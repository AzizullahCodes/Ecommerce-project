import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '../../../../store/slices/products/productsSlice.js';
import { showError, showSuccess } from '../../../../utils/sweetAlert.js';
import { PRODUCT_CATEGORIES } from '../../../../data/defaultProducts.js';
import './editProduct.css';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => String(p.productId ?? p.id) === String(productId));

  const [productName, setProductName] = useState(product?.productName || '');
  const [productImage, setProductImage] = useState(product?.productImage || '');
  const [productDescription, setProductDescription] = useState(product?.productDescription || '');
  const [productPrice, setProductPrice] = useState(product?.productPrice || '');
  const [productCategory, setProductCategory] = useState(product?.category || PRODUCT_CATEGORIES[0]);

  useEffect(() => {
    if (product) {
      setProductName(product.productName || '');
      setProductImage(product.productImage || '');
      setProductDescription(product.productDescription || '');
      setProductPrice(product.productPrice || '');
      setProductCategory(product.category || PRODUCT_CATEGORIES[0]);
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e?.preventDefault?.();
    if (!product) {
      await showError('Not found', 'Product not found');
      return;
    }
    if (!productName.trim() || !productPrice.trim()) {
      await showError('Missing details', 'Product name and price are required');
      return;
    }
    if (productName.trim().length < 2) {
      await showError('Invalid name', 'Product name must be at least 2 characters');
      return;
    }
    if (isNaN(Number(productPrice)) || Number(productPrice) <= 0) {
      await showError('Invalid price', 'Product price must be a positive number');
      return;
    }
    dispatch(updateProduct({
      productId: product.productId ?? product.id,
      productName,
      productImage,
      productDescription,
      productPrice,
      category: productCategory,
    }));
    await showSuccess('Product updated', `${productName} has been updated`);
    navigate('/adminDashboard/products');
  };

  if (!product) {
    return (
      <div>
        <h1>Edit Product</h1>
        <p>Product not found.</p>
        <button onClick={() => navigate('/adminDashboard/products')}>Back</button>
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <h1>Edit Product</h1>
      <div>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </label><br/>
        <label>
          Product Image:
          <input type="text" value={productImage} onChange={(e) => setProductImage(e.target.value)} />
        </label><br/>
        <label>
          Product Description:
          <input type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        </label><br/>
        <label>
          Product Price:
          <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </label><br/>
        <label>
           Product Category:
           <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
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

        <button onClick={handleUpdate}>Update Product</button>
        <button onClick={() => navigate('/adminDashboard/products')}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProduct;
