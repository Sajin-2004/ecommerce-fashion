import React from 'react';

const CheckoutPayment = ({ selectedMethod, setSelectedMethod }) => {
    const methods = [
        { id: 'cod', label: 'Cash on Delivery', description: 'Pay at your doorstep' },
        { id: 'upi', label: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
        { id: 'card', label: 'Credit / Debit Card', description: 'All major cards accepted' }
    ];

    return (
        <div className="payment-options">
            {methods.map((method) => (
                <div
                    key={method.id}
                    className={`payment-option ${selectedMethod === method.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod(method.id)}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedMethod === method.id}
                        readOnly
                    />
                    <div className="method-info">
                        <div className="method-label" style={{ fontWeight: 600 }}>{method.label}</div>
                        <div className="method-desc" style={{ fontSize: '12px', color: '#878787' }}>{method.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CheckoutPayment;
