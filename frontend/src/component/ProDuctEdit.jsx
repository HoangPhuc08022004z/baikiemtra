import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ProDuctEdit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        const product = response.data;
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
      });
  }, [id]); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      description,
      price,
    };

 
    axios
      .put(`http://localhost:3000/products/${id}`, updatedProduct)
      .then((response) => {
        alert("Sản phẩm đã được cập nhật!");
        navigate("/");  
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
      });
  };


  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Chỉnh Sửa Sản Phẩm</h1>
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
        <button type="submit">Cập nhật sản phẩm</button>
      </form>
      <button onClick={handleBack}>Trở lại</button> 
    </div>
  );
}
