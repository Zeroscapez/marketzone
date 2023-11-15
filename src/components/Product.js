import React, { Component } from 'react';
import axios from 'axios';
import "../css/websitecolors.css"



class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  addToCart(product) {
    axios
      .post('https://marketzone-api.vercel.app/marketzone/api/addToCart', { product }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('Product added to cart:', response.data);
        // Call the parent component's callback function for showing notifications
        this.props.onAddToCartNotification(product.name);
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  }

  render() {
    const { image, name, description, price, username, quantity } = this.props.product;
    return (
      <div className="product-container">
        <div className="product-image">
        <img src={`${image}`} alt="img-missing" />
          
        </div>
        <div className="product-description">
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Posted by {username}</p>
          <p>
            <strong>Price: ${price}</strong>
          </p>
          <p>
            <strong>Quantity: {quantity}</strong>
          </p>
          <button className="cartaddbutton" onClick={() => this.addToCart(this.props.product)}>Add to Cart</button>
        </div>
      </div>
    );
  }
}

export default Product;
