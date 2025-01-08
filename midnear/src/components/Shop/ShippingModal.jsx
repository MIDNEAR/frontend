import React from 'react'
import Close from '../../assets/img/product/close.svg'

const ShippingModal = ({isOpen, closeModal}) => {

  return (
    <div className='ShippingModal' style={{display:isOpen ? "flex" : "none"}} >
        <div className='modal'>
            <div className='modal-top'>
                <h2>SHIPPING & RETURNS</h2>
                <img src={Close} onClick={closeModal} className='close'/>
            </div>
            <div className='content'>
                <p>{`배송 안내
• 미드니 어 셀렉트 제품은 2-7일, 세컨드 핸즈 제품은 1-3일 이내 출고됩니다.
• 셀렉트 제품, 세컨드 핸즈 제품을 동시에 구입하신 경우 출고가 3일 초과 늦어지게 되면 준비되는 상품 먼저 발송 드린 후 나머지 제품을 추가로 발송 드립니다.  (배송비는 사 측에서 부담합니다.)
• 최대한 빨리 출고할 수 있도록 노력하겠습니다.
배송 상태
• 공휴일에 따라 배송 시간에 영향을 받을 수 있습니다.
• 기본 배송일보다 더욱 여유 있는 배송기간 예상 부탁드립니다.
배송비
• 10만 원 이하의 주문 건 배송비 ₩3,000
• 10만 원 이상 무료배송
주문 취소
주문 취소를 요청할 때의 상황에 따라 취소 불가할 수 있습니다.
• 상품이 출고 또는 배송되기 전까지 주문 취소가 가능합니다.
• 출고 준비가 완료된 주문과 배송 단계에 있는 주문 건의 경우 취소가 불가할 수 있습니다.
• 주문이 취소된 경우 환불까지 2-3 영업일이 소요됩니다. 이후에도 환불 처리되지 않을 시 문의 부탁드립니다.

반품 및 환불 규정
반품 규정
반품 요청은 7일 이내에 가능합니다.
제품 하자, 오배송 기타 고객님이 받으신 제품 등의 내용이 표시, 광고 내용과 다르거나 계약 내용과 다르게 이행된 경우에는 제품 등을 수령한 날로부터 3개월 이내/ 그 사실을 알게 된 날 또는 알 수 있었던 날로부터 30일 이내에 반품 가능합니다.
• 반품할 제품을 원래 배송되었던 포장 상태 그대로 박스 및 종이봉투 안에 담아 주세요.
• 상품을 사용하지 않은 상태에서 택을 제거하지 않고 반송하여 주십시오. 태그 제거 및 착용 발견 시 반품은 불가합니다.
• 브랜드 태그가 부착되어 배송되었다면, 태그가 부착된 상태 그대로 반품해 주셔야 합니다.
• 주문번호/주문자를 확인할 수 있는 메모를 꼭 동봉해 주시기 바랍니다.
• 상품 검수를 거쳐 이상이 없는 경우 결제수단과 동일한 방법으로 환불 처리됩니다 (배송료 환불 불가).
• 반품 시 훼손이나 파손될 우려가 있는 상품은 재포장에 유의하여 반송해 주시기 바랍니다.
• 속옷, 양말, 기타 액세서리류는 반품 및 환불이 불가합니다.
불량/ 파손된 반품
• 사이트 내부 연락망을 통하여 문의 및 연락 주신 후 제품을 발송해 주셔야 합니다.`}


                </p>
            </div>
        </div>
    </div>
  )
}

export default ShippingModal