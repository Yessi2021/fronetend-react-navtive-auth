import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import "../App.css";
import TotalPrice from "./TotalPrice";

export default function App() {
  const items = useSelector((state) => state.allCart.items);
  const { totalQuantity, totalPrice } = useSelector((state) => state.allCart);

  const dispatch = useDispatch();

 

  return (
    <div className="content_product">
       
        <div className="container-product">
          <div className="grid-container" >
          {
            items.map( item => (
              <div className="grid-item" key={item.id} 
              onClick={ ()=> dispatch(addToCart(item)) }
              >
              <div className="card_product">
                <img src={item.img} alt={item.title} />
                <div className="card-content">
                  <h2>{item.title}</h2>
                  <p>{item.price}</p>
                </div>
              </div>

              </div>
            ))
          }
          </div>
          {/*  */}

       {
          totalQuantity === 0 
          ? ( <div className="choose" > Choose your product </div> )
          : ( < TotalPrice/>)
       }

        </div>
    </div>
  );
}
