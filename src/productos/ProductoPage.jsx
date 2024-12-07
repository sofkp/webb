import React, { useEffect, useState } from "react";
import { useProduct } from "../contexts/ProductContext";
import { useTenant } from "../contexts/TenantContext";
import { useToken } from "../contexts/TokenContext";
import { ProductContainer, ProductImage, ProductDetails, CommentsContainer } from "./Producto-style";
import noImage from "../assets/no-image.svg";

const ProductPage = () => {
  const { productID , productName} = useProduct();
  const { tenantID } = useTenant();
  const { token } = useToken();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [productImage, setProductImage] = useState(noImage);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(
        `https://m55h5qlclj.execute-api.us-east-1.amazonaws.com/prod/product/search?tenant_id=${tenantID}&product_name=${productName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setProduct(data.body[0]);
    };

    const fetchComments = async () => {
      const response = await fetch(
        `https://0fhr3kss87.execute-api.us-east-1.amazonaws.com/prod/review/get?tenant_id=${tenantID}&product_id=${selectedProductId}`
      );
      const data = await response.json();
      setComments(data.body);
    };

    if (selectedProductId) {
      fetchProductDetails();
      fetchComments();
    }
  }, [tenantID, token, selectedProductId]);

  if (!product) return <div>Cargando...</div>;

  return (
    <ProductContainer>
      <ProductImage src={noImage} />
      <ProductDetails>
        <h1>{product.product_name}</h1>
        <p>{product.product_info?.features}</p>
        <h3>${product.product_price}</h3>
        <p>Categoría: {product.product_info?.category}</p>
        <p>Subcategoría: {product.product_info?.sub_category}</p>
        <p>Fecha de lanzamiento: {product.product_info?.release_date}</p>
      </ProductDetails>
      <CommentsContainer>
        <h2>Comentarios</h2>
        {comments.map((comment) => (
          <div key={comment.review_id}>
            <p><strong>{comment.user_id}:</strong> {comment.comentario}</p>
            <p>Calificación: {comment.stars} estrellas</p>
          </div>
        ))}
      </CommentsContainer>
    </ProductContainer>
  );
};

export default ProductPage;
