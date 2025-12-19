const ProductCard = ({ product }) => {
  // Example colors (replace with dynamic if you have)
  const colors = ["#C0C0C0", "#A52A2A", "#228B22", "#FFD700", "#00008B"];

  return (
    <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition">
      {/* Product Image */}
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover rounded-lg"
        />
      </figure>

      <div className="card-body">
        {/* Category / SubCategory */}
        <p className="text-sm text-gray-500">
          {product.category?.name} / {product.category?.subCategory}
        </p>

        {/* Product Name */}
        <h2 className="card-title">{product.name}</h2>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-red-600 font-bold">${product.price}</span>
          
        </div>

        {/* Color Options */}
        <div className="flex items-center mt-2 gap-2">
          {colors.slice(0, 4).map((c, idx) => (
            <span
              key={idx}
              style={{ backgroundColor: c }}
              className="w-4 h-4 rounded-full border border-gray-300"
            />
          ))}
          {colors.length > 4 && (
            <span className="text-gray-500 text-sm">+{colors.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
