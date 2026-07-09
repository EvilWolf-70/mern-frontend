
import React, { useState } from "react";
import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";

const Products = () => {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "Nike Shoes",
      price: 2999,
      category: "Footwear",
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      description: "Premium sports shoes for daily use.",
    },
    {
      _id: "2",
      name: "Smart Watch",
      price: 4999,
      category: "Electronics",
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      description: "Latest smartwatch with health tracking.",
    },
  ]);

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
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (editingId) {
      setProducts((prev) =>
        prev.map((product) =>
          product._id === editingId
            ? { ...product, ...formData }
            : product
        )
      );

      alert("Product Updated Successfully");
    } else {
      const newProduct = {
        _id: Date.now().toString(),
        ...formData,
      };

      setProducts((prev) => [...prev, newProduct]);

      alert("Product Added Successfully");
    }

    setFormData(initialState);
    setEditingId(null);
    setLoading(false);
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
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    setProducts((prev) =>
      prev.filter((product) => product._id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

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

