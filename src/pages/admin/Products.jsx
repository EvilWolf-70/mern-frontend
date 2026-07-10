
import React, { useState } from "react";
import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";
import { useProducts } from "../../contexts/ProductContext";

const Products = () => {
  const {  products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct } = useProducts();

  

  const initialState = {
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);

  // Handle Input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Add / Update Product
 const handleSubmit = async (e) => {
    e.preventDefault();

    let result;

    if (editingId) {
        result = await updateProduct(editingId, formData);
    } else {
        result = await createProduct(formData);
    }

    if (result.success) {
        setFormData(initialState);
        setEditingId(null);
    } else {
        alert(result.message);
    }
};

  // Edit Product
  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: product.image,
        description: product.description,
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

  // Delete Product
const handleDelete = async (id) => {
    if (!window.confirm("Delete Product?")) return;

    await deleteProduct(id);
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className=" mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Products Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Product Form */}
          <div>
            <ProductForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              isEditing={editingId !== null}
            />
          </div>

          {/* Product Table */}
          <div className="lg:col-span-2">
            <ProductTable
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;

