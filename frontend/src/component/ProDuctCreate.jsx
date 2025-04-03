import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Style.css';  

export default function ProDuctCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price) {
      setError("Tất cả các trường đều phải nhập!");
      return;
    }

    const newProduct = {
      title,
      description,
      price,
    };

    axios
      .post("http://localhost:3000/products", newProduct)
      .then((response) => {
        alert("Sản phẩm đã được thêm thành công!");
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="product-create-container">
      <div className="product-create-form">
        <h1 className="product-create-title">Thêm Sản Phẩm Mới</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="product-create-label">Tên sản phẩm</label>
            <input
              className="product-create-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="product-create-label">Mô tả</label>
            <textarea
              className="product-create-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="product-create-label">Giá</label>
            <input
              className="product-create-input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          {error && <p className="product-create-error">{error}</p>} 
          <button type="submit" className="product-create-submit-button">Thêm sản phẩm</button>
        </form>
        <button type="button" className="product-create-back-button" onClick={handleBack}>Trở lại</button> 
      </div>
    </div>
  );
}
