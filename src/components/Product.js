import React from 'react';
import '../websitecolors.css'; // Import your CSS stylesheet
import prod1 from '../img/products/prod1.jpg';



class Product extends React.Component {
    render() {
        return (
            <div className="product-container">
                <div className="product-image">
                    <img src={prod1} alt="Product1" />
                </div>
                <div className="product-description">
                    <h3>Test Product</h3>
                    <p>This is a test product, made for testing.</p>
                    <p><strong>Price: $19.99</strong></p>
                    <button>Add to Cart</button>
                </div>
            </div>
        );
    }
}

export default Product;
