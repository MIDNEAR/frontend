import React, { useState } from 'react'

const Logo = () => {
  const [previewImage, setPreviewImage] = useState(null);
      const [fileName, setFileName] = useState("");
  
      const handleFileChange = (event) => {
          const file = event.target.files[0];
          setFileName(file.name);
          if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                  setPreviewImage(reader.result);
              };
              reader.readAsDataURL(file);
          }
      };
  
      return (
          <div className="logo container">
              <div className="file">
                  <h5>로고 수정</h5>
                  <label htmlFor="file-upload" >
                      첨부파일
                  </label>
                  <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                  />
                  <p>{fileName}</p>
              </div>
  
              <div className="image">
                  {previewImage ? (
                      <img
                          src={previewImage}
                      />
                  ) : (
                      <p> </p>
                  )}
              </div>
  
              <div className="btn">완료</div>
          </div>
      );
}

export default Logo