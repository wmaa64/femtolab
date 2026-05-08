import React, { useEffect, useState } from "react";

const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    src: "",
    link: "#",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch offers
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch("/api/offers");
      const data = await res.json();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";

    const url = editingId
      ? `/api/offers/${editingId}`
      : "/api/offers";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert(editingId ? "Offer updated!" : "Offer added!");

      resetForm();

      fetchOffers();
    } else {
      console.error(await res.text());
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      src: "",
      link: "#",
    });

    setEditingId(null);
  };

  // Edit
  const handleEdit = (offer) => {
    setFormData({
      src: offer.src || "",
      link: offer.link || "#",
    });

    setEditingId(offer._id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this offer?")) return;

    await fetch(`/api/offers/${id}`, {
      method: "DELETE",
    });

    fetchOffers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Offers</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-container">

        <input
          className="form-field"
          name="src"
          placeholder="Image Source"
          value={formData.src}
          onChange={handleChange}
          required
        />

        <input
          className="form-field"
          name="link"
          placeholder="Link"
          value={formData.link}
          onChange={handleChange}
        />

        <button className="form-field" type="submit">
          {editingId ? "Update Offer" : "Add Offer"}
        </button>

      </form>

      {/* Offers List */}
      <div>
        <h2>All Offers</h2>

        <div className="images-container-manage">

          {offers.map((offer) => (
            <div className="image-cart-manage" key={offer._id}>

              <img
                src={`/images/offers/${offer.src}`}
                alt="offer"
                width="100%"
              />

              <p>{offer.src}</p>

              <p>{offer.link}</p>

              <button onClick={() => handleEdit(offer)}>
                Edit
              </button>

              <button onClick={() => handleDelete(offer._id)}>
                Delete
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ManageOffers;