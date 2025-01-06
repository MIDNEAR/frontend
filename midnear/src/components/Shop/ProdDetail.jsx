import React, { useState } from 'react';
import { motion } from 'framer-motion'
import frontImg from '../../assets/img/product/prod1.png'
import backImg from '../../assets/img/product/prod2.png'
import down from '../../assets/img/product/down.svg'
import up from '../../assets/img/product/up.svg'

const ProdDetail = () => {
     const [selectSize, setSelectSize] = useState(null); 
     const [isSelected, setIsSelected] = useState(null);

     const showDetail = (item)=>{
      setIsSelected((prev) => (prev === item.name ? null : item.name));
     };

     const variants = {
      hidden: { height: 0, opacity: 0 },
      visible: { height: "auto", opacity: 1,  marginBottom: "2.7rem", marginTop: "1rem"},
      };

     const dummyList = [
        { 
          id: 1,
          frontImg: frontImg,
          backImg: backImg,
          name: "CUTE SWEATER",
          price: "\u20A9 39,900",
          dcPrice: "\u20A9 35,100",
          coupon: "10%할인쿠폰적용가",
          soldout: "SOLD OUT"
        },
     ]
     const size = ['S', 'M', 'L', 'XL'];
     const information = [
      {
        name: 'DETAILS',
        content: 'Classic fit shirt in brushed cotton flannel.\n\n\nFeatures a patch pocket,\nfront button closure and topstitching along the seams.\nMidnear stock flag label stitched at the side.\n\n- Longsleeve\n- Collared neckline\n- Buttoned front closure and cuffs\n- Single patch pocket\n- Back yoke\n- Curved hem\n- Classic fit\n- Unisex\n- Material: 100% cotton\n- Imported'
      },
      {
        name: 'SIZE GUIDE',
        content: 'S- 어깨 48 기장 70 소매 64 가슴55\nM- 어깨 48 기장 70 소매 64 가슴55\nL- 어깨 48 기장 70 소매 64 가슴55\nXL- 어깨 48 기장 70 소매 64 가슴55'
      },
      {
        name: 'SHIPPING & RETURNS',
        content: '00택배 (1588-3223)\n\n구매하신 제품은 수령하신 날로부터 7일 이내에 접수해 주셔야 합니다.\n자세히 보기.'
      },
      {
        name: 'STYLED WITH',
        content: 'NONE'
      },
      {
        name: 'REVIEW',
        content: 'NONE'
      }
     ]
     

  return (
    <div className='container'>
      <div className='prod-detail'>
        <div className='left-img'>
          <img src={dummyList[0].frontImg}/>
          <img src={dummyList[0].backImg}/>
        </div>
        <div className='right-info'>
          <div className='empty'></div>
          <div className='basic'>
            <div className='info'>
              <p className='name'>{dummyList[0].name}</p>
              <p className='price'>{dummyList[0].price}</p>
              {/**<div className='discount'>
                  <p className='dc-price'>{dummyList[0].dcPrice}</p>
                  <p className='coupon'>{dummyList[0].coupon}</p>
              </div>*/}
            </div>
            <div className='size'>
              {size.map((item)=>(
                <div className={selectSize === item ? 'bold' : ''} onClick={() => {
                  setSelectSize((prev) => (prev === item ? null : item));
                }}>{item}</div>
              ))}
            </div>
          </div>

          <div className='color'>BLACK</div>
          <div className='img-list'>
            <img src={dummyList[0].frontImg} />                
            <img src={dummyList[0].backImg} />
          </div>
          {/**<div className='soldout'>SOLD OUT</div>*/}
          
          <div className='box'>구매하기</div>
          <div className='box'>장바구니 담기</div>
          
          <div className='detail-box'>
            {information.map((item)=>(
              <div className='detail' >
                <div className='title'>
                <p className={`${isSelected === item.name ? 'bold' : ''} ${isSelected === item.name ? 'display' : item.name}`} onClick={()=>showDetail(item)}>{item.name}</p>
                <img src={isSelected === item.name ? up : down}
                    className={`${isSelected === item.name ? 'display' : item.name}`} onClick={()=>showDetail(item)}/>
                </div>
                <motion.div
                    className='content'
                    initial='hidden'
                    animate={isSelected === item.name ? 'visible' : 'hidden'}
                    variants={variants}
                    transition={{duration:0.3}}
                >
                  <p>{item.content}</p>
                </motion.div>
                
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProdDetail