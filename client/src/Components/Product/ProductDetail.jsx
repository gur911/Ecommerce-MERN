import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

function ProductDetail() {
  const [product, setProduct] = useState()
  const {id} = useParams()
  const url = "http://localhost:1000/api";
  const data = 10;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        // console.log(api.data.produuct);
        setProduct(api.data.product);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <>
    <div className="container text-center my-5" style={{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center'
    }}>
        <div className="left ">
            <img src={product?.imgSrc} alt="" style={{width:"250px", height:"250px",borderRadius:"10px",border:"2px solid yellow"}} />
        </div>
        <div className="right">
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <h1>{product?.price} {"₹"}</h1>
            {/* <h3>{product?.category}</h3> */}
            <div className='my-4' >
                <button className='btn btn-danger mx-3' style={{fontWeight:'bold'}}>Buy Now</button>
                <button className='btn btn-warning' style={{fontWeight:'bold'}}>Add to Cart</button>
            </div>
        </div>
    </div>
    <RelatedProduct category={product?.category}/>
    </>
  )
}

export default ProductDetail
