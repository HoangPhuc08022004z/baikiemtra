import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProDuctCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div>
      <h1>Thêm Sản Phẩm Mới</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm sản phẩm</button>
      </form>
      <button onClick={handleBack}>Trở lại</button> 
    </div>
  );
}
