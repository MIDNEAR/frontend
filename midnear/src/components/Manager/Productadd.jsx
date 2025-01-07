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
  const [selectedImages, setSelectedImages] = useState([]); // 선택된 이미지 관리

  const categories1 = ["카테고리1", "카테고리2", "카테고리3"];
  const categories2 = ["옵션1", "옵션2", "옵션3"];
  const categories3 = ["세부옵션1", "세부옵션2", "세부옵션3"];

  // 기존 함수들...
  const handleAddColorField = () => {
    setColorFields([...colorFields, ""]);
    setSizes([...sizes, []]);
    setQuantities([...quantities, []]);
    setSelectedImages([...selectedImages, []]); // 새로운 색상에 대한 선택 배열 추가
  };

  const handleColorChange = (e, index) => {
    const updatedFields = [...colorFields];
    updatedFields[index] = e.target.value;
    setColorFields(updatedFields);
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

        // 새로운 이미지에 대한 선택 상태도 초기화
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

  // 이미지 체크박스 선택 처리
  const handleImageSelect = (colorIndex, imgIndex) => {
    const newSelectedImages = [...selectedImages];
    if (!Array.isArray(newSelectedImages[colorIndex])) {
      newSelectedImages[colorIndex] = [];
    }
    newSelectedImages[colorIndex][imgIndex] = !newSelectedImages[colorIndex][imgIndex];
    setSelectedImages(newSelectedImages);
  };

  // 선택된 이미지 삭제
  const handleDeleteSelected = (colorIndex) => {
    const updatedImages = [...images];
    const updatedSelectedImages = [...selectedImages];
    
    // 선택된 이미지를 뒤에서부터 삭제 (인덱스 문제 방지)
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
    console.log("상세 설명:", description);
    console.log("사이즈 가이드:", sizeGuide);
    console.log("색상:", colorFields);
    console.log("사이즈:", sizes);
    console.log("수량:", quantities);
    console.log("상품 이미지:", images);
  };

  // 전체 선택 처리
const handleSelectAll = (colorIndex) => {
  const newSelectedImages = [...selectedImages];
  if (!Array.isArray(newSelectedImages[colorIndex])) {
    newSelectedImages[colorIndex] = [];
  }
  newSelectedImages[colorIndex] = new Array(images[colorIndex].length).fill(true);
  setSelectedImages(newSelectedImages);
};

// 전체 선택 해제 처리
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
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="상품 가격을 입력하세요"
              />
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
              <p>이미지를 업로드하세요.</p>
            )}
          </div>
        ))}
      </div>

      {/* Register Button */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
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
          등록
        </button>
      </div>
    </div>
  );
};

export default ProductAdd;