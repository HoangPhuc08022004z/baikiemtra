import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import "./Style.css";
export default function ProDuctList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, []);

  const handleAddProduct = () => {
    navigate("/create");
  };

  const handleEditProduct = (id) => {
    navigate(`/edit/${id}`); 
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setProducts(products.filter((product) => product.id !== id));
        })
        .catch((error) => console.error("Lỗi khi xoá sản phẩm:", error));
    }
  };

  return (
    <div className="product-list-container">
      <h1>Danh sách sản phẩm</h1>
      <div>
        <button onClick={handleAddProduct} className="btn-add">Thêm Mới</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>
              <th>Giá</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <a href={`/products/${item.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                    {item.title}
                  </a>
                </td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <button onClick={() => handleEditProduct(item.id)} className="btn-edit">Sửa</button>
                  <button onClick={() => handleDeleteProduct(item.id)} className="btn-delete">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
