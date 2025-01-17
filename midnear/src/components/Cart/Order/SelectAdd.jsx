import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import StepHeader from '../StepHeader';
import { DelModal } from './DelModal';
 
const SelectAdd = () => {    
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const selectAdd = () => {
        navigate('/order/delivery/select-address');
    };

    const newAdd = () => {
        navigate('/order/delivery/new-address');
    };
    const addressList = [
        {   
            id: 1,
            name: '홍길동',
            number: '010-1233-1222',
            firstAdd: '서울특별시 서대문구 성산로 8길 9-9 (연희동)',
            secondAdd: 'ㅇㅇ아파트 109동 109호(종 1234)',
            postNum: 123098,
        },
        {   
            id: 2,
            name: '홍길동',
            number: '010-1233-1222',
            firstAdd: '서울특별시 서대문구 성산로 8길 9-9 (연희동)',
            secondAdd: 'ㅇㅇ아파트 109동 109호(종 1234)',
            postNum: 123098,
        }
    ]

  return (
    <div className={`address ${isModalOpen ? 'modal-open' : ''}`}>
    <StepHeader />
    <div className='container'>
        <div className='find'>
            <div className='title'>배송 정보 변경</div>
            <div className='select_content'>
                <div className='activate_box' onClick={selectAdd}>
                    배송지 선택
                </div>
                <div className='unactivate_box' onClick={newAdd}>
                    신규입력
                </div>
                <div className='empty'></div>
            </div>
            <div className='addList'>
                {addressList.map((item)=>(
                <div className='default_add' key={item.id}>
                <label
                    className={`radio-label ${selectedAddress === item.id ? 'selected' : ''}`}
                    key={item.id}
                    >
                    <input
                      type="radio"
                      name="address"
                      value={item.id}
                      checked={selectedAddress === item.id}
                      onChange={() => setSelectedAddress(item.id)}
                    />
                    <div className='left'>
                        <div className='userInfo'>
                        <div>
                            <p className='b_txt'>{item.name}</p>
                            <p className='g_txt'>{item.number}</p>
                        </div>
                        <div className='edit'>
                            <Link to='/order/delivery/edit-address'><div className='edit-btn'>수정</div></Link>
                            <div className='edit-btn' onClick={openModal}>삭제</div>
                            <DelModal isOpen={isModalOpen} closeModal={closeModal} />
                        </div>
                        </div>
                    
                        <p className='b_txt'>{item.firstAdd}</p>
                        <p className='b_txt'>{item.secondAdd}</p>
                        <p className='g_txt'>({item.postNum})</p>
                    </div>
                </label>
                </div>
                ))}
                <button className='btn'  onClick={newAdd}>배송지 추가하기</button>
            </div>
        </div>
        
    </div>
    </div>
  )
}

export default SelectAdd