import React from 'react';
import '../websitecolors.css'; // Import your CSS stylesheet
import prod1 from '../img/products/prod1.jpg';



class Product extends React.Component {
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
            <button>Add to Cart</button>
          </div>
        </div>
      );
    }
  }
  

export default Product;
