"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just log data (later you can integrate Email/WhatsApp API)
    console.log("Form submitted:", formData);
    alert("Thank you! We will contact you shortly.");
    setFormData({ name: "", phone: "", service: "", message: "" });
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Have a question or want to book a service? Fill the form below or reach us directly.
        </p>

        {/* Contact Form */}
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

          {/* Service type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Service Required
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

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Describe your request..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>

        {/* Direct Contact Info */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-700">
            Or reach us directly:
          </p>
          <p>
            📞 <a href="tel:+919709870726" className="text-blue-600 hover:underline">
              +91 97098 70726
            </a>
          </p>
          <p>
            💬 <a href="https://wa.me/919709870726" target="_blank" className="text-green-600 hover:underline">
              Chat on WhatsApp
            </a>
          </p>
          <p>
            📧 <a href="mailto:grihfix.service@gmail.com" className="text-blue-600 hover:underline">
              grihfix.service@gmail.com
            </a>
          </p>
        </div>

        {/* Optional Map */}
        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28784.821!2d85.9!3d26.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec9f7b!2sDarbhanga!5e0!3m2!1sen!2sin!4v123456789"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}