import { Navbar } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { ProductCard } from "../../components/ProductCard";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered list with all products
    })();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <Navbar searchData={products} onSearch={handleSearch} />
      <main className="flex flex-wrap gap-8 justify-center pt-32 min-h-[80vh]">
        {filteredProducts?.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : // Show message if search yields no results
            products.length > 0 && (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-100 rounded-lg shadow-sm w-1/2 h-1/2 border-4 border-gray-300 mt-16 m-4">
                <span className="material-icons-outlined text-6xl text-gray-300 mb-4">
                  search_off
                </span>
                <p className="text-xl text-gray-500 text-center">No products matched your search</p>
              </div>
            )}
      </main>
    </>
  );
};
