import { useEffect, useMemo, useState } from "react";

const ProductFilter = ({ products = [], onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    dosageForm: "",
    requiresPrescription: "all", // all, yes, no
    alertType: "all", // all, expiring-soon, expired, low-stock, out-of-stock, healthy
    minPrice: 0,
    maxPrice: 1000,
  });

  // Updated based on your Mongoose Enum
  const dosageForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops'];

  const getAlertType = (product) => {
    const now = new Date();
    const expiresAt = product.expiryDate ? new Date(product.expiryDate) : null;
    const quantity = typeof product.quantity === "number" ? product.quantity : 0;

    if (quantity <= 0) return "out-of-stock";
    if (expiresAt) {
      const diffDays = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) return "expired";
      if (diffDays <= 7) return "expiring-soon";
    }
    if (quantity > 0 && quantity < 10) return "low-stock";
    return "healthy";
  };

  const filteredProducts = useMemo(() => {
    // 🔥 Check if default filters are active
    const noFiltersApplied =
      !filters.search &&
      !filters.dosageForm &&
      filters.requiresPrescription === "all" &&
      filters.alertType === "all" &&
      filters.minPrice === 0 &&
      filters.maxPrice === 1000;

    if (noFiltersApplied) return products;

    return products.filter((product) => {
      // 1. Match by Brand Name OR Generic Name
      const searchLower = filters.search.toLowerCase();
      const matchSearch = 
        product.name?.toLowerCase().includes(searchLower) ||
        product.genericName?.toLowerCase().includes(searchLower);

      // 2. Match Dosage Form (Exact match from dropdown)
      const matchDosage = filters.dosageForm
        ? product.dosageForm === filters.dosageForm
        : true;

      // 3. Match Prescription Requirement
      const matchRx = 
        filters.requiresPrescription === "all" ? true :
        filters.requiresPrescription === "yes" ? product.requiresPrescription === true :
        product.requiresPrescription === false;

      // 4. Match Alert Status
      const productAlertType = getAlertType(product);
      const matchAlert =
        filters.alertType === "all" ? true :
        filters.alertType === "healthy" ? productAlertType === "healthy" :
        productAlertType === filters.alertType;

      // 5. Match Price Range
      const matchPrice =
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice;

      return matchSearch && matchDosage && matchRx && matchAlert && matchPrice;
    });
  }, [products, filters]);

  useEffect(() => {
    onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange]);

  return (
    <div className="space-y-6 bg-white p-5 rounded-lg shadow-md border border-slate-100">
      <h3 className="font-bold text-slate-800 text-lg border-b pb-2">Filter Inventory</h3>

      {/* Search by Brand or Generic */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-slate-500">Search Medicine</label>
        <input
          type="text"
          placeholder="Brand or Molecule name..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      {/* Dosage Form Select */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-slate-500">Dosage Form</label>
        <select
          value={filters.dosageForm}
          onChange={(e) => setFilters({ ...filters, dosageForm: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-white"
        >
          <option value="">All Forms</option>
          {dosageForms.map((form) => (
            <option key={form} value={form}>{form}</option>
          ))}
        </select>
      </div>

      {/* Prescription Toggle */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-slate-500">Prescription Status</label>
        <div className="flex gap-2">
          {['all', 'yes', 'no'].map((option) => (
            <button
              key={option}
              onClick={() => setFilters({ ...filters, requiresPrescription: option })}
              className={`flex-1 py-1 px-2 text-xs rounded-md border transition-all ${
                filters.requiresPrescription === option 
                ? 'bg-emerald-600 text-white border-emerald-600' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {option === 'all' ? 'All' : option === 'yes' ? 'Rx Only' : 'OTC'}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Status */}
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-slate-500">Alert Status</label>
        <select
          value={filters.alertType}
          onChange={(e) => setFilters({ ...filters, alertType: e.target.value })}
          className="w-full px-3 py-2 border rounded-md bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="expiring-soon">Expiring Soon</option>
          <option value="expired">Expired</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="healthy">Healthy Stock</option>
        </select>
      </div>

      {/* Price Ranges */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
             <span>MIN PRICE</span>
             <span className="text-emerald-600">${filters.minPrice}</span>
          </div>
          <input
            type="range" min="0" max="1000"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
             <span>MAX PRICE</span>
             <span className="text-emerald-600">${filters.maxPrice}</span>
          </div>
          <input
            type="range" min="0" max="1000"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>
      </div>

      <button
        onClick={() => setFilters({
          search: "",
          dosageForm: "",
          requiresPrescription: "all",
          alertType: "all",
          minPrice: 0,
          maxPrice: 1000,
        })}
        className="w-full border-2 border-slate-200 text-slate-500 font-bold px-4 py-2 rounded-md hover:bg-slate-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilter;