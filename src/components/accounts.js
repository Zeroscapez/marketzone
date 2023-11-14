import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetails from './OrderDetails'; // Import the new component
import  '../css/account.css'

function Accounts() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageFile, setProductImageFile] = useState(null);


  useEffect(() => {
    // Function to check if the user is authenticated
    const checkAuthentication = () => {
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (token) {
        // Fetch user account details from the backend
        axios.get('http://localhost:3001/marketzone/api/accountDetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            const userData = response.data.data;
            setUser(userData);
          })
          .catch((error) => {
            console.error('Error fetching user account details:', error);
          });
      }
    };

    checkAuthentication(); // Call the checkAuthentication function when the component loads
  }, []); // Empty dependency array means this effect runs once on component load

  const handleResetPassword = () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      // Implement password reset logic
      axios.post('http://localhost:3001/marketzone/api/resetPassword', { newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          if (response.data.success) {
            alert('Password reset successful');
          } else {
            alert('Password reset failed');
          }
        })
        .catch((error) => {
          console.error('Error resetting password:', error);
        });
    }
  };

  const handleProductSubmit = () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      // Implement product listing logic
      const productData = new FormData();
  productData.append('image', productImageFile);
  productData.append('name', productName);
  productData.append('description', productDescription);
  productData.append('price', productPrice);
      axios.post('http://localhost:3001/marketzone/api/listProducts', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.data.success) {
            alert('Product listed successfully');
          } else {
            alert('Product listing failed');
          }
        })
        .catch((error) => {
          console.error('Error listing product:', error);
        });
    }
  };

  return (
    <div className='info-container'>
      <h1>Account Details</h1>
      <div>
        <p>Full Name: {user.first_name} {user.last_name}</p>
        <p>Username: {user.username}</p>
      </div>
      
      <h2>List a Product</h2>
      <div className='product-form'>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProductImageFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button onClick={handleProductSubmit}>List Product</button>
      </div>

      {/* New component to display order details */}
      <OrderDetails />
    </div>
  );
}

export default Accounts;
