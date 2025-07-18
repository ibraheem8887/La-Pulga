import React from 'react';
import Login from "../Components/adminComponents/LoginForm";
import ProductInfo from "../Components/productsComponents/DisplayProductInfo";
import Header from "../Components/shared/Header";
import Footer from '../Components/shared/Footer';
const DisplayInfo = () => {
    return (
        <div>
           <Header></Header>
           <ProductInfo ></ProductInfo>
           <Footer></Footer>
        </div>
    );
}

export default DisplayInfo;
