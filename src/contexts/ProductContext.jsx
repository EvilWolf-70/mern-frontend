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

  const createProduct = async (productData) => {
  try {
    setLoading(true);

    const { data } = await api.post("/products", productData);
    console.log(data.products)
    setProducts((prev) => [...prev, data.product]);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message,
    };
  } finally {
    setLoading(false);
  }
};

const updateProduct = async (id, productData) => {
  try {
    setLoading(true);

    const { data } = await api.put(`/products/${id}`, productData);

    setProducts((prev) =>
      prev.map((item) =>
        item._id === id ? data.product : item
      )
    );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message,
    };
  } finally {
    setLoading(false);
  }
};

const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);

    setProducts((prev) =>
      prev.filter((item) => item._id !== id)
    );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message,
    };
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
        createProduct,
        updateProduct,
        deleteProduct,

      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
