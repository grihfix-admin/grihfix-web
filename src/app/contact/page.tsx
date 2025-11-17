"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { toast } from "react-hot-toast";

const defaultForm = {
  name: "",
  phone: "",
  city: "Darbhanga",
  service: "Home Cleaning",
  preferredTime: "",
  message: "",
};

const serviceOptions = [
  "Home Cleaning",
  "Water Tank Cleaning",
  "Septic Tank Cleaning",
  "Plumbing",
  "Electrical Appliance Repair",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Contact form submission:", formData);
    toast.success("Thanks! Team GrihFix will call you shortly.");
    setFormData(defaultForm);
  };

  return (
    <div className="space-y-16 pb-20">
      <section className="bg-slate-900 text-white">
        <Container className="py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.5em] text-blue-200">Contact GrihFix</p>
          <h1 className="mt-4 text-4xl font-bold">Let’s plan your next service.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">
            Fill the form or ping us on WhatsApp. We respond within 10 minutes during working hours (9am – 8pm).
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="tel:+919709870726" size="lg" variant="secondary" className="text-slate-900">
              Call us directly
            </Button>
            <Button href="https://wa.me/919709870726" size="lg" variant="ghost" className="text-white">
              Chat on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      <Section title="Tell us about your requirement">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="phone">
                  Phone number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="+91 97098 70726"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="city">
                  City / Area
                </label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Darbhanga"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="service">
                  Service type *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="preferredTime">
                  Preferred date & time
                </label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="e.g. Tomorrow, 11 AM"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600" htmlFor="message">
                Message / Problem description
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Share brief details so we can prep the right tools..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full justify-center">
              Submit request
            </Button>
          </form>

          <div className="space-y-6 rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-500">Quick contact</p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>
                  Phone:{" "}
                  <a href="tel:+919709870726" className="font-semibold text-slate-900">
                    +91 97098 70726
                  </a>
                </p>
                <p>
                  WhatsApp:{" "}
                  <a href="https://wa.me/919709870726" className="font-semibold text-slate-900">
                    wa.me/919709870726
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:grihfix.service@gmail.com" className="font-semibold text-slate-900">
                    grihfix.service@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-500">Service hours</p>
              <p className="mt-3 text-sm text-slate-700">Every day, 9:00 AM – 8:00 PM</p>
              <p className="text-sm text-slate-500">Emergency plumbing/electrical visits available on request.</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-500">Office</p>
              <p className="mt-3 text-sm text-slate-700">Tower Chowk, Darbhanga 846004</p>
              <p className="text-sm text-slate-500">Service radius: within 20 km of Darbhanga town.</p>
            </div>
            <iframe
              title="Darbhanga map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28784.821!2d85.9!3d26.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec9f7b!2sDarbhanga!5e0!3m2!1sen!2sin!4v123456789"
              className="h-56 w-full rounded-2xl border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </Section>
    </div>
  );
}