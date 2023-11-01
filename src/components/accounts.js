import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../websitecolors.css'; // Import your CSS stylesheet
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
      const productData = {
        image: productImage,
        name: productName,
        description: productDescription,
        price: productPrice,
      };
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
    <div>
      <h1>Account Details</h1>
      <div>
        <p>Full Name: {user.first_name} {user.last_name}</p>
        <p>Username: {user.username}</p>
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      
      <h2>List a Product</h2>
      <div className="product-form">
        <input
          type="text"
          placeholder="Image URL"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
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
    </div>
  );
}

export default Accounts;