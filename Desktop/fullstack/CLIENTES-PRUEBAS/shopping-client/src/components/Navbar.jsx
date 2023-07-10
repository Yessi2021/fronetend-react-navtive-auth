import React, { useEffect } from "react";


import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";

import { getCartTotal } from "../features/cartSlice";

export default function App() {
  const { cart, totalQuantity } = useSelector((state) => state.allCart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <nav className="navbar_menu" >
      <div className="logo">
      <img src="https://thumbs.dreamstime.com/b/el-mejor-dise%C3%B1o-del-logotipo-de-tienda-icono-la-135610452.jpg" width={90} height={90} alt="" />
      </div>
      <div className="details">
      <span>
    <Link to="/" className="all_product" >All Product </Link>
  </span>
      </div>
      <div className="cart-icon">
      <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true">
    </i><span className="quantity" >({totalQuantity})</span>
  </Link>
      </div>
    </nav>
  );
}
