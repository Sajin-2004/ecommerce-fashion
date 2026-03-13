import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiHome } from 'react-icons/fi';
import './InfoPage.css'; // Reusing premium info page styles if available, or custom

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    useEffect(() => {
        if (!order) {
            navigate('/');
        }
    }, [order, navigate]);

    if (!order) return null;

    return (
        <div className="info-page-container order-success-page">
            <div className="info-wrapper text-center">
                <div className="success-icon-container" style={{ margin: '0 auto 30px' }}>
                    <FiCheckCircle size={80} color="#388e3c" />
                </div>
                
                <h1 className="premium-title">Order Placed Successfully!</h1>
                <p className="subtitle">Thank you for shopping with FashionHub. Your style journey begins now.</p>
                
                <div className="order-details-card shadow-card" style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px' }}>
                    <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                        <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>ORDER ID</p>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: '18px' }}>#{order._id}</p>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Payment Method</span>
                        <span style={{ fontWeight: 600 }}>{order.paymentMethod}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Total Paid</span>
                        <span style={{ fontWeight: 700, color: '#000' }}>₹{order.totalPrice.toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Estimated Delivery</span>
                        <span style={{ color: '#388e3c' }}>3 - 5 Business Days</span>
                    </div>
                </div>

                <div className="action-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
                    <button className="primary-btn-premium" onClick={() => navigate('/orders')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiPackage /> VIEW ORDERS
                    </button>
                    <button className="secondary-btn-premium" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiHome /> BACK TO HOME
                    </button>
                </div>
            </div>

            <style>{`
                .order-success-page {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 20px;
                    background: #fdfdfd;
                }
                .text-center { text-align: center; }
                .success-icon-container {
                    animation: scaleUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                @keyframes scaleUp {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .primary-btn-premium {
                    background: #FFC107;
                    color: #000;
                    border: none;
                    padding: 15px 35px;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .primary-btn-premium:hover {
                    background: #000;
                    color: #FFC107;
                }
                .secondary-btn-premium {
                    background: #fff;
                    color: #000;
                    border: 1px solid #ddd;
                    padding: 15px 35px;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .secondary-btn-premium:hover {
                    border-color: #000;
                    background: #f9f9f9;
                }
            `}</style>
        </div>
    );
};

export default OrderSuccess;
