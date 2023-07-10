import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  addToCart
} from "../features/cartSlice";



const TotalPrice = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );

console.log( cart );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);


  return (
    <div>
      <section className="m-2">
           <div className="title">
              <h2>Shoppig cart</h2>
           </div>
            <h2> { totalQuantity === 0 ? ( <h3>Choose your product</h3> ) : ("") } </h2>
            {cart?.map((data) => (
                <div className="show_product_container">
                    <div className="amount">{data.quantity}</div>
                    <div className="container_show_image">
                    <img src={data.img}
                    className="img_show"
                    alt={data.title}
                          />
                    </div>
                    <div className="container_bottons">
                      <button onClick={() =>
                              dispatch(decreaseItemQuantity(data.id))
                            } >
                              -
                          </button>
                            <button onClick={()=> dispatch(addToCart(data)) } >
                              +
                            </button>
                     </div>
                  
                    <button className="remove" onClick={() => dispatch(removeItem(data.id))} >Remove</button>

                    
                </div>
            
              
            ))
                }
      </section>
          {
            totalQuantity === 0 ? 
            ("")
            : ( <div className="price">
            <span>
               <strong> Total : {totalPrice}</strong>
              </span>
              <div className="pay">
                  <button>Paga con Wompi</button>
              </div>
            </div>)
          }
    </div>
  );
};

export default TotalPrice;


