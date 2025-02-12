'use client';
import { useState } from 'react';
import ButtonBig from './ButtonBig';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setError('Failed to send email. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <form className="w-[70%] mx-auto" onSubmit={handleSubmit}>
        <div className="w-full flex justify-between mt-10">
          <input
            name="firstName"
            placeholder="First Name"
            className="w-[48%] rounded-sm p-2 focus:outline-none border"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className="w-[48%] rounded-sm p-2 focus:outline-none border"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full flex justify-between mt-10">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-[48%] rounded-sm p-2 focus:outline-none border"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-[48%] rounded-sm p-2 focus:outline-none border"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="w-full mt-10">
          <textarea
            name="message"
            placeholder="Message"
            className="w-full rounded-sm p-2 focus:outline-none border h-32"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="px-10 py-3 bg-accent text-white rounded-full flex items-center"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>

        {success && (
          <p className="text-green-600 mt-2">Email sent successfully!</p>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default ContactForm;
