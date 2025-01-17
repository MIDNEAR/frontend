import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Sections/Footer';
import Manager from './components/Manager/Manager';
import ManagerHeader from './components/Manager/Header';
import Header from './components/Sections/Header';
import PasswordEnter from './components/Mypage/UserInformation/PasswordEnter';
import PasswordConfirm from './components/Mypage/UserInformation/PasswordConfirm';
import InfoChange from './components/Mypage/UserInformation/infoChange';
import PasswordChange from './components/Mypage/UserInformation/PasswordChange';
import WritingReview from './components/Mypage/OrderList/WritingReview';
import OrderListBasic from './components/Mypage/OrderList/OrderListBasic';
import OrderDetail from './components/Mypage/OrderList/OrderDetail';
import Join from './components/User/Join';
import Login from './components/User/Login';
import FindID from './components/User/FindID';
import FindPW from './components/User/FindPW';
import ChangePW from './components/User/ChangePW';
import AllShop from './components/Shop/AllShop';
import ProdDetail from './components/Shop/ProdDetail';
import ReviewImage from './components/Shop/ReviewImage';
import GotoLogin from './components/Cart/GotoLogin';
import PaySucceed from './components/Cart/Pay/PaySucceed';
import PayFailed from './components/Cart/Pay/PayFailed';
import NoMemInfo from './components/Cart/Order/NoMemInfo';
import MemInfo from './components/Cart/Order/MemInfo';
import NewAddress from './components/Cart/Order/NewAddress';
import SelectAdd from './components/Cart/Order/SelectAdd';
import EditAdd from './components/Cart/Order/EditAdd';


function App() {
  const location = useLocation();
  const isManagerRoute = location.pathname.startsWith('/manager');
  
  return (
    <>
      {isManagerRoute ? <ManagerHeader /> : <Header />}

      <Routes>

        {/* 유저 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/mypage/userinformaiton/confirm" element={<PasswordConfirm />} />
        <Route path="/mypage/userinformaiton/userinfo/changing" element={<InfoChange />} />
        <Route path="/mypage/userinformaiton/password/change" element={<PasswordEnter />} />
        <Route path="/mypage/userinformaiton/password/changing" element={<PasswordChange />} />
        <Route path="/mypage/orderlist/writingReview" element={<WritingReview />} />
        <Route path="/mypage/orderlist/" element={<OrderListBasic />} />
        <Route path="/mypage/orderlist/detail" element={<OrderDetail />} />
        <Route path='/all-shop' element={<AllShop />} />
        <Route path="user/join" element={<Join />} />
        <Route path='user/login' element={<Login />} />
        <Route path='user/find/id' element={<FindID />} />
        <Route path='user/find/pw' element={<FindPW />} />
        <Route path='user/change/pw' element={<ChangePW />} />
        <Route path='/products/detail' element={<ProdDetail />} />        
        <Route path='/review/images' element={<ReviewImage />} />  
        <Route path='/order/login' element={<GotoLogin />} />    
        <Route path='/order/pay-succeed' element={<PaySucceed />} />    
        <Route path='/order/pay-failed' element={<PayFailed />} />     
        <Route path='/order/delivery/no-member' element={<NoMemInfo/>} />   
        <Route path='/order/delivery/member' element={<MemInfo />} />       
        <Route path='/order/delivery/new-address' element={<NewAddress />} />   
        <Route path='/order/delivery/select-address' element={<SelectAdd />} />   
        <Route path='/order/delivery/edit-address' element={<EditAdd />} />   

        {/* 관리자 페이지 */}
        <Route path="/manager/*" element={<Manager />}/>
      </Routes>
      <Footer />
    </>
  );
}

const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;