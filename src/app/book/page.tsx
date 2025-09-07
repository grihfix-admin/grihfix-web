"use client";

import { useState } from "react";

export default function Book() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    service: "",
    date: "",
    time: "",
    instructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    if (res.ok) {
      alert("Booking request submitted! We’ll confirm shortly.");
      setFormData({
        name: "",
        phone: "",
        address: "",
        service: "",
        date: "",
        time: "",
        instructions: "",
      });
    } else {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Book a Service
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Fill the form below to book your service. Our team will contact you to confirm.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-blue-50 p-8 rounded-xl shadow-md space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="+91 97098 70726"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter service address"
            />
          </div>

          {/* Service type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Service
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Select Service --</option>
              <option>Home Cleaning</option>
              <option>Bathroom/Kitchen Cleaning</option>
              <option>Water Tank Cleaning</option>
              <option>Septic Tank Cleaning</option>
              <option>Plumbing</option>
              <option>Appliance Repairs</option>
            </select>
          </div>

          {/* Date + Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Any specific request or note for our staff?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </section>
  );
}