import React, { Component } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../websitecolors.css'; // Import your CSS stylesheet
import prod1 from '../img/products/prod1.jpg';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  addToCart(product) {
    // Send an HTTP POST request to add the product to the user's cart
    axios
      .post('http://localhost:3001/marketzone/api/addToCart', { product }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the user's JWT token for authentication
        },
      })
      .then((response) => {
        // Handle the success response, you may want to update your UI to indicate the item was added.
        console.log('Product added to cart:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user.
        console.error('Error adding product to cart:', error);
      });
  }

  render() {
    const { image, name, description, price, username } = this.props.product;
    return (
      <div className="product-container">
        <div className="product-image">
          <img src={image} alt="img-missing" />
        </div>
        <div className="product-description">
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Posted by {username}</p>
          <p>
            <strong>Price: ${price}</strong>
          </p>
          <button onClick={() => this.addToCart(this.props.product)}>Add to Cart</button>
        </div>
      </div>
    );
  }
}

export default Product;
