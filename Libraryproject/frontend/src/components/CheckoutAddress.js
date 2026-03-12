import React, { useState } from 'react';

const CheckoutAddress = ({ address, setAddress, onSave }) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!address.name || address.name.trim().length < 3) {
            newErrors.name = "Full Name must be at least 3 characters";
        }
        if (!address.phone || !/^\d{10}$/.test(address.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        if (!address.address || address.address.trim().length < 10) {
            newErrors.address = "Address must be at least 10 characters";
        }
        if (!address.city || address.city.trim().length === 0) {
            newErrors.city = "City is required";
        }
        if (!address.state || address.state.trim().length === 0) {
            newErrors.state = "State is required";
        }
        if (!address.pincode || !/^\d{6}$/.test(address.pincode)) {
            newErrors.pincode = "Please enter a valid 6-digit pincode";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave();
        }
    };

    return (
        <form className="address-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    className={errors.name ? 'invalid-input' : ''}
                    value={address.name || ''}
                    onChange={handleChange}
                    placeholder="Enter full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="text"
                    name="phone"
                    className={errors.phone ? 'invalid-input' : ''}
                    value={address.phone || ''}
                    onChange={handleChange}
                    placeholder="Enter 10-digit mobile number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="form-group full-width">
                <label>Address (Area and Street)</label>
                <textarea
                    name="address"
                    className={errors.address ? 'invalid-input' : ''}
                    value={address.address || ''}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter delivery address"
                ></textarea>
                {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
            <div className="form-group">
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    className={errors.city ? 'invalid-input' : ''}
                    value={address.city || ''}
                    onChange={handleChange}
                    placeholder="Enter city"
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className="form-group">
                <label>State</label>
                <input
                    type="text"
                    name="state"
                    className={errors.state ? 'invalid-input' : ''}
                    value={address.state || ''}
                    onChange={handleChange}
                    placeholder="Enter state"
                />
                {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
            <div className="form-group">
                <label>Pincode</label>
                <input
                    type="text"
                    name="pincode"
                    className={errors.pincode ? 'invalid-input' : ''}
                    value={address.pincode || ''}
                    onChange={handleChange}
                    placeholder="Enter 6-digit pincode"
                />
                {errors.pincode && <span className="error-message">{errors.pincode}</span>}
            </div>
            <button type="submit" className="save-address-btn">Save</button>
        </form>
    );
};

export default CheckoutAddress;
