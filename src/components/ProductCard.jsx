const ProductCard = ({ product }) => {
  return (
    <div className="border p-3 rounded">
      <img src={product.image} className="h-40 w-full object-cover" />
      <h3 className="font-bold">{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;
