import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";

const AppSidebar = ({ products = [], onFilterChange }) => {
  // Dynamically get max price from products
  const productPrices = products.map(p => p.price || 0);
  const maxPrice = productPrices.length ? Math.max(...productPrices) : 1000;

  const [filters, setFilters] = useState({
    search: "",
    subCategory: "all",
    priceRange: [0, maxPrice],
  });

  const subCategories = [...new Set(products.map(p => p.category?.subCategory).filter(Boolean))];

  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const subCat = product.category?.subCategory?.toLowerCase() || "";
      const price = typeof product.price === "number" ? product.price : 0;

      const matchName = filters.search ? name.includes(filters.search.toLowerCase()) : true;
      const matchSubCategory =
        !filters.subCategory || filters.subCategory === "all"
          ? true
          : subCat === filters.subCategory.toLowerCase();
      const matchPrice =
        price >= (filters.priceRange?.[0] ?? 0) &&
        price <= (filters.priceRange?.[1] ?? maxPrice);

      return matchName && matchSubCategory && matchPrice;
    });
  }, [products, filters, maxPrice]);

  useEffect(() => {
    if (products.length) onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange, products.length]);

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
      </SidebarHeader>

      <SidebarContent className="px-4 space-y-6">
        <SidebarGroup>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              placeholder="Product name..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={filters.subCategory}
              onValueChange={(val) => setFilters({ ...filters, subCategory: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {subCategories.map((sub) => (
                  <SelectItem key={sub} value={sub.toLowerCase()}>{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-4">
            <Slider
              max={maxPrice}
              step={10}
              value={filters.priceRange}
              onValueChange={(val) => setFilters({ ...filters, priceRange: val })}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setFilters({ search: "", subCategory: "all", priceRange: [0, maxPrice] })}
        >
          Reset Filters
        </Button>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
