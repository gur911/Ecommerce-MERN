import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/AppContext';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category }) => { // Correct way to receive props
  const { products } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (products && category) { // Ensure products and category are defined
      setRelatedProduct(products.filter((data) => data?.category?.toLowerCase() === category?.toLowerCase()));
    }
  }, [category, products]); // Add products to the dependency array

  return (
    <div className="container text-center">
      <h1>Related Products</h1>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {relatedProduct.map((product) => (
            <div key={product._id} className="my-3 col-md-4 d-flex justify-content-center align-items-center">
              <div className="card bg-dark text-light text-center" style={{ width: "18rem" }}>
                <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{ width: "200px", height: "200px", borderRadius: "10px", border: '2px solid yellow' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <div className="my-3">
                    <button className="btn btn-primary mx-3">
                      {product.price} ₹
                    </button>
                    <button className="btn btn-warning">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
