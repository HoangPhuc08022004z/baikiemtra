import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProDuctDetail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`) 
            .then((response) => {
                setProduct(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi tải chi tiết sản phẩm:", error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) return <>Đang tải...</>;
    if (!product) return <>Không tìm thấy sản phẩm!</>;

    return (
        <div>
            <h1>Chi tiết sản phẩm</h1>
            <h2>{product.title}</h2>
            <p><strong>Mô tả:</strong> {product.description}</p>
            <p><strong>Giá:</strong> {product.price}</p>
           
        </div>
    );
}

export default ProDuctDetail;
