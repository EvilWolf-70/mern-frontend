import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/products");
   
      setProducts(data.products);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
