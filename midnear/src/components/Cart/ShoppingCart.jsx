import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Close from '../../assets/img/product/close.svg'
import frontImg from '../../assets/img/product/prod1.png'
import check from '../../assets/img/cart/check.svg'

const ShoppingCart = ({ toggleCart}) => {
  const [cartItems, setCartItems] = useState([]); 
  const [total, setTotal] = useState(0); //{total.toLocaleString('ko-KR')}
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedTotal, setSelectedTotal] = useState(0);
  const cartList = [
    { 
      id: 1,
      frontImg: frontImg,
      name: "CUTE SWEATER",
      price: 39000,
      dcPrice: 35100,
      color: "BLACK",
      size: "M",
      count: 2
    },
    { 
      id: 2,
      frontImg: frontImg,
      name: "LEATHER JACKET",
      price: 140000,
      dcPrice: 35100,
      color: "BROWN",
      size: "S",
      count: 1
    },
  ]
  useEffect(() => {
    setCartItems(cartList);
    const initialTotal = cartList.reduce(
      (sum, item) => sum + item.price * item.count, 0
    );
    setTotal(initialTotal);
  }, []);

  const deleteItem = () => {
    const updatedCartItems = cartItems.filter(item => !checkedItems.includes(item.id));
    setCartItems(updatedCartItems);
    setCheckedItems([]);
  }

  const decreaseNum = (id) => {
    setCartItems((prev) =>
    prev.map((item) => 
    item.id === id && item.count > 1 ? {...item, count : item.count - 1} : item
  ))
  }
  const increaseNum = (id) => {
    setCartItems((prev) => 
    prev.map((item) =>
    item.id === id ? {...item, count: item.count + 1 } : item
  ))
  }
  useEffect(() => {
    const updatedTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    setTotal(updatedTotal);
  }, [cartItems]);
  
  const checkAllItems = () => {
    if (checkedItems.length === cartItems.length) {
      setCheckedItems([]);
    } else {
      const allItemIds = cartItems.map(item => item.id);
      setCheckedItems(allItemIds); 
    }
  }
  const checkItemHandler = (id, isChecked) => {
    setCheckedItems((prevCheckedItems) => {
      if (isChecked) {
        return [...prevCheckedItems, id];
      } else {
        return prevCheckedItems.filter((itemId) => itemId !== id);
      }
    });
  };

  const isCheckItem = (e, id) => {
    const { checked } = e.target;
    checkItemHandler(id, checked);
  };

  useEffect(()=>{
    const selectedItems = cartItems.filter(item => checkedItems.includes(item.id));
    const newSelectedTotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.count, 0
    );
    setSelectedTotal(newSelectedTotal);
  }, [checkedItems, cartItems]);
  
  return (
    <div className='cart_content'>
            <div className='cart'>
                <div className='cart_nav'>
                    <img src={Close} className='close' onClick={toggleCart}/>

                    <div className="sc2">
                        <p className="SEARCH">SEARCH</p>
                        <p className="LOGIN">LOGIN</p>
                        <p className="ACCOUNT">ACCOUNT</p>
                        <p className="BAG">
                        BAG <span>({cartItems.length})</span>
                        </p>
                    </div>
                </div>
                <div className='del-check'>
                    <div className='delete' onClick={deleteItem}>선택 삭제</div>                    
                    <div className='check'>
                    <span>전체 선택</span>
                    <label className='checkbox'>
                      <input
                        type="checkbox"
                        checked={checkedItems.length === cartItems.length}
                        onChange={checkAllItems} 
                      />
                      {checkedItems.length === cartItems.length && (
                        <img src={check} className='checkImg'/>
                      )
                      }
                    </label>
                    </div>
                  </div>
                <div className='prodList'>
                  {cartItems.map((item,index)=>(
                    <div className='prod' key={index}>
                      <img src={item.frontImg} className='thumbnail'/>
                      <div className='info'>
                        <div className='top'>
                          <p className='name'>{item.name}</p>
                          <p className='price'>&#xffe6; {item.price.toLocaleString('ko-KR')}</p>
                          {/**
                          <p className='dc-price'>&#xffe6; {item.dcPrice}</p>
                          */}
                        </div>
                        <div className='bottom'>
                          <p>{item.color}<span className='slash'>/</span>{item.size}</p>
                          <div className='quantity'>
                          <button className='minus' onClick={()=>decreaseNum(item.id)}>-</button>
                          <p className='cal'>{item.count}</p>
                          <button className='plus' onClick={()=>increaseNum(item.id)}>+</button>
                          </div>
                        </div>
                      </div>
                      <label className='checkbox'>
                        <input
                          type="checkbox"
                          id={item.id}
                          checked={checkedItems.includes(item.id)} 
                          onChange={(e) => isCheckItem(e, item.id)} 
                        />
                        {checkedItems.includes(item.id) && (
                          <img src={check} className='checkImg'/>
                        )
                        }
                        </label>
                       
                    </div>
                  ))}
                </div>
                <div className='total'>
                  <div className='total-price'>
                    <p>총 상품 금액</p>
                    <p className='sum-price'>{selectedTotal.toLocaleString('ko-KR')}</p>
                  </div>
                  <Link to="/order/login"><div className='box' onClick={toggleCart}>선택한 상품만 결제</div></Link>
                  <Link to="/order/login"><div className='box' onClick={toggleCart}>전체 결제</div></Link>
                  {/**
                   * <Link to="/order/non-member"><div className='box'>선택한 상품만 결제</div></Link>
                  <Link to="/order/non-member"><div className='box'>전체 결제</div></Link>
                   */}
                </div>
            </div>
        </div>
  )
}

export default ShoppingCart