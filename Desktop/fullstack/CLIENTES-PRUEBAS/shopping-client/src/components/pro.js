<MDBNavbar light bgColor="light">
<MDBContainer fluid>
  <MDBNavbarBrand>
    <img src="https://thumbs.dreamstime.com/b/el-mejor-dise%C3%B1o-del-logotipo-de-tienda-icono-la-135610452.jpg" width={90} height={90} alt="" />
  </MDBNavbarBrand>
  <span>
    <Link to="/">All Product </Link>
  </span>
  <MDBBtn color="light">
    <Link to="/cart"><i class="fa fa-shopping-cart" aria-hidden="true">
    </i>({totalQuantity})
  </Link>
  </MDBBtn>
</MDBContainer>
</MDBNavbar>