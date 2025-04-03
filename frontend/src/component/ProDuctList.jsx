import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  

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
    navigate(`/edit/${id}`); // Điều hướng đến trang chỉnh sửa sản phẩm
  };

  const handleDeleteProduct = (id) => {
    // Gửi yêu cầu xoá sản phẩm
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          // Sau khi xoá thành công, cập nhật lại danh sách sản phẩm
          setProducts(products.filter((product) => product.id !== id));
        })
        .catch((error) => console.error("Lỗi khi xoá sản phẩm:", error));
    }
  };

  return (
    <>
      <h1>Danh sách sản phẩm</h1>
      <div>
        <button onClick={handleAddProduct}>Thêm Mới</button>
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
                  <button onClick={() => handleEditProduct(item.id)}>Sửa</button>
                  <button onClick={() => handleDeleteProduct(item.id)}>Xoá</button> {/* Nút Xoá */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
