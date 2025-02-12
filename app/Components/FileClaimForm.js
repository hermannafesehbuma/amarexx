'use client';
import { useState } from 'react';
import ButtonBig from './ButtonBig';

function FileClaimForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    packagename: '',
    trackingNumber: '',
    claimType: '',
    message: '',
    packageType: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        file: files[0], // Store the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        if (key === 'file') {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, value);
        }
      }
    }

    try {
      const response = await fetch('/Api/file-claim', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.success) {
        alert('Claim request submitted successfully!');
      } else {
        alert('Failed to submit the request.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error with the form submission.');
    }
  };

  return (
    <div>
      <form className="w-[70%] mx-auto" onSubmit={handleSubmit}>
        <h3 className="text-center text-3xl mt-20">File A Claim</h3>
        <div className="w-[100%] flex justify-between mt-10">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          />
        </div>

        <div className="w-[100%] flex justify-between mt-10">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          />
        </div>

        <div className="w-[100%] flex justify-between mt-10">
          <input
            name="packagename"
            value={formData.packagename}
            onChange={handleChange}
            placeholder="Package Name"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          />
          <select
            name="packageType"
            value={formData.packageType}
            onChange={handleChange}
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          >
            <option value="standard">Standard Packages</option>
            <option value="specialized">Specialized Options</option>
            <option value="freight">Freight Packaging</option>
            <option value="customized">Customized Packaging</option>
            <option value="crate">Crate</option>
          </select>
        </div>

        <div className="w-[100%] flex justify-between mt-10">
          <input
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleChange}
            placeholder="Tracking Number eg AMX2451820167"
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          />
          <select
            name="claimType"
            value={formData.claimType}
            onChange={handleChange}
            className="w-[48%] rounded-sm p-2 focus:outline-none border border-primary"
          >
            <option value="lost">Lost</option>
            <option value="damaged">Damaged</option>
            <option value="broken">Broken</option>
            <option value="injured">Sick or Injured</option>
            <option value="other">Other</option>
            <option value="return">Return Delivery</option>
          </select>
        </div>

        <div className="w-[100%] flex justify-between mt-10">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-[100%] rounded-sm pb-20 pl-1 pt-2 focus:outline-none border border-primary"
          ></textarea>
        </div>

        <div className="w-[100%] mt-10">
          <label>Upload File (if applicable)</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="border border-primary w-[100%] p-10"
          />
        </div>

        <div className="mt-10">
          <ButtonBig className="px-10 py-3 bg-accent rounded-full flex items-center">
            Submit
          </ButtonBig>
        </div>
      </form>
    </div>
  );
}

export default FileClaimForm;
