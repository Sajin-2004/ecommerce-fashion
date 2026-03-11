import React from 'react';

const CheckoutAddress = ({ address, setAddress, onSave }) => {
    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    return (
        <form className="address-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={address.name || ''}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                />
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="text"
                    name="phone"
                    value={address.phone || ''}
                    onChange={handleChange}
                    required
                    placeholder="Enter 10-digit mobile number"
                />
            </div>
            <div className="form-group full-width">
                <label>Address (Area and Street)</label>
                <textarea
                    name="address"
                    value={address.address || ''}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter delivery address"
                ></textarea>
            </div>
            <div className="form-group">
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    value={address.city || ''}
                    onChange={handleChange}
                    required
                    placeholder="Enter city"
                />
            </div>
            <div className="form-group">
                <label>Pincode</label>
                <input
                    type="text"
                    name="pincode"
                    value={address.pincode || ''}
                    onChange={handleChange}
                    required
                    placeholder="Enter 6-digit pincode"
                />
            </div>
            <button type="submit" className="save-address-btn">Save and Deliver Here</button>
        </form>
    );
};

export default CheckoutAddress;
