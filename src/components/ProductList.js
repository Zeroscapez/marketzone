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
    // Fetch products from the backend
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
          <Product key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductList;
