import React, { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    code:"",
    nameEn: "",
    nameAr: "",
    descEn: "",
    descAr: "",
    image: "",
    subcategoryId: "",
    brandId: "",
    price: "",
    unitId: "",
    overprice: "",
    oldprice: "",
    featured: false,
    topselling: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all products and subcategories on mount
  useEffect(() => {
    fetchProducts();
    fetchSubcategories();
    fetchBrands(); // 👈 NEW
    fetchUnits();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await fetch("/api/subcategories");
      const data = await res.json();
      setSubcategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands");
      const data = await res.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchUnits = async () => {
    try {
      const res = await fetch("/api/units");
      const data = await res.json();
      setUnits(data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  // 🔹 Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // 🔹 Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
    form.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload`,
        { method: "POST", body: form }
      );
      const data = await res.json();
      setFormData({ ...formData, image: data.secure_url });
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload an image first.");

    const productData = {
      code: formData.code,
      name: { en: formData.nameEn, ar: formData.nameAr },
      description: { en: formData.descEn, ar: formData.descAr },
      image: formData.image,
      subcategoryId: formData.subcategoryId,
      brandId: formData.brandId,
      price: Number(formData.price),
      unitId: formData.unitId,
      overprice: Number(formData.overprice),
      oldprice: formData.oldprice ? Number(formData.oldprice) : null,
      featured: formData.featured,
      topselling: formData.topselling,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      alert(editingId ? "Product updated!" : "Product added!");
      resetForm();
      fetchProducts();
    } else {
      console.error("Error saving product:", await res.text());
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      nameEn: "",
      nameAr: "",
      descEn: "",
      descAr: "",
      image: "",
      subcategoryId: "",
      brandId: "",
      price: "",
      unitId:"",
      overprice: "",
      oldprice: "",
      featured: false,
      topselling: false,
    });
    setEditingId(null);
  };

  const handleEdit = (p) => {
    setFormData({
      code: p.code,
      nameEn: p.name.en,
      nameAr: p.name.ar,
      descEn: p.description.en,
      descAr: p.description.ar,
      image: p.image,
      subcategoryId: p.subcategoryId?._id || "",
      brandId: p.brandId?._id || "",
      price: p.price,
      unitId:p.unitId?._id || "",
      overprice: p.overprice,
      oldprice: p.oldprice,
      featured: p.featured,
      topselling: p.topselling,
    });
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Products</h1>

    {/* Product Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <input className="form-field" name="code"   placeholder="Code" value={formData.code} onChange={handleChange} required />        
        <input className="form-field" name="nameEn" placeholder="Name (EN)" value={formData.nameEn} onChange={handleChange} required />
        <input className="form-field" name="nameAr" placeholder="Name (AR)" value={formData.nameAr} onChange={handleChange} required />
        <input className="form-field" name="descEn" placeholder="Description (EN)" value={formData.descEn} onChange={handleChange} />
        <input className="form-field" name="descAr" placeholder="Description (AR)" value={formData.descAr} onChange={handleChange} />

        <input type="file" accept="image/*" onChange={handleImageUpload} />
            {loading ? (
              <p>Uploading image...</p>
            ) : (
              formData.image && <img src={formData.image} alt="Uploaded" width="100" />
            )}

        <select className="form-field" name="subcategoryId" value={formData.subcategoryId} onChange={handleChange} required>
          <option value="">Select Subcategory</option>
          {subcategories.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name?.en}
            </option>
          ))}
        </select>

        <select className="form-field" name="brandId" value={formData.brandId}  onChange={handleChange}  required  >
          <option value="">Select Brand</option>
          {brands.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name?.en}
            </option>
          ))}
        </select>
        
        <input  className="form-field" name="price"     type="number" placeholder="Price"      value={formData.price} 
              onChange={handleChange} required />

        <select className="form-field" name="unitId" value={formData.unitId}  onChange={handleChange}  required  >
          <option value="">Select Unit</option>
          {units.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name?.en}
            </option>
          ))}
        </select>

        <input  className="form-field" name="overprice" type="number" placeholder="Over Price" value={formData.overprice} 
              onChange={handleChange} required />
        <input  className="form-field" name="oldprice"  type="number" placeholder="oldPrice"   value={formData.oldprice} 
              onChange={handleChange} required />
        
        <label>
          Featured <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
        </label>
        <label>
          Top Selling <input type="checkbox" name="topselling" checked={formData.topselling} onChange={handleChange} />
        </label>

        <button className="form-field" type="submit">{editingId ? "Update Product" : "Add Product"}</button>
      </form>
    {/* End of Product Form */}

    {/* Product List */}
      <div>
        <h2>All Products</h2>
        <div className="images-container-manage">
          {products.map((p) => (
            <div className="image-cart-manage" key={p._id}>
              <img src={p.image} alt={p.name.en} width="100%" />
              <h3>{p.name.en}</h3>
              <p>{p.price} EGP</p>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    {/* Product List */}
    
    </div>
  );
};

export default ManageProducts;
