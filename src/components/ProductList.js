import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.fetchProducts(); // Fetch products initially

    // Set up an interval to fetch products every 5 minutes (adjust the interval as needed)
    this.interval = setInterval(() => {
      this.fetchProducts();
    }, 900000); // 5 minutes in milliseconds
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted to prevent memory leaks
    clearInterval(this.interval);
  }

  fetchProducts() {
    axios.get('http://localhost:3001/marketzone/api/products')
      .then((response) => {
        this.setState({ products: response.data.data });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCartNotification={this.props.onAddToCartNotification}
          />
        ))}
      </div>
    );
  }
}

export default ProductList;
