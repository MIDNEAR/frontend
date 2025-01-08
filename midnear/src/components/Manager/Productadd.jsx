import React, { useState } from "react";
import "../../assets/sass/manager/_productadd.scss";

const ProductAdd = () => {
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sizeGuide, setSizeGuide] = useState("");
  const [colorFields, setColorFields] = useState([""]);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([[]]);
  const [quantities, setQuantities] = useState([[]]);
  const [selectedImages, setSelectedImages] = useState([]); 
  const [isDiscount, setIsDiscount] = useState(false); 
  const [discountRate, setDiscountRate] = useState(""); 
  const [discountedPrice, setDiscountedPrice] = useState(""); 
  const [colorThumbnails, setColorThumbnails] = useState([]);

  const categories1 = ["카테고리1", "카테고리2", "카테고리3"];
  const categories2 = ["옵션1", "옵션2", "옵션3"];
  const categories3 = ["세부옵션1", "세부옵션2", "세부옵션3"];



  // 할인된 가격 계산
  const calculateDiscountedPrice = (price, rate) => {
    if (!price || !rate) return "";
    return (price - (price * rate) / 100).toFixed(2);
  };

  // 가격 변경 핸들러
  const handlePriceChange = (e) => {
    const price = e.target.value;
    setProductPrice(price);

    if (isDiscount && discountRate) {
      setDiscountedPrice(calculateDiscountedPrice(price, discountRate));
    }
  };

  // 할인율 변경 핸들러
  const handleDiscountRateChange = (e) => {
    const rate = e.target.value;
    setDiscountRate(rate);

    if (productPrice) {
      setDiscountedPrice(calculateDiscountedPrice(productPrice, rate));
    }
  };



  const handleAddColorField = () => {
    setColorFields([...colorFields, ""]);
    setSizes([...sizes, []]);
    setQuantities([...quantities, []]);
    setSelectedImages([...selectedImages, []]); 
    setColorThumbnails([...colorThumbnails, ""]);
  };

  const handleColorChange = (e, index) => {
    const updatedFields = [...colorFields];
    updatedFields[index] = e.target.value;
    setColorFields(updatedFields);
  };

  const handleThumbnailChange = (e, index) => {
    const file = e.target.files[0]; 
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedThumbnails = [...colorThumbnails];
      updatedThumbnails[index] = reader.result; 
      setColorThumbnails(updatedThumbnails);
    };

    if (file) {
      reader.readAsDataURL(file); 
    }
  };

  const handleSizeChange = (e, colorIndex, sizeIndex) => {
    const updatedSizes = [...sizes];
    updatedSizes[colorIndex][sizeIndex] = e.target.value;
    setSizes(updatedSizes);
  };

  const handleQuantityChange = (e, colorIndex, sizeIndex) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[colorIndex][sizeIndex] = e.target.value;
    setQuantities(updatedQuantities);
  };

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    const newImages = [...images];

    if (!Array.isArray(newImages[index])) {
      newImages[index] = [];
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages[index].push(reader.result);
        setImages(newImages);


        const newSelectedImages = [...selectedImages];
        if (!Array.isArray(newSelectedImages[index])) {
          newSelectedImages[index] = new Array(newImages[index].length).fill(false);
        } else {
          newSelectedImages[index].push(false);
        }
        setSelectedImages(newSelectedImages);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveColorField = (index) => {
    const updatedFields = [...colorFields];
    updatedFields.splice(index, 1);
    setColorFields(updatedFields);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);

    const updatedQuantities = [...quantities];
    updatedQuantities.splice(index, 1);
    setQuantities(updatedQuantities);

    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages.splice(index, 1);
    setSelectedImages(updatedSelectedImages);

    const updatedThumbnails = [...colorThumbnails];
    updatedThumbnails.splice(index, 1);  
    setColorThumbnails(updatedThumbnails);
  };

  const handleAddSizeField = (colorIndex) => {
    const updatedSizes = [...sizes];
    updatedSizes[colorIndex] = [...updatedSizes[colorIndex], ""];
    setSizes(updatedSizes);

    const updatedQuantities = [...quantities];
    updatedQuantities[colorIndex] = [...updatedQuantities[colorIndex], ""];
    setQuantities(updatedQuantities);
  };

  const handleRemoveSizeField = (colorIndex, sizeIndex) => {
    const updatedSizes = [...sizes];
    updatedSizes[colorIndex].splice(sizeIndex, 1);
    setSizes(updatedSizes);

    const updatedQuantities = [...quantities];
    updatedQuantities[colorIndex].splice(sizeIndex, 1);
    setQuantities(updatedQuantities);
  };


  const handleImageSelect = (colorIndex, imgIndex) => {
    const newSelectedImages = [...selectedImages];
    if (!Array.isArray(newSelectedImages[colorIndex])) {
      newSelectedImages[colorIndex] = [];
    }
    newSelectedImages[colorIndex][imgIndex] = !newSelectedImages[colorIndex][imgIndex];
    setSelectedImages(newSelectedImages);
  };


  const handleDeleteSelected = (colorIndex) => {
    const updatedImages = [...images];
    const updatedSelectedImages = [...selectedImages];


    for (let i = updatedSelectedImages[colorIndex].length - 1; i >= 0; i--) {
      if (updatedSelectedImages[colorIndex][i]) {
        updatedImages[colorIndex].splice(i, 1);
        updatedSelectedImages[colorIndex].splice(i, 1);
      }
    }

    setImages(updatedImages);
    setSelectedImages(updatedSelectedImages);
  };

  const handleRegister = () => {
    console.log("카테고리1:", category1);
    console.log("카테고리2:", category2);
    console.log("카테고리3:", category3);
    console.log("상품명:", productName);
    console.log("상품 가격:", productPrice);
    console.log("할인 설정 여부:", isDiscount ? "설정함" : "설정안함");
    console.log("할인율:", isDiscount ? discountRate : "미설정");
    console.log("상세 설명:", description);
    console.log("사이즈 가이드:", sizeGuide);
    console.log("색상:", colorFields);
    console.log("사이즈:", sizes);
    console.log("수량:", quantities);
    console.log("상품 이미지:", images);
    console.log("할인된 가격:", isDiscount ? discountedPrice : "원래 가격");
  };


  const handleSelectAll = (colorIndex) => {
    const newSelectedImages = [...selectedImages];
    if (!Array.isArray(newSelectedImages[colorIndex])) {
      newSelectedImages[colorIndex] = [];
    }
    newSelectedImages[colorIndex] = new Array(images[colorIndex].length).fill(true);
    setSelectedImages(newSelectedImages);
  };


  const handleDeselectAll = (colorIndex) => {
    const newSelectedImages = [...selectedImages];
    if (!Array.isArray(newSelectedImages[colorIndex])) {
      newSelectedImages[colorIndex] = [];
    }
    newSelectedImages[colorIndex] = new Array(images[colorIndex].length).fill(false);
    setSelectedImages(newSelectedImages);
  };

  return (
    <div className="product-add-container">
      {/* Categories Section */}
      <div className="pa-section pa-section-category">
        <div className="pa-content">
          <h3>카테고리</h3>
          <div className="pa-input-group">
            <div className="select-wrapper">
              <select value={category1} onChange={(e) => setCategory1(e.target.value)}>
                <option value="">카테고리1 선택</option>
                {categories1.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="dropdown-arrow">▼</div>
            </div>

            <div>−</div>

            <div className="select-wrapper">
              <select value={category2} onChange={(e) => setCategory2(e.target.value)}>
                <option value="">카테고리2 선택</option>
                {categories2.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="dropdown-arrow">▼</div>
            </div>

            <div>−</div>

            <div className="select-wrapper">
              <select value={category3} onChange={(e) => setCategory3(e.target.value)}>
                <option value="">카테고리3 선택</option>
                {categories3.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="dropdown-arrow">▼</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Name Section */}
      <div className="pa-section pa-section-name">
        <div className="pa-content">
          <h3>상품명</h3>
          <div className="pa-input-group">
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="상품명을 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* Price and Description Sections */}
      <div className="priceanddescription">
        <div className="pa-section pa-section-price">
          <div className="pa-content">
            <h3>상품 가격</h3>
            <div className="pa-input-group">
              <input
                type="text"
                value={productPrice}
                onChange={handlePriceChange}
                placeholder="상품 가격을 입력하세요"
              />
              <div className="currency-box">원</div>

            </div>

            {/* Discount Section */}
            <div className="discount-section">
              <div>  {isDiscount && discountedPrice && (
                <span className="discounted-price">할인가: {discountedPrice}원</span>
              )}</div>
              <div className="discount-row">

                {isDiscount && (
                  <div className="discount-row">
                    <span className="discount-text-label">할인</span>
                    <input
                      type="text"
                      value={discountRate}
                      onChange={handleDiscountRateChange}
                      placeholder="할인율을 입력하세요 (%)"
                      className="discount-text"
                    />
                  </div>
                )}
                {isDiscount && (
                  <>
                    <span className="period-label">기간</span>
                    <button className="period-button">설정</button>
                  </>
                )}
                <div className="radio-group">
                  <label className={`radio-label ${!isDiscount ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="discount"
                      value="false"
                      checked={!isDiscount}
                      onChange={() => {
                        setIsDiscount(false);
                        setDiscountedPrice("");
                      }}
                    />
                    설정안함
                  </label>
                  <label className={`radio-label ${isDiscount ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="discount"
                      value="true"
                      checked={isDiscount}
                      onChange={() => setIsDiscount(true)}
                    />
                    설정함
                  </label>
                </div>


              </div>
            </div>
          </div>
        </div>


        <div className="pa-section pa-section-description">
          <div className="pa-content">
            <h3>상세 설명</h3>
            <div className="pa-input-group">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="상세 설명을 입력하세요"
              />
            </div>
          </div>
        </div>
      </div>


      {/* Size Guide Section */}
      <div className="pa-section pa-section-size-guide">
        <div className="pa-content">
          <h3>사이즈 가이드</h3>
          <div className="pa-input-group">
            <textarea
              value={sizeGuide}
              onChange={(e) => setSizeGuide(e.target.value)}
              placeholder="사이즈 가이드를 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* Color Section */}
      <div className="pa-section pa-section-color">
        <div className="pa-content">
          <h3>색상</h3>
          <div className="pa-input-group">
            {colorFields.map((colorField, colorIndex) => (
              <div key={colorIndex} className="color-field">
                <input
                  type="text"
                  className="color-input"
                  value={colorField}
                  placeholder="색상을 입력하세요"
                  onChange={(e) => handleColorChange(e, colorIndex)}
                />
                <button
                  className="pa-remove-btn"
                  onClick={() => handleRemoveColorField(colorIndex)}
                >
                  -
                </button>



              </div>
            ))}
            <button className="pa-add-btn" onClick={handleAddColorField}>
              +
            </button>
          </div>
        </div>
      </div>


      {/* Image Upload Section */}
      <div className="pa-section pa-section-image">

        {colorFields.map((colorField, index) => (
          <div key={index} className="pa-content image-upload-section">
            <h3>{colorField}</h3>
            <div className="size-add-container">
              <div className="pa-size">
                <h2>사이즈 추가</h2>
                <div className="size-container">
                  {sizes[index].map((size, sizeIndex) => (
                    <div key={sizeIndex} className="size-quantity-field">
                      <button
                        className="pa-remove-btn"
                        onClick={() => handleRemoveSizeField(index, sizeIndex)}
                      >
                        -
                      </button>
                      <div className="size-quantity-inputs">
                        <input
                          type="text"
                          value={size}
                          placeholder="사이즈"
                          onChange={(e) => handleSizeChange(e, index, sizeIndex)}
                          className="pa-input"
                        />
                        <input
                          type="number"
                          value={quantities[index][sizeIndex]}
                          placeholder="수량"
                          onChange={(e) => handleQuantityChange(e, index, sizeIndex)}
                          className="pa-input quantity-input"
                        />
                      </div>
                    </div>
                  ))}
                  <button className="pa-add-btn" onClick={() => handleAddSizeField(index)}>
                    +
                  </button>
                </div>
              </div>
              <div className="pa-thumnail">
          <h2>컬러별 썸네일 이미지</h2>
          <div className="pa-th-file-upload-container">
              {/* 커스텀 첨부파일 추가 버튼 */}
              <button className="pa-th-custom-upload-btn" onClick={() => document.getElementById('pa-th-file-input').click()}>
                첨부파일
              </button>
              
              {/* 실제 파일 input */}
              <input
                type="file"
                id="pa-th-file-input"
                className="pa-th-file-input"
                onChange={(e) => handleThumbnailChange(e, index)}
                style={{ display: 'none' }}  // input은 숨긴다.
              />
              
              {/* 미리보기 이미지 */}
              {colorThumbnails[index] && (
                <div className="pa-th-image-preview">
                  <img
                    src={colorThumbnails[index]}
                    alt="썸네일 이미지"
                    className="pa-th-preview-image"
                  />
                </div>
              )}
            </div>
        </div>

            </div>


            <h2>상품 이미지</h2>


            <div className="pa-input-group">
              <label htmlFor={`file-input-${index}`} className="pa-input-file-label">
                첨부파일
                <input
                  id={`file-input-${index}`}
                  type="file"
                  multiple
                  onChange={(e) => handleImageChange(e, index)}
                  className="pa-input-file"
                />
              </label>
            </div>

            {Array.isArray(images[index]) && images[index].length > 0 ? (
              <>
                <div className="image-preview">
                  {images[index].map((image, imgIndex) => (
                    <div key={imgIndex} className="image-thumbnail-container">
                      <input
                        type="checkbox"
                        className="image-checkbox"
                        checked={selectedImages[index]?.[imgIndex] || false}
                        onChange={() => handleImageSelect(index, imgIndex)}
                      />
                      <img
                        src={image}
                        alt={`미리보기 - ${colorField}`}
                        className="image-thumbnail"
                      />
                    </div>
                  ))}
                </div>
                <div className="button-container">
                  <button
                    className="pa-register-btn select-btn"
                    onClick={() => handleSelectAll(index)}
                  >
                    전체선택
                  </button>
                  <button
                    className="pa-register-btn select-btn"
                    onClick={() => handleDeselectAll(index)}
                  >
                    전체해제
                  </button>
                  <button
                    className="pa-register-btn delete-btn"
                    onClick={() => handleDeleteSelected(index)}
                  >
                    삭제
                  </button>
                </div>
              </>
            ) : (
              <p></p>
            )}

          </div>
        ))}
      </div>

      {/* Register Button */}
      <div className="pa-register-con">
        <button
          onClick={handleRegister}
          className="pa-register-btn"
          disabled={
            !productName ||
            !productPrice ||
            !category1 ||
            !category2 ||
            !category3 ||
            !description ||
            !sizeGuide ||
            colorFields.some((c) => !c) ||
            sizes.some((s) => s.some((size) => !size)) ||
            quantities.some((q) => q.some((quantity) => !quantity)) ||
            images.length !== colorFields.length
          }
        >
          등록 완료
        </button>
      </div>
    </div>
  );
};

export default ProductAdd;